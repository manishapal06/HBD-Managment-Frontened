// src/service/mockAuth.js
// ------------------------------------------------------------
// Simple mock authentication service for development / when the real
// backend (Firebase) is not yet connected. It stores user data in
// browser's localStorage and mimics async behavior with Promises.
// ------------------------------------------------------------

/**
 * Generate a pseudo‑random UID (not cryptographically secure).
 */
const generateUid = () =>
    "uid_" + Math.random().toString(36).substr(2, 9) + Date.now();

/**
 * Simulated signup – stores the user profile in localStorage.
 * @param {Object} payload must contain email, password, role, tenantId
 * @returns {Promise<Object>} resolves with the created profile
 */
export const mockSignup = async (payload) => {
    const { email, password, role, tenantId, displayName, extra } = payload;
    if (!email || !password || !role || !tenantId) {
        throw new Error(
            "Missing required fields: email, password, role, tenantId"
        );
    }

    // Simulate async delay
    await new Promise((res) => setTimeout(res, 300));

    const uid = generateUid();
    const profile = {
        uid,
        email,
        displayName: displayName || "",
        role,
        tenantId,
        createdAt: new Date().toISOString(),
        ...extra,
    };

    // Store in localStorage under a dedicated key
    const stored = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    stored.push({ ...profile, password }); // keep password only for mock login
    localStorage.setItem("mockUsers", JSON.stringify(stored));

    return profile;
};

/**
 * Simulated login – checks credentials against the stored mock users.
 * @returns {Promise<Object>} resolves with the user profile (without password)
 */
export const mockLogin = async (email, password) => {
    await new Promise((res) => setTimeout(res, 200));
    const stored = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const user = stored.find((u) => u.email === email && u.password === password);
    if (!user) {
        throw new Error("Invalid email or password (mock)");
    }
    const { password: _, ...profile } = user; // omit password from returned object
    // Simulate setting a simple session token
    localStorage.setItem("mockCurrentUser", JSON.stringify(profile));
    return profile;
};

/**
 * Simulated logout – clears the mock session.
 */
export const mockLogout = async () => {
    await new Promise((res) => setTimeout(res, 100));
    localStorage.removeItem("mockCurrentUser");
};

/**
 * Get the currently logged‑in mock user (if any).
 */
export const mockCurrentUser = () => {
    const data = localStorage.getItem("mockCurrentUser");
    return data ? JSON.parse(data) : null;
};
