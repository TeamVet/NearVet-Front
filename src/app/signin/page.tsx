"use client";
import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";
import Screen from "@/components/Screen";
import { loginFields } from "@/lib/FormsFields";

const LoginForm: React.FC = () => {
  const { loginContext } = useUser();
  return (
    <Screen>
      <AuthForm
        title="Acceder con tu cuenta"
        subtitle="No tienes una cuenta todavia?"
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
