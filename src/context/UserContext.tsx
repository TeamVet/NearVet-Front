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
import {
  ErrorNotify,
  InfoNotify,
  PromessNotify,
  SuccessNotify,
} from "@/lib/toastyfy";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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

    try {
      const response = await PromessNotify(
        "Logueándote...",
        "Logueado exitosamente",
        login(userData)
      );

      if (response.token) {
        document.cookie = `auth-token=${response.token}; path=/`;
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        // const decodedData = verifyToken(response.token);
        // console.log("decodedData :", decodedData);
        router.push("/userDashboard");
        return response;
      }
    } catch (error: any) {
      ErrorNotify(`Error al loguearse: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    SuccessNotify("Sesión cerrada");
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
      const response = await PromessNotify(
        "Registrandote...",
        "Registrado exitosamente",
        register(values)
      );
      if (response.id) {
        InfoNotify("Vamos a intentar loguearte");
        const loginResponse = await handleLogin({
          dni: values.dni,
          password: values.password,
        });
        if (loginResponse?.token) {
          router.push("/userDashboard");
          return loginResponse;
        }
      }
      return response;
    } catch (error: any) {
      ErrorNotify(`Error al registrarte: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (
    values: FormNewPet
  ): Promise<Mascota | undefined> => {
    setLoading(true);
    const startDate = new Date();
    values = {
      ...values,
      userId: user!.id,
      startDate,
    };
    const token = user?.token as string;
    console.log("token :", token);
    try {
      const response = await PromessNotify(
        "Registrando...",
        "Registrado exitosamente",
        addPet(values, token)
      );
      if (response.id) {
        router.push(PATHROUTES.PET);
        return response;
      } else throw new Error();
    } catch (error: any) {
      ErrorNotify(`Error al registrarte: ${error.message}`);
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
