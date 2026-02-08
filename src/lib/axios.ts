import axios from 'axios';

// Create Axios instance with base configuration
// URL should point to your backend
export const api = axios.create({
  baseURL: 'http://localhost:3000', // Ensure this matches your NestJS port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include Auth token (initData) in every request
// We will use this later for Telegram authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
