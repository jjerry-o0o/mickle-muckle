import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export { axiosApi };
