import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Interceptor to attach JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ TYPE DEFINITIONS ============

export interface Shop {
  id: number;
  name: string;
  description?: string;
}

export interface UserProfile {
  id: number;
  telegramId: string;
  firstName: string;
  username?: string;
  avatarUrl?: string;
  shop?: Shop | null; // Shop might not exist yet
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

// ============ API METHODS ============

// Fetch current user profile with shop data
export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get('/users/me');
  return data;
};

// Fetch user's own products
export const getMyProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products/my-products');
  return data;
};
