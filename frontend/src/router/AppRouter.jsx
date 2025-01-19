import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboard from "../pages/AdminDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { fetchUserProfile } from "../services/api";

const AppRouter = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await fetchUserProfile();
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Routes> {/* ✅ Removed <Router> to avoid nesting */}
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute isAuthenticated={user?.isAdmin}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/customer-dashboard"
                element={
                    <ProtectedRoute isAuthenticated={user && !user.isAdmin}>
                        <CustomerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
