import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { initTelegram } from '@/services/telegram';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Home, PlusSquare, User } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    initTelegram();
  }, []);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Magazuno...</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
        <h2 className="text-red-500 font-bold mb-2">Access Error</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Failed to authenticate via Telegram.
          <br />
          {error.message}
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 bg-background sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Magazuno</h1>
            <p className="text-xs text-muted-foreground">
              {isAuthenticated ? 'Online ✅' : 'Guest Mode'}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content (Pages: Feed, Create, Profile) */}
      <main className="flex-1 pb-20 px-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border h-16 flex items-center justify-around z-50 pb-safe">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 w-full transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
        >
          <Home size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Shop</span>
        </Link>

        <Link
          to="/create-product"
          className={`flex flex-col items-center gap-1 p-2 w-full transition-colors ${location.pathname === '/create-product' ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
        >
          <PlusSquare size={24} strokeWidth={location.pathname === '/create-product' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Sell</span>
        </Link>

        {/* Profile - NOW ACTIVE! */}
        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 p-2 w-full transition-colors ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground hover:text-primary/70'}`}
        >
          <User size={24} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

      {/* Add Toaster here - it will show toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
