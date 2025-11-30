// src/service/auth.js
// ------------------------------------------------------------
// Front‑end authentication helpers using Firebase client SDK.
// Since the user requested to keep everything inside the frontend
// (no separate backend folder), we handle signup, login and user
// profile storage directly from the client.
// ------------------------------------------------------------

import { auth, db } from "./cred.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Sign up a new user and store additional profile data in Firestore.
 *
 * @param {Object} payload
 *   - email: string (required)
 *   - password: string (required)
 *   - displayName?: string
 *   - role: string (e.g. "SUPER_ADMIN", "HOSPITAL_ADMIN", "DOCTOR", …)
 *   - tenantId: string – identifier of the hospital/tenant
 *   - extra?: object – any extra fields you want to keep
 * @returns {Promise<Object>} resolves with the created user profile
 */
export const signup = async (payload) => {
    const { email, password, displayName, role, tenantId, extra } = payload;
    if (!email || !password || !role || !tenantId) {
        throw new Error(
            "Missing required fields: email, password, role, tenantId"
        );
    }

    // 1️⃣ Create the Auth user
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    const uid = userCredential.user.uid;

    // 2️⃣ Optionally set the display name (client‑side only)
    if (displayName) {
        await userCredential.user.updateProfile({ displayName });
    }

    // 3️⃣ Store a profile document in Firestore for role/tenant info
    const profile = {
        uid,
        email,
        displayName: displayName || "",
        role,
        tenantId,
        createdAt: new Date(),
        ...extra,
    };
    await setDoc(doc(db, "users", uid), profile);

    return profile;
};

/**
 * Sign in an existing user.
 * Returns the Firebase user object.
 */
export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

/**
 * Sign out the current user.
 */
export const logout = async () => {
    await signOut(auth);
};

/**
 * Listen for auth state changes.
 * @param {function} callback receives the Firebase user (or null)
 */
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Fetch the current user's profile from Firestore.
 * Returns null if no user is logged in.
 */
export const fetchUserProfile = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    const snap = await getDoc(doc(db, "users", user.uid));
    return snap.exists() ? snap.data() : null;
};
