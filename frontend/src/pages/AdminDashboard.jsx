import React, { useEffect, useState } from "react";
import { getAdminQueues, createQueue } from "../services/queueService";

const AdminDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [queueData, setQueueData] = useState({ name: "", service: "" });

  useEffect(() => {
    const fetchQueues = async () => {
      const data = await getAdminQueues();
      setQueues(data);
    };
    fetchQueues();
  }, []);

  const handleCreateQueue = async () => {
    await createQueue(queueData);
    setShowCreatePopup(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={() => setShowCreatePopup(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Queue
      </button>

      {/* Queue List */}
      <div className="mt-4">
        {queues.map((queue) => (
          <div key={queue._id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-bold">{queue.name}</h3>
            <p className="text-sm text-gray-600">{queue.service}</p>
          </div>
        ))}
      </div>

      {/* Create Queue Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2>Create a New Queue</h2>
            <input type="text" placeholder="Queue Name" onChange={(e) => setQueueData({ ...queueData, name: e.target.value })} />
            <input type="text" placeholder="Service" onChange={(e) => setQueueData({ ...queueData, service: e.target.value })} />
            <button onClick={handleCreateQueue}>Create</button>
            <button onClick={() => setShowCreatePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
