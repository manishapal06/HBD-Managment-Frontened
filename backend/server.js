// backend/server.js
// ------------------------------------------------------------
// Express server that provides authentication (signup) and CRUD for the
// Hospital Management System using Firebase Admin SDK.
// ------------------------------------------------------------

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from './firebaseAdmin.js'; // initialise Firebase Admin SDK

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ------------------------------------------------------------
// Helper: send standardized JSON response
// ------------------------------------------------------------
const sendSuccess = (res, data) => res.json({ success: true, data });
const sendError = (res, message, code = 500) =>
    res.status(code).json({ success: false, error: message });

// ------------------------------------------------------------
// Health check endpoint
// ------------------------------------------------------------
app.get('/api/health', (req, res) => {
    sendSuccess(res, { status: 'ok', timestamp: new Date().toISOString() });
});

// ------------------------------------------------------------
// AUTH – SIGNUP
// ------------------------------------------------------------
/**
 * Expected payload:
 * {
 *   email: string,
 *   password: string,
 *   displayName?: string,
 *   role: string,               // e.g. SUPER_ADMIN, HOSPITAL_ADMIN, DOCTOR, ...
 *   tenantId: string,           // the hospital / tenant identifier
 *   extra?: object              // any additional fields you want to store
 * }
 */
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, displayName, role, tenantId, extra } = req.body;
    if (!email || !password || !role || !tenantId) {
        return sendError(res, 'Missing required fields (email, password, role, tenantId)', 400);
    }
    try {
        // 1️⃣ Create the user in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: displayName || undefined,
        });

        // 2️⃣ Set custom claims for role & tenant isolation
        await admin.auth().setCustomUserClaims(userRecord.uid, { role, tenantId });

        // 3️⃣ Store a user profile document in Firestore for quick look‑ups
        const userDoc = {
            uid: userRecord.uid,
            email,
            displayName: displayName || '',
            role,
            tenantId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            ...extra,
        };
        await admin.firestore().collection('users').doc(userRecord.uid).set(userDoc);

        sendSuccess(res, { uid: userRecord.uid, email, role, tenantId });
    } catch (err) {
        console.error('Signup error:', err);
        sendError(res, err.message || 'Signup failed', err.code === 'auth/email-already-exists' ? 409 : 500);
    }
});

// ------------------------------------------------------------
// AUTH – VERIFY ID TOKEN (middleware for protected routes)
// ------------------------------------------------------------
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendError(res, 'Missing Authorization header', 401);
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        // Attach decoded token to request for downstream handlers
        req.user = decoded; // contains uid, role, tenantId, etc.
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        sendError(res, 'Invalid or expired token', 401);
    }
};

// ------------------------------------------------------------
// SAMPLE PROTECTED ROUTE – Get current user profile
// ------------------------------------------------------------
app.get('/api/auth/me', verifyToken, async (req, res) => {
    try {
        const userSnap = await admin.firestore().collection('users').doc(req.user.uid).get();
        if (!userSnap.exists) {
            return sendError(res, 'User profile not found', 404);
        }
        sendSuccess(res, userSnap.data());
    } catch (err) {
        console.error('Fetch profile error:', err);
        sendError(res, 'Failed to fetch profile');
    }
});

// ------------------------------------------------------------
// HOSPITAL CRUD (same as previous example) – protected by tenantId
// ------------------------------------------------------------
const hospitals = admin.firestore().collection('hospitals');

// Create hospital (only SUPER_ADMIN or HOSPITAL_ADMIN of the tenant can create)
app.post('/api/hospitals', verifyToken, async (req, res) => {
    const { role, tenantId } = req.user;
    if (!['SUPER_ADMIN', 'HOSPITAL_ADMIN'].includes(role)) {
        return sendError(res, 'Insufficient permissions', 403);
    }
    try {
        const data = { ...req.body, tenantId, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await hospitals.add(data);
        const snap = await docRef.get();
        sendSuccess(res, { id: docRef.id, ...snap.data() });
    } catch (err) {
        console.error('Create hospital error:', err);
        sendError(res, 'Failed to create hospital');
    }
});

// List hospitals for the caller's tenant (SUPER_ADMIN sees all)
app.get('/api/hospitals', verifyToken, async (req, res) => {
    const { role, tenantId } = req.user;
    try {
        let query = hospitals;
        if (role !== 'SUPER_ADMIN') {
            query = query.where('tenantId', '==', tenantId);
        }
        const snap = await query.get();
        const list = [];
        snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        sendSuccess(res, list);
    } catch (err) {
        console.error('List hospitals error:', err);
        sendError(res, 'Failed to fetch hospitals');
    }
});

// ------------------------------------------------------------
// Start server
// ------------------------------------------------------------
app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});
