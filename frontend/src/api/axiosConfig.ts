import axios from 'axios';

// 1. Create a custom Axios instance
const apiClient = axios.create({
  // This is the URL of our Express backend, loaded from the .env file
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Set up the Interceptor (The Security Guard)
apiClient.interceptors.request.use(
  (config) => {
    // Before the request leaves, check if we have a token saved
    const token = localStorage.getItem('token');
    
    // If we have a token, attach it to the Authorization header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // If something goes wrong setting up the request, reject it
    return Promise.reject(error);
  }
);

export default apiClient;