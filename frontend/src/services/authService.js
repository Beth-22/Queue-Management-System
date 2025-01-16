import API from './api';

// Register a new user
export const registerUser = async (userData) => {
    const response = await API.post('/users/register', userData);
    return response.data; // Contains token and user info
};

// Login user
export const loginUser = async (credentials) => {
    const response = await API.post('/users/login', credentials);
    return response.data; // Contains token and user info
};

// Get user profile
export const getUserProfile = async () => {
    const response = await API.get('/users/profile');
    return response.data; // Contains user details
};
