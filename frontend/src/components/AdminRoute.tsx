import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isAdmin, isTokenValid } from '../utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const AdminRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = '/'
}) => {
    const isAuthenticated = isTokenValid();
    const isUserAdmin = isAdmin();

    if (isAuthenticated && isUserAdmin) {
        return <>{children}</>;
    }

    return <Navigate to={redirectTo} replace />;
};

export default AdminRoute;