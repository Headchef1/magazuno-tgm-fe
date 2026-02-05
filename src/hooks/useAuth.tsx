import { useState, useEffect } from 'react';
import { authenticateUser, getStoredToken } from '@/api/auth';
import WebApp from '@twa-dev/sdk';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      // Искусственная задержка, чтобы увидеть лоадер (необязательно, но приятно)
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const storedToken = getStoredToken();
        if (storedToken) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // Проверяем среду выполнения БЕЗОПАСНЫМ способом
        // @ts-ignore - игнорируем ошибку TS, если типы vite не подтянулись
        const isDev = import.meta.env.DEV;
        const hasTelegramData = WebApp.initData && WebApp.initData.length > 0;

        if (isDev && !hasTelegramData) {
          console.log('🔶 DEV MODE: Telegram initData missing. Faking auth for browser.');
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // Реальная авторизация
        await authenticateUser();
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Auth failed', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  return { isAuthenticated, isLoading, error };
};
