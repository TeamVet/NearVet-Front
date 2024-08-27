"use client";

import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";
import Screen from "@/components/Screen";
import { loginFields } from "@/lib/FormsFields";
import { FormValues } from "@/types/interfaces";

const LoginForm: React.FC = () => {
  const { loginContext } = useUser();
  return (
    <Screen>
      <AuthForm<FormValues>
        title="Acceder con tu cuenta"
        subtitle="¿No tienes una cuenta todavía?"
        linkText="Registrarse"
        linkHref="/signup"
        buttonText="Iniciar"
        onSubmit={loginContext}
        inputFields={loginFields}
        googleButtonText="Iniciar con Google"
      />
    </Screen>
  );
};

export default LoginForm;
