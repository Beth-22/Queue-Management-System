import React, { useState, useEffect } from "react";
import { getAllQueues, createQueue } from "../services/queueService";

const AdminDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [queueData, setQueueData] = useState({
    name: "",
    date: "",
    time: "",
    services: [""], // Start with one empty service
  });

  useEffect(() => {
    const fetchQueues = async () => {
      const data = await getAllQueues();
      setQueues(data);
    };

    fetchQueues();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "services") {
      const newServices = [...queueData.services];
      newServices[index] = value;
      setQueueData({ ...queueData, services: newServices });
    } else {
      setQueueData({ ...queueData, [name]: value });
    }
  };

  const addServiceField = () => {
    setQueueData({ ...queueData, services: [...queueData.services, ""] });
  };

  const removeServiceField = (index) => {
    const newServices = queueData.services.filter((_, i) => i !== index);
    setQueueData({ ...queueData, services: newServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQueue(queueData);
    setShowPopup(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create a Queue
        </button>
      </div>

      {/* List of Queues */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {queues.map((queue) => (
          <div key={queue._id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold">{queue.name}</h2>
            <p className="text-gray-600">Scheduled: {queue.date} at {queue.time}</p>
            <p className="text-gray-800 font-medium mt-2">Services:</p>
            <ul className="list-disc ml-4">
              {queue.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Create Queue Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create a Queue</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Queue Name</label>
                <input
                  type="text"
                  name="name"
                  value={queueData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={queueData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={queueData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Services Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Services</label>
                {queueData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      name="services"
                      value={service}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeServiceField(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addServiceField}
                  className="text-blue-600 hover:text-blue-700 mt-2"
                >
                  + Add Another Service
                </button>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Create Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
