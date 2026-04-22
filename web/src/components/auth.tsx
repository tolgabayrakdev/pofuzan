import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { isAuthenticated, getUser } from '@/lib/auth';

export function useAuth() {
  return {
    isAuthenticated: isAuthenticated(),
    user: getUser(),
  };
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-4 h-4 border border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
