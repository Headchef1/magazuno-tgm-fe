import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Loader2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Массив картинок
  description?: string;
}

export default function FeedPage() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<Product[]>('/api/products'); // Или '/products' если без префикса
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">Failed to load products 😢</div>;
  }

  if (!products?.length) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No products yet. Be the first to sell!
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <h1 className="text-2xl font-bold mb-4">New Arrivals 🔥</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex flex-col"
          >
            {/* Image */}
            <div className="aspect-square bg-secondary/30 relative">
              {product.images && product.images[0] ? (
                <img
                  src={`http://localhost:3000${product.images[0]}`} // Добавляем хост, т.к. путь относительный
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                  No image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>
              <div className="mt-2 font-bold text-primary">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
