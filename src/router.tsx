import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CreateProductPage from './pages/create-product';
import FeedPage from './pages/feed';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
      {
        path: 'create-product',
        element: <CreateProductPage />,
      },
    ],
  },
]);
