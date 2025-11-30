// backend/firebaseAdmin.js
// ------------------------------------------------------------
// Initialise Firebase Admin SDK using a service‑account key.
// The key file path is taken from the env var
// GOOGLE_APPLICATION_CREDENTIALS (recommended) or from a
// JSON string in FIREBASE_SERVICE_ACCOUNT (fallback).
// ------------------------------------------------------------

import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config(); // load .env

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // When GOOGLE_APPLICATION_CREDENTIALS points to a JSON file, the SDK reads it automatically.
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Useful for CI/CD where the key is stored as a secret string.
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.warn(
        '⚠️ No Firebase service‑account credentials found. Set GOOGLE_APPLICATION_CREDENTIALS in backend/.env.'
    );
    admin.initializeApp(); // will fail on any privileged call
}

export default admin;
