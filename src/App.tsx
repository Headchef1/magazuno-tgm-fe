import { useEffect } from 'react';
import { initTelegram } from '@/services/telegram';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth();

  useEffect(() => {
    initTelegram();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-telegram-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-button mx-auto mb-4"></div>
          <p className="text-telegram-hint">Загрузка Magazuno...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-telegram-bg p-4 text-center">
        <h2 className="text-red-500 font-bold mb-2">Ошибка доступа</h2>
        <p className="text-telegram-hint text-sm mb-4">
          Не удалось авторизоваться через Telegram.
          <br />
          {error.message}
        </p>
        <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-telegram-bg text-telegram-text p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Magazuno</h1>
        <p className="text-telegram-hint text-sm">
          {isAuthenticated ? 'Вы успешно авторизованы ✅' : 'Гостевой режим'}
        </p>
      </header>

      <main className="space-y-4">
        <div className="p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
          <h3 className="font-semibold mb-2">Тест UI Компонентов</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Если вы видите эту карточку и кнопку ниже — Shadcn UI настроен корректно.
          </p>
          <Button className="w-full bg-telegram-button text-telegram-buttonText hover:opacity-90 transition-opacity">
            Тестовая кнопка
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
