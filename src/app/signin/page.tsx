"use client";

import React from "react";
import AuthForm from "../../components/AuthForm";
import Screen from "@/components/Screen";
import { loginFields } from "@/lib/FormsFields";
import { FormValues } from "@/types/interfaces";
import { useUser } from "@/context/UserContext";
const SignIn: React.FC = () => {
  const { loginWithCredentials } = useUser();
  const handleSubmit = async (values: FormValues) => {
    loginWithCredentials(values);
  };
  return (
    <Screen>
      <AuthForm<FormValues>
        title="Acceder con tu cuenta"
        subtitle="¿No tienes una cuenta todavía?"
        linkText="Registrarse"
        linkHref="/signup"
        buttonText="Iniciar"
        onSubmit={handleSubmit}
        inputFields={loginFields}
        googleButtonText="Iniciar con Google"
      />
    </Screen>
  );
};

export default SignIn;
