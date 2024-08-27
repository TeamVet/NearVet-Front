import { InputField } from "@/types/interfaces";
import * as Yup from "yup";
export const registerFields: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Juan",
    label: "Nombre",
    validation: Yup.string()
      .required("Tu nombre es necesario.")
      .min(3, "Tu nombre debe tener almenos 3 caracteres."),
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Perez",
    label: "Apellido",
    validation: Yup.string()
      .required("Tu Apellido es necesario.")
      .min(2, "Tu Apellido debe tener almenos 2 caracteres."),
  },
  {
    name: "dni",
    type: "number",
    placeholder: "30350201",
    label: "Documento de Identidad",
    validation: Yup.string()
      .required("El DNI es necesario.")
      .min(7, "El DNI debe tener almenos 7 caracteres.")
      .matches(
        /^[0-9]+$/,
        "El DNI solo puede contener números, sin guiones ni espacios."
      ),
  },
  {
    name: "birthdate",
    type: "Date",
    placeholder: "dd/mm/aaaa",
    label: "Fecha de Nacimiento",
    validation: Yup.string().required("La fecha es necesaria."),
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
      .required("La contraseña es necesaria.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "La contraseña debe tener almenos 6 caracteres, una letra mayúscula, una letra minúscula, un numero y un caracter especial."
      ),
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "******",
    label: "Confirmacion de contraseña",
    validation: Yup.string()
      .min(8, "La contraseña debe tener almenos 8 caracteres.")
      .required("La contraseña es necesaria.")
      .oneOf([Yup.ref("password")], "Las contraseña no coinciden."),
  },
];

export const loginFields: InputField[] = [
  {
    name: "dni",
    type: "number",
    placeholder: "40236159",
    label: "Documento de Identidad",
    validation: Yup.string().required("Tu DNI es necesario."),
  },
  {
    name: "password",
    type: "password",
    placeholder: "******",
    label: "Password",
    validation: Yup.string()
      .min(8, "Tu contraseña tiene como minimo 8 caracteres.")
      .required("Debes ingresar tu contraseña."),
  },
];

export const newPetFields: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Firulais...",
    label: "Nombre",
    validation: Yup.string()
      .required("El nombre es necesario.")
      .min(3, "El nombre debe tener almenos 3 caracteres."),
  },
  {
    name: "birthdate",
    type: "Date",
    placeholder: "dd/mm/aaaa",
    label: "Fecha de Nacimiento de tu animal",
    validation: Yup.string(),
  },
  {
    name: "color",
    type: "text",
    placeholder: "Negro",
    label: "Color",
    validation: Yup.string().required("El color es necesario."),
  },
];
