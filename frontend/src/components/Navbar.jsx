import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return null; // ✅ Wait until user data is loaded before showing navbar

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Werefa</Link>

        <div className="space-x-4">
          {user ? (
            <>
              {user.isAdmin && location.pathname === "/admin-dashboard" && (
                <Link to="/admin-dashboard" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                  Create a Queue
                </Link>
              )}
              {!user.isAdmin && location.pathname === "/customer-dashboard" && (
                <Link to="/customer-dashboard" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                  Join a Queue
                </Link>
              )}
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
