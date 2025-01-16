import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createQueue, getAllQueues } from "../services/queueService";

const Navbar = () => {
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    status: "waiting",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation(); // Get the current route
  const isDashboard = location.pathname === "/dashboard"; // Check if on Dashboard

  // Handle input changes for "Create Queue"
  const handleCreateChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the "Create Queue" form
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQueue(formData);
      setShowCreatePopup(false);
      setFormData({ name: "", service: "", status: "waiting" });
      setError(null);
      alert("Queue created successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create queue.");
    }
  };

  // Search for queues in "Join a Queue"
  const handleSearch = async () => {
    try {
      const results = await getAllQueues({ service: searchTerm });
      setSearchResults(results);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch queues.");
    }
  };

  // Handle joining a queue
  const handleJoinQueue = (queueId) => {
    console.log(`Joining queue: ${queueId}`);
    setShowJoinPopup(false);
    alert(`Joined queue with ID: ${queueId}`);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Werefa
        </Link>

        {/* Dynamic Links */}
        {isDashboard ? (
          <div className="space-x-4">
            {/* Join a Queue Button */}
            <button
              onClick={() => setShowJoinPopup(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Join a Queue
            </button>
            {/* Create a Queue Button */}
            <button
              onClick={() => setShowCreatePopup(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Create a Queue
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            {/* Login and Register Links */}
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Join Queue Popup */}
      {showJoinPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Search for a Queue</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Search by Service Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border w-full p-2 text-black rounded mb-4"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              Search
            </button>
            <ul>
              {searchResults.map((queue) => (
                <li
                  key={queue._id}
                  className="border p-2 mb-2 rounded flex justify-between items-center"
                >
                  <span>{queue.name} - {queue.service}</span>
                  <button
                    onClick={() => handleJoinQueue(queue._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowJoinPopup(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Queue Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Create a Queue</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Queue Name"
                value={formData.name}
                onChange={handleCreateChange}
                required
                className="border w-full text-black p-2 rounded mb-4"
              />
              <input
                type="text"
                name="service"
                placeholder="Service Name"
                value={formData.service}
                onChange={handleCreateChange}
                required
                className="border text-black w-full p-2 rounded mb-4"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleCreateChange}
                required
                className="border w-full text-black p-2 rounded mb-4"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="waiting">Waiting</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePopup(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
