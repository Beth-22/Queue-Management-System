import API from "./api";

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

// Create a new queue (admin only)
export const createQueue = async (queueData) => {
  const { data } = await API.post("/queues/create", queueData);
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
