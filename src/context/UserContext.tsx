// userContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  Mascota,
  User,
  UserContextType,
} from "../types/interfaces";

import verifyToken from "@/lib/token";
import PATHROUTES from "@/helpers/path-routes";
import { useRouter } from "next/navigation";
import { addPet, login, register } from "@/lib/authService";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (
    userData: FormValues
  ): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    alert("Logueando...");
    try {
      const response = await login(userData);
      if (response.token) {
        document.cookie = `auth-token=${response.token}; path=/`;
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        const decodedData = verifyToken(response.token);
        console.log("decodedData :", decodedData);
        alert("Logueado correctamente");
        router.push("/userDashboard");
        return response;
      }
    } catch (error: any) {
      setError(`Error al loguearse: ${error.message}`);
      alert(`Error al loguearse: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    router.push("/");
  };

  const handleRegister = async (
    values: FormRegisterValues
  ): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    const startDate = new Date();
    values = {
      ...values,
      rol: "user",
      startDate,
      phone: 1168775654,
      address: "Avenida Importante 4000",
      imgProfile: "image.jpg",
      city: "Example City",
      birthDate: "1988-01-02T00:00:00.000Z",
    };
    try {
      const response = await register(values);
      if (response.id) {
        alert("Te registramos con éxito. Vamos a intentar loguearte.");
        const loginResponse = await handleLogin({
          dni: values.dni,
          password: values.password,
        });
        if (loginResponse?.token) {
          alert("Logueado correctamente...");
          router.push("/userDashboard");
          return loginResponse;
        }
      }
      return response;
    } catch (error: any) {
      setError(`Error al registrarse: ${error.message}`);
      alert(`Error al registrarse: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (
    values: FormNewPet
  ): Promise<Mascota | undefined> => {
    setLoading(true);
    setError(null);
    const startDate = new Date();
    values = {
      ...values,
      userId: user!.id,
      startDate,
    };
    const token = user?.token as string;
    try {
      const response = await addPet(values, token);
      if (response.id) {
        alert("Mascota registrada con éxito");
        router.push(PATHROUTES.PET);
        return response;
      } else throw new Error();
    } catch (error: any) {
      setError(`Error al registrar la mascota: ${error.message}`);
      alert(`Error al registrar la mascota: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginContext: handleLogin,
        logoutContext: handleLogout,
        error,
        loading,
        registerContext: handleRegister,
        newPet: handleAddPet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
