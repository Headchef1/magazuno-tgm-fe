import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Store, 
  Plus, 
  Package, 
  Settings, 
  ShoppingBag 
} from 'lucide-react';

import { getProfile, getMyProducts } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage = () => {
  const navigate = useNavigate();
  // Assuming createLogoutAction clears token and updates store
const logout = useUserStore((state) => state.logout);

  // Query for User Profile
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // Query for User's Products
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['my-products'],
    queryFn: getMyProducts,
  });

  const handleLogout = () => {
    logout(); // Clear local storage & zustand
    navigate('/'); // Go back to homepage
    window.location.reload();  // Or reload page to trigger auth flow
  };

  if (isUserLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 animate-in fade-in duration-500">
      
      {/* 1. Header Section with Gradient Background */}
      <div className="bg-white pb-6 pt-8 rounded-b-[2rem] shadow-sm border-b px-6 text-center relative overflow-hidden">
         {/* Decorational background blob */}
         <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg ring-1 ring-gray-100">
            <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
            <AvatarFallback className="text-2xl font-bold bg-slate-200 text-slate-600">
              {user?.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {user?.firstName}
            </h1>
            {user?.username && (
              <p className="text-sm font-medium text-slate-500">@{user.username}</p>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        
        {/* 2. Shop Status Section */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-semibold text-slate-800">My Shop</h2>
            {user?.shop && <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>}
          </div>

          {user?.shop ? (
            <Card className="border-none shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              {/* Abstract pattern */}
              <div className="absolute right-[-20px] top-[-20px] opacity-10">
                <Store size={140} />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{user.shop.name}</CardTitle>
                <p className="text-slate-300 text-sm opacity-90 line-clamp-1">
                  {user.shop.description || 'Welcome to my digital store'}
                </p>
              </CardHeader>
              <CardContent className="pt-4 flex gap-3">
                <Button 
                  onClick={() => navigate('/create-product')}
                  className="bg-white text-slate-900 hover:bg-slate-100 flex-1 font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" /> Manage
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-slate-200 shadow-none bg-slate-50/50">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">No shop yet</h3>
                  <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                    Start selling your digital goods in minutes.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/create-shop')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg mt-2 w-full max-w-[200px]"
                >
                  Create Shop
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* 3. Products List Section */}
        {user?.shop && (
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-lg font-semibold text-slate-800">Inventory</h2>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {products?.length || 0} items
              </span>
            </div>

            {isProductsLoading ? (
               <div className="space-y-3">
                 <Skeleton className="h-20 w-full rounded-xl" />
                 <Skeleton className="h-20 w-full rounded-xl" />
               </div>
            ) : products && products.length > 0 ? (
              <div className="space-y-3">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="group flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div className="h-16 w-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 relative">
                       {product.imageUrl ? (
                         <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
                       ) : (
                         <div className="h-full w-full flex items-center justify-center text-slate-300">
                           <ShoppingBag size={20} />
                         </div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">{product.title}</h4>
                      <p className="text-sm text-slate-500 truncate">Digital Product</p>
                    </div>
                    <div className="font-semibold text-slate-900">
                      ${product.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No products added yet.</p>
              </div>
            )}
          </section>
        )}
        
      </div>
    </div>
  );
};

// Separate Skeleton Component for cleaner code
const ProfileSkeleton = () => (
  <div className="p-6 space-y-8 animate-pulse">
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2 text-center w-full flex flex-col items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-40 w-full rounded-2xl" />
    <div className="space-y-3">
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </div>
  </div>
);

export default ProfilePage;
