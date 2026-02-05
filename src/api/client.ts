import axios from 'axios';
import { getStoredToken } from './auth';

const apiClient = axios.create({
  baseURL: 'https://api.magazuno.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Автоматическая подстановка JWT токена
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обработка ошибок (например, 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Здесь можно добавить логику разлогина
      // localStorage.removeItem('jwt_token');
      // window.location.reload();
      console.warn('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
