import { create } from 'zustand';

interface User {
  id: number;
  telegramId: string;
  firstName: string;
  username?: string;
  avatarUrl?: string;
  shop?: {
    id: number;
    name: string;
  };
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, isAuthenticated: false });
  },
}));
