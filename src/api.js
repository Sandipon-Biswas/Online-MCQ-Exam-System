import axios from 'axios';
import { getToken } from './auth';

const API = axios.create({
  baseURL: 'https://online-mcq-exam-system.onrender.com/api'
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;
  return config;
});

export default API;
