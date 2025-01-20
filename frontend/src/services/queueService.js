import API from "./api";


export const getAllQueues = async () => {
  const { data } = await API.get("/queues"); // ✅ Should match backend route
  return data;
};

// ✅ Create a new queue (Admins only)
export const createQueue = async (queueData) => {
  return await API.post("/queues", queueData); // ✅ Matches backend POST route
};
// 🔹 **Search for queues by name**
export const searchQueues = async (query) => {
  const { data } = await API.get(`/queues/search?name=${query}`);
  return data;
};
                
// Fetch queues created by the admin
export const getAdminQueues = async () => {
  const { data } = await API.get("/queues/admin");
  return data;
};

// Fetch queues the customer has joined
export const getCustomerQueues = async () => {
  const { data } = await API.get("/queues/customer");
  return data;
};


// Join a queue
export const joinQueue = async (queueId) => {
  const { data } = await API.post(`/queues/join/${queueId}`);
  return data;
};

// Mark a queue as completed (leave queue)
export const completeQueue = async (queueId) => {
  const { data } = await API.post(`/queues/complete/${queueId}`);
  return data;
};
