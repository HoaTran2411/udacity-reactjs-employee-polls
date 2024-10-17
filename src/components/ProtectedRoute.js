import React from 'react';
import { useLocation, Navigate } from "react-router";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const authedUser = useSelector((state) => state.users.authedUser);
    const location = useLocation();

    return authedUser == null ? (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    ) : (
        children
    );
}

export default ProtectedRoute;