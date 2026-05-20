import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

// Attach JWT Token Automatically
axiosInstance.interceptors.request.use(
  // This function runs before every request is sent to the backend. It checks if a JWT token is stored in localStorage and, if found, adds it to the Authorization header of the request. This way, we don't have to manually include the token in every API call; it will be automatically included as long as the user is logged in and has a token stored.
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default axiosInstance;
