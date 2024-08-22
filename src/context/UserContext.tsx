"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FormValues, User, UserContextType } from '../types/interfaces';
import { fetcherLogin } from '@/lib/fetcher';
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const url_login = `/authGlobal/signin`;
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginContext = async (userData: FormValues) => {
    setLoading(true);
    setError(null)
    try {
      const response = await fetcherLogin(url_login, userData);
      if (!response) throw new Error('Error al loguearse');
      if (response.token) {
        document.cookie = `auth-token=${response.token}; path=/`;
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        //TODO : notificamos al usuario y lo llevamos a la página principal
      }
    } catch (error: any) {
      setError('Error al loguearse, por favor verifique su usuario y contraseña.');
    }
    finally {
      setLoading(false);
    }
  };

  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
