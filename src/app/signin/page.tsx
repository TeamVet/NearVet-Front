"use client";
import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";
import * as Yup from "yup";
import Screen from "@/components/Screen";

const LoginForm: React.FC = () => {
  const { loginContext } = useUser();

  const loginFields = [
    {
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
      label: "Email",
      validation: Yup.string()
        .email("Enter a valid email. Example abc@example.com")
        .required("Email is required.")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
          "Enter a valid email. Example abc@example.com"
        ),
    },
    {
      name: "password",
      type: "password",
      placeholder: "******",
      label: "Password",
      validation: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
    },
  ];

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
