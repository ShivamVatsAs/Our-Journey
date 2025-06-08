import axios from 'axios';

// Create a re-usable axios instance with a base URL.
// The proxy in vite.config.js will forward requests from '/api'
// to your backend server at http://localhost:5001
const api = axios.create({
  baseURL: '/api',
});

export default api;