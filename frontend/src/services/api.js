import axios from "axios";

// Configure Axios
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL if deployed
});

// Add a token to the request headers if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User services
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const fetchDashboardData = () => API.get("/dashboard");
export default API;