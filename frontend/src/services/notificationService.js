import API from './api';

// Create a notification
export const createNotification = async (notificationData) => {
    const response = await API.post('/notifications', notificationData);
    return response.data; // Contains notification details
};

// Get user notifications
export const getUserNotifications = async (userId) => {
    const response = await API.get(`/notifications/${userId}`);
    return response.data; // Contains list of notifications
};
