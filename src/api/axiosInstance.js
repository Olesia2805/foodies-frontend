import axios from 'axios';
import { store } from '../redux/store';
import { refreshTokenOps, logOutUserOps } from '../redux/auth/index.js';

const { VITE_API_URL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    if (
      error.response?.status === 403 &&
      originalRequest.url.includes('/auth/refresh-token')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const response = await store
          .dispatch(refreshTokenOps(refreshToken))
          .unwrap();

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        store.dispatch(logOutUserOps());
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
