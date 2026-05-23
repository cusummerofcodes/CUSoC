import axios from 'axios';

// Centralized API client — set VITE_API_URL in your .env file
// In production, set VITE_API_URL to your deployed backend URL (e.g. https://your-api.vercel.app)
const api = axios.create({
  baseURL: import.meta.env.PROD ? '/_/backend' : (import.meta.env.VITE_API_URL || 'http://localhost:5000'),
});

export default api;
