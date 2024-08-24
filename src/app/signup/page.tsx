"use client";
import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";

import Screen from "@/components/Screen";
import { registerFields } from "@/lib/FormsFields";
const RegisterForm: React.FC = () => {
  const { registerContext } = useUser();
  return (
    <Screen>
      <AuthForm
        title="Registrarte como Usuario"
        subtitle="Ya tienes una cuenta?"
        linkText="Iniciar sesión"
        linkHref="/signin"
        buttonText="Registrarse"
        onSubmit={registerContext}
        inputFields={registerFields}
        googleButtonText="Registrarte con Google"
      />
    </Screen>
  );
};

export default RegisterForm;
