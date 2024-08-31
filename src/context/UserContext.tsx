"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormRegisterValues, FormValues, User } from "@/types/interfaces";
import PATHROUTES from "@/helpers/path-routes";
import { LoginController, RegisterController } from "@/lib/authController";
import { InfoNotify, PromessNotify, SuccessNotify } from "@/lib/toastyfy";
import { useRouter } from "next/navigation";

interface UserContextType {
  session: any;
  status: string;
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  loginWithCredentials: (values: FormValues) => Promise<void>;
  logout: () => void;
  registerWithCredentials: (values: FormRegisterValues) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async () => {
    const response = await PromessNotify(
      "Iniciando sesión...",
      "Iniciaste sesión exitosamente",
      signIn("google", { callbackUrl: PATHROUTES.USER_DASHBOARD })
    );
  };

  const loginWithCredentials = async (values: FormValues) => {
    const login = await LoginController(values);
    if (login.id) {
      localStorage.setItem("user", JSON.stringify(login));
      document.cookie = `user=${JSON.stringify(login.token)}; path=/;`;
      setUser(login);
      router.push(PATHROUTES.USER_DASHBOARD);
    }
  };

  const logout = () => {
    SuccessNotify("Sesión cerrada");
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    signOut();
  };

  const registerWithCredentials = async (values: FormRegisterValues) => {
    const register = await RegisterController(values);
    if (register.id) {
      InfoNotify("Intentamos loguearte");
      const loginValues = { dni: values.dni, password: values.password };
      loginWithCredentials(loginValues);
      localStorage.setItem("user", JSON.stringify(register));
      document.cookie = `user=${JSON.stringify(register.token)}; path=/;`;
      setUser(register);
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
