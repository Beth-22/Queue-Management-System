import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAdmin, onCreateQueue, onJoinQueue }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Werefa</Link>

        {isAdmin ? (
          <button onClick={onCreateQueue} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
            Create a Queue
          </button>
        ) : (
          <button onClick={onJoinQueue} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
            Join a Queue
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
