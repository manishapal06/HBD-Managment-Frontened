import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Loader from './components/Loader';
import Login from './pages/Login';
import SuperAdminPanel from './pages/SuperAdminPanel';
import HospitalAdminPanel from './pages/HospitalAdminPanel';
import NursePanel from './pages/NursePanel';
import PatientPanel from './pages/PatientPanel';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader variant="pulse" size="lg" fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader variant="pulse" size="lg" fullScreen />;
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    switch (user?.role) {
      case 'superadmin':
        return <Navigate to="/superadmin" replace />;
      case 'hospitaladmin':
        return <Navigate to="/hospitaladmin" replace />;
      case 'nurse':
        return <Navigate to="/nurse" replace />;
      case 'patient':
        return <Navigate to="/patient" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader variant="pulse" size="lg" fullScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Super Admin */}
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperAdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Hospital Admin */}
        <Route
          path="/hospitaladmin/*"
          element={
            <ProtectedRoute allowedRoles={['hospitaladmin']}>
              <HospitalAdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Nurse */}
        <Route
          path="/nurse/*"
          element={
            <ProtectedRoute allowedRoles={['nurse']}>
              <NursePanel />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Patient */}
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientPanel />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// Unauthorized Page Component
const UnauthorizedPage = () => {
  const { logout, user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
          {user && (
            <span className="block mt-2 text-sm">
              Logged in as: <span className="font-medium">{user.name}</span>
            </span>
          )}
        </p>
        <button
          onClick={logout}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

// 404 Page Component
const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl font-bold text-blue-600">404</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href={isAuthenticated ? "/dashboard" : "/login"}
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
        </a>
      </div>
    </div>
  );
};

export default App;


