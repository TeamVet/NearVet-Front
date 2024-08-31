"use client";

import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";
import Screen from "@/components/Screen";
import { registerFields } from "@/lib/FormsFields";
import { FormRegisterValues } from "@/types/interfaces";

const RegisterForm: React.FC = () => {
  const { registerWithCredentials } = useUser();
  return (
    <Screen>
      <AuthForm<FormRegisterValues>
        title="Registrarte como Usuario"
        subtitle="¿Ya tienes una cuenta?"
        linkText="Iniciar sesión"
        linkHref="/signin"
        buttonText="Registrarse"
        onSubmit={registerWithCredentials}
        inputFields={registerFields}
      />
    </Screen>
  );
};

export default RegisterForm;
