import axios from 'axios';

// Both dev and production use the same /api/* paths:
// - Dev: Vite proxy forwards /api/* to localhost:5000
// - Production: Vercel rewrites /api/* to the serverless function
const api = axios.create({
  baseURL: '',
});

export default api;
