import React, { useEffect, useState } from 'react';
import { getCreatedQueues, getWaitingQueues } from '../services/queueService';

const Dashboard = () => {
    const [createdQueues, setCreatedQueues] = useState([]);
    const [waitingQueues, setWaitingQueues] = useState([]);

    useEffect(() => {
        const fetchQueues = async () => {
          try {
            console.log("Fetching queues with token:", localStorage.getItem("token")); // Debugging
      
            const created = await getCreatedQueues();
            console.log("Created Queues Response:", created); // Debugging
      
            const waiting = await getWaitingQueues();
            console.log("Waiting Queues Response:", waiting); // Debugging
      
            setCreatedQueues(created);
            setWaitingQueues(waiting);
          } catch (err) {
            console.error("Error fetching queues:", err.response?.data || err.message);
          }
        };
      
        fetchQueues();
      }, []);
      

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Queues I Created</h2>
                    {createdQueues.map((queue) => (
                        <div key={queue._id} className="p-4 bg-white rounded shadow mb-4">
                            <h3 className="text-lg font-bold">{queue.name}</h3>
                            <p className="text-sm text-gray-600">Service: {queue.service}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Queues I'm Waiting For</h2>
                    {waitingQueues.map((queue) => (
                        <div key={queue._id} className="p-4 bg-white rounded shadow mb-4">
                            <h3 className="text-lg font-bold">{queue.name}</h3>
                            <p className="text-sm text-gray-600">Service: {queue.service}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default Dashboard;
