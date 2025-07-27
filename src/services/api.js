import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';


// const BASE_URL ='https://fleetify-backend.onrender.com/api'


const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
