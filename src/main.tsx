import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'; // 2. Импортируем наш созданный роутер
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Твои настройки QueryClient (ОСТАВЛЯЕМ)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* 3. ЗАМЕНЯЕМ <App /> на <RouterProvider /> */}
      {/* App.tsx теперь будет рендериться ВНУТРИ RouterProvider, так как мы указали его в router.tsx */}
      <RouterProvider router={router} />

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
