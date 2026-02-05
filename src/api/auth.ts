import axios from 'axios';
import { getInitData } from '@/services/telegram';

const API_URL = 'https://api.magazuno.com';

export const authenticateUser = async (): Promise<string> => {
  try {
    const initData = getInitData();

    const response = await axios.post(`${API_URL}/auth/telegram`, {
      initData,
    });

    const { accessToken } = response.data;

    // Сохраняем токен в localStorage
    localStorage.setItem('jwt_token', accessToken);

    return accessToken;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

export const clearToken = () => {
  localStorage.removeItem('jwt_token');
};
