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
      name: "lastname",
      type: "text",
      placeholder: "Perez",
      label: "Apellido",
      validation: Yup.string().required("Tu Apellido es necesario.").min(3, "Tu Apellido debe tener almenos 3 caracteres."),
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
        .min(8, "La contraseña debe tener almenos 8 caracteres.")
        .required("La contraseña es necesaria."),
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
    {
      name: "birthdate",
      type: "Date",
      placeholder: "01/01/2000",
      label: "Tu fecha de nacimiento",
      validation: Yup.string().required("Indica tu fecha de nacimiento."),
    },
    {
      name: "address",
      type: "text",
      placeholder: "Calle san pepe 123",
      label: "Dirección",
      validation: Yup.string().required("Indica en que ciudad vives actualmente."),
    },
    {
      name: "city",
      type: "text",
      placeholder: "Posadas",
      label: "Ciudad",
      validation: Yup.string().required("Indica en que ciudad vives actualmente."),
    },
    // {
    //   name: "province",
    //   type: "text",
    //   placeholder: "Cordoba",
    //   label: "Ciudad",
    //   validation: Yup.string().required("Indica en que Provincia vives actualmente."),
    // },
    // {
    //   name: "zipCode",
    //   type: "number",
    //   placeholder: "3300",
    //   label: "Codigo Postal",
    //   validation: Yup.string().required("Indica el codigo postal."),
    // },
    {
      name: "phone",
      type: "number",
      placeholder: "123456789",
      label: "Número de Telefono",
      validation: Yup.string().required("Tu Número de telefono es necesario.")
    }
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
