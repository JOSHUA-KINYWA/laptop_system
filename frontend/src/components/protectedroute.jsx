import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
}