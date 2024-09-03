"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  User,
  UserContextType,
} from "@/types/interfaces";
import PATHROUTES from "@/helpers/path-routes";
import {
  loginController,
  petController,
  registerUserController,
  registerWithGoogleController,
} from "@/lib/authController";
import { InfoNotify, PromessNotify, SuccessNotify } from "@/lib/toastyfy";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser && !user && session) {
        const values = {
          name: session?.user?.name!,
          email: session?.user?.email!,
          imgProfile: session?.user?.image!,
          startDate: new Date(),
        };

        const register = await registerWithGoogleController(values);
        if (register?.id) {
          localStorage.setItem("user", JSON.stringify(register));
          document.cookie = `auth-token=${JSON.stringify(
            register.token
          )}; path=/;`;
          setUser(register);
          router.push(PATHROUTES.USER_DASHBOARD);
        }
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [session]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async () => {
    await PromessNotify(
      "Iniciando sesión...",
      "Iniciaste sesión exitosamente",
      signIn("google", {
        redirect: false,
        callbackUrl: PATHROUTES.USER_DASHBOARD,
      })
    );
  };

  const loginWithCredentials = async (values: FormValues) => {
    const login = await loginController(values);
    if (login) {
      localStorage.setItem("user", JSON.stringify(login));
      document.cookie = `auth-token=${JSON.stringify(login.token)}; path=/;`;
      setUser(login);
      router.push(PATHROUTES.USER_DASHBOARD);
    }
  };

  const logout = () => {
    SuccessNotify("Sesión cerrada");
    document.cookie =
      "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie =
      "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUser(null);
    signOut();
    localStorage.clear();
  };

  const registerWithCredentials = async (values: FormRegisterValues) => {
    const register = await registerUserController(values);
    if (register) {
      const loginValues = { dni: values.dni!, password: values.password! };
      loginWithCredentials(loginValues);
    }
  };

  const registerPet = async (values: FormNewPet) => {
    const registerPet = await petController(
      values,
      user?.id as string,
      user?.token as string
    );
    if (registerPet) {
      InfoNotify("Vamos a ver tus mascotas");
      router.push(PATHROUTES.PET);
    }
  };

  return (
    <UserContext.Provider
      value={{
        session,
        status,
        user,
        loginWithGoogle,
        loginWithCredentials,
        logout,
        registerWithCredentials,
        registerPet,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
