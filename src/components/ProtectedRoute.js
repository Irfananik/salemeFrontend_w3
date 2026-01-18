import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';

/**
 * ProtectedRoute Component
 * Wraps components that require authentication
 * Redirects to login if no token found
 */
const ProtectedRoute = ({ Component, requiredRole = null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);
      if (user) {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="unauthorized-container">
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return <Component />;
};

export default ProtectedRoute;
