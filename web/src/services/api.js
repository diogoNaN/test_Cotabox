import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3003'// server|backend
});

export default api;