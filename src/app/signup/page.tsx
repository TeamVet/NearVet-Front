"use client";
import React from "react";
import AuthForm from "../../components/AuthForm";
import { useUser } from "@/context/UserContext";
import * as Yup from "yup";
import Screen from "@/components/Screen";
const RegisterForm: React.FC = () => {
  const { registerContext } = useUser();

  const registerFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Juan",
      label: "Nombre",
      validation: Yup.string().required("Tu nombre es necesario.").min(3, "Tu nombre debe tener almenos 3 caracteres."),
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Perez",
      label: "Apellido",
      validation: Yup.string().required("Tu Apellido es necesario.").min(2, "Tu Apellido debe tener almenos 2 caracteres."),
    },
    {
      name: "dni",
      type: "number",
      placeholder: "30350201",
      label: "Documento de Identidad",
      validation: Yup.string().required("El DNI es necesario.").min(7, "El DNI debe tener almenos 7 caracteres.").matches(/^[0-9]+$/, "El DNI solo puede contener números, sin guiones ni espacios."),
    },
    {
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
      label: "Email",
      validation: Yup.string()
        .email("Ingresa un email valido. Ejemplo: abc@example.com")
        .required("El Email es necesario.")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
          "Ingresa un email valido. Ejemplo: abc@example.com"
        ),
    },
    {
      name: "password",
      type: "password",
      placeholder: "******",
      label: "Contraseña",
      validation: Yup.string()
        .min(6, "La contraseña debe tener almenos 6 caracteres.")
        .required("La contraseña es necesaria.").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, "La contraseña debe tener almenos 6 caracteres, una letra mayúscula, una letra minúscula, un numero y un caracter especial."),
    },
    {
      name: "passwordConfirm",
      type: "password",
      placeholder: "******",
      label: "Confirmacion de contraseña",
      validation: Yup.string()
        .min(8, "La contraseña debe tener almenos 8 caracteres.")
        .required("La contraseña es necesaria.").oneOf([Yup.ref("password")], "Las contraseña no coinciden."),
    },

  ];

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
