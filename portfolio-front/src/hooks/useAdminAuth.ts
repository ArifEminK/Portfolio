import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('adminAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        // Redirect to login if not authenticated
        router.push('/admin');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const login = (username: string, password: string) => {
    // Admin credentials (production'da environment variables'da olmalı)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: 'Geçersiz kullanıcı adı veya şifre!' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
