import WebApp from '@twa-dev/sdk';

// Инициализация Telegram WebApp
export const initTelegram = () => {
  WebApp.ready();
  WebApp.expand();

  // Применяем тему Telegram
  document.body.style.backgroundColor = WebApp.backgroundColor;

  return WebApp;
};

// Получение initData для бэкенда
export const getInitData = (): string => {
  return WebApp.initData;
};

// Получение данных пользователя
export const getTelegramUser = () => {
  return WebApp.initDataUnsafe.user;
};

export default WebApp;
