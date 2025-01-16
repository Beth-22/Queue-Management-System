import API from './api';

// Submit feedback
export const submitFeedback = async (feedbackData) => {
    const response = await API.post('/feedback', feedbackData);
    return response.data; // Contains feedback details
};

// Get feedback for a service
export const getServiceFeedback = async (serviceName) => {
    const response = await API.get(`/feedback/${serviceName}`);
    return response.data; // Contains list of feedback
};
