import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isTokenValid } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const isAuthenticated = isTokenValid();
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;