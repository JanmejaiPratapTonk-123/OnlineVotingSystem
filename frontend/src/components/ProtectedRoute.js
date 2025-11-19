import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, token } = useAuth();

  const storedRole = localStorage.getItem("role");
  const userRole = user?.role || storedRole;

  if (!token) {
    return <Navigate to={roles.includes('admin') ? '/admin/login' : '/login'} replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
