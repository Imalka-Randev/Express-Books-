import axios from 'axios';

// 1. Create a custom Axios instance
const apiClient = axios.create({
  // This is the URL of our Express backend, loaded from the .env file
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send secure cookies automatically
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

// 3. Set up Response Interceptor (Handling Token Expiration)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to get a new access token using the secure HttpOnly refresh cookie
        const res = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true });
        
        // Save the new short-lived access token
        localStorage.setItem('token', res.data.token);
        
        // Update the failed request with the new token and retry it
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        // If refresh fails (e.g. refresh token expired or revoked), force logout
        localStorage.removeItem('token');
        window.location.href = '/auth'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;