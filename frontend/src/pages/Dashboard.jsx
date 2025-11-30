import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import HospitalAdminPanel from "./pages/HospitalAdminPanel";
import NursePanel from "./pages/NursePanel";
import PatientPanel from "./pages/PatientPanel";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

/* --------------------------- */
/*   PROTECTED ROUTE WRAPPER   */
/* --------------------------- */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

/* ------------------------ */
/*     PUBLIC ROUTE         */
/* ------------------------ */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <Loader />;

  if (isAuthenticated) {
    switch (user?.role) {
      case "superadmin":
        return <Navigate to="/superadmin" replace />;
      case "hospitaladmin":
        return <Navigate to="/hospitaladmin" replace />;
      case "nurse":
        return <Navigate to="/nurse" replace />;
      case "patient":
        return <Navigate to="/patient" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

/* ------------------------ */
/*         ROUTES           */
/* ------------------------ */
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginSignupPage />
            </PublicRoute>
          }
        />

        {/* Signup in full signup mode */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <LoginSignupPage />
            </PublicRoute>
          }
        />

        {/* Protected Dashboards */}
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospitaladmin/*"
          element={
            <ProtectedRoute allowedRoles={["hospitaladmin"]}>
              <HospitalAdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/*"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NursePanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientPanel />
            </ProtectedRoute>
          }
        />

        {/* Fallback — any unknown route → Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
