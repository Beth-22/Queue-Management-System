import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is admin

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onCreateQueue={() => setShowCreatePopup(true)} onJoinQueue={() => setShowJoinPopup(true)} />

      <div className="ml-64 p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      {/* Join Queue Popup */}
      {showJoinPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Search for a Queue</h2>
            <input type="text" placeholder="Queue Name" className="border w-full p-2 rounded mb-4" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Join</button>
            <button onClick={() => setShowJoinPopup(false)} className="bg-gray-300 px-4 py-2 rounded ml-4">Cancel</button>
          </div>
        </div>
      )}

      {/* Create Queue Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Create a Queue</h2>
            <input type="text" placeholder="Queue Name" className="border w-full p-2 rounded mb-4" />
            <input type="text" placeholder="Service Name" className="border w-full p-2 rounded mb-4" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            <button onClick={() => setShowCreatePopup(false)} className="bg-gray-300 px-4 py-2 rounded ml-4">Cancel</button>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
