import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}