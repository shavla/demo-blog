import { useState, useEffect } from 'react';
import { isTokenValid, getUser, getToken } from '../utils/auth';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isTokenValid();
      const userData = getUser();
      
      setIsAuthenticated(authenticated);
      setUser(authenticated ? userData : null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    token: getToken()
  };
};