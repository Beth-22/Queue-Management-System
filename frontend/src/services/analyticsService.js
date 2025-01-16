import API from './api';

// Get analytics data
export const getAnalytics = async () => {
    const response = await API.get('/analytics');
    return response.data; // Contains analytics metrics
};

// Update analytics data
export const updateAnalytics = async (metric, value) => {
    const response = await API.post('/analytics', { metric, value });
    return response.data; // Contains updated analytics metrics
};
