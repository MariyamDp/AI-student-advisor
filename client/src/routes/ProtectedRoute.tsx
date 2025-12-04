import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // While we are checking if a stored token/profile exists, avoid redirecting.
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children as React.ReactElement;
};

export default ProtectedRoute;
