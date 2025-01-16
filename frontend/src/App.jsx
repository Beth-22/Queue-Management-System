import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './router/ProtectedRoute';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); // Simple authentication check

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="flex-grow bg-gray-50 py-8">
                    <div className="container mx-auto px-4">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Catch-all Route */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
