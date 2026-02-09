import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { api } from '@/lib/api';
import { useUserStore } from '@/store/userStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Try to retrieve initData from Telegram environment
        const { initDataRaw } = retrieveLaunchParams();

        if (!initDataRaw) {
          console.warn('No initData found. Running outside Telegram environment.');
          setIsLoading(false);
          return;
        }

        // 2. Send initData to backend for validation
        const response = await api.post('/auth/telegram', {
          initData: initDataRaw,
        });

        const { accessToken, user } = response.data;

        // 3. Save token and user to state
        localStorage.setItem('accessToken', accessToken);
        setUser(user);

        console.log('✅ User authenticated:', user.firstName);
      } catch (error) {
        console.error('❌ Authentication failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};
