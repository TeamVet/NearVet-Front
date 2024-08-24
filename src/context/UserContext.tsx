"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FormRegisterValues, FormValues, User, UserContextType } from '../types/interfaces';
import { fetcherLogin, fetcherRegister } from '@/lib/fetcher';
import { useRouter } from 'next/navigation';


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const url_login = `/authGlobal/signin`;
  const url_register = `/authGlobal/signup`;
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
      if (response.id) {
        document.cookie = `auth-token=${response.token}; path=/`;
        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        //TODO : notificamos al usuario y lo llevamos a la página principal
        alert('Logueado correctamente');
        router.push('/userDashboard');
      }
    } catch (error: any) {
      setError(`Error al loguearse ${error.message}`);
      alert(`Error al loguearse ${error.message}`);
    }
    finally {
      setLoading(false);
    }
  };

  const logoutContext = () => {
    console.log('Saliendo...'),
      localStorage.removeItem('user');
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/');
  };


  const registerContext = async (values: FormRegisterValues | FormValues) => {
    setLoading(true);
    setError(null)
    values = { ...values, isAdmin: true, birthdate: "2000-01-01", startDate: "2000-01-01", phone: 2, address: " Desconocido", role: "adminVet" };

    try {
      const response = await fetcherRegister(url_register, values);
      if (response.id) {
        alert("Vamos a intentar loguearte");
        let valuesForLogin = {
          email: values.email, password: values.password
        }
        const loginResponse = await loginContext(valuesForLogin);
        alert('Logueado con exito');
        return loginResponse;
      }
      return response
    } catch (error: any) {
      setError(`Error al Registrarse:  ${error.message}`);
      alert(`Error al Registrarse:  ${error.message}`)
    }

    finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext, error, loading, registerContext }}>
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
