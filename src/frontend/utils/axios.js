// src/frontend/utils/axios.js
import axios from 'axios';

const api = axios.create({});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('authToken');
      window.location.href = 'auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;