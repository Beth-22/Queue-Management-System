import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (isAuthenticated === undefined) return null;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
