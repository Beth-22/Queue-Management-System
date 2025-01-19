import React, { useEffect, useState } from "react";
import { getCustomerQueues, searchQueues } from "../services/queueService";

const CustomerDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchQueues = async () => {
      const data = await getCustomerQueues();
      setQueues(data.sort(() => 0.5 - Math.random()).slice(0, 6)); // Random 6 queues
    };
    fetchQueues();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const data = await searchQueues(searchQuery);
      setSearchResults(data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a queue..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Search
      </button>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {searchResults.map((queue) => (
            <div key={queue._id} className="p-4 bg-gray-100 rounded shadow mt-2">
              <h3 className="text-lg font-bold">{queue.name}</h3>
              <p className="text-sm text-gray-600">{queue.service}</p>
            </div>
          ))}
        </div>
      )}

      {/* Random Queues */}
      <h2 className="text-xl font-semibold mt-6">Popular Queues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {queues.map((queue) => (
          <div key={queue._id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-bold">{queue.name}</h3>
            <p className="text-sm text-gray-600">{queue.service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
