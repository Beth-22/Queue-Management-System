import API from './api';

export const loginUser = async (userData) => {
    const { data } = await API.post("/users/login", userData);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  };
  

// Create a new queue
export const createQueue = async (queueData) => {
    const response = await API.post('/queues', queueData);
    return response.data; // Contains queue details
};

// Get all queues (with optional filters)
export const getAllQueues = async (filters = {}) => {
    const response = await API.get('/queues', { params: filters });
    return response.data; // Contains list of queues
};

// Update a queue's status
export const updateQueueStatus = async (queueId, status) => {
    const response = await API.put(`/queues/${queueId}`, { status });
    return response.data; // Contains updated queue details
};

// Delete a queue
export const deleteQueue = async (queueId) => {
    const response = await API.delete(`/queues/${queueId}`);
    return response.data; // Contains confirmation message
};

// Get queues created by the logged-in user
export const getCreatedQueues = async () => {
    const response = await API.get('/queues/created');
    return response.data; // Contains list of created queues
};

// Get queues the user is waiting for
export const getWaitingQueues = async () => {
    const response = await API.get('/queues/waiting');
    return response.data; // Contains list of queues the user is waiting for
};
