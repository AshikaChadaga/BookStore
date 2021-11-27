import React from 'react';
import Auth from "../Authentication/Authentication";
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    return Auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}