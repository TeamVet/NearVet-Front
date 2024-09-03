import * as Yup from "yup";
// Esquema de validación para registrar user
export const registrationValidationSchema = {
  nombre: Yup.string().required("Nombre es obligatorio"),
  apellido: Yup.string().required("Apellido es obligatorio"),
  DNI: Yup.string()
    .required("DNI es obligatorio")
    .matches(
      /^[0-9]+$/,
      "El DNI solo puede contener números, sin guiones ni espacios."
    ),
  email: Yup.string()
    .email("Email no es válido")
    .required("Email es obligatorio")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Ingresa un email valido. Ejemplo: abc@example.com"
    ),
  password: Yup.string()
    .min(8, "Contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es obligatoria")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Debes ingresar al menos una letra Mayuscula, una minuscula, un numero y un caracter especial."
    ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas no coinciden")
    .required("Confirmación de contraseña es obligatoria"),
  phone: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Ingresa un telefono valido. Ejemplo: 12345678"
  ),
  address: Yup.string().min(1, "La dirección debe tener 1 o más caracteres"),
  city: Yup.string().min(1, "La ciudad debe tener 1 o más caracteres"),
};

// Esquema de validación para login
export const loginValidationSchema = {
  DNI: Yup.string().required("DNI es obligatorio"),
  contrasenia: Yup.string().required("Contraseña es obligatoria"),
};

// Esquema de validación para creación de mascota
export const petCreationValidationSchema = {
  nombre: Yup.string().required("Nombre es obligatorio"),
  nacimiento: Yup.date(),
  color: Yup.string().required("Color es obligatorio"),
  especie: Yup.string().required("Especie es obligatoria"),
  raza: Yup.string().required("Raza es obligatoria"),
  sexo: Yup.string().required("Sexo es obligatorio"),
  pesoActual: Yup.number().min(0, "Peso no puede ser negativo"),
  observaciones: Yup.string(),
};

export const appointmentValidationSchema = {
  pet: Yup.string().required("Seleccionar una mascota es obligatorio"),
  date: Yup.date().required("Fecha es obligatoria"),
  time: Yup.string().required("Hora es obligatoria"),
  service: Yup.string().required("Seleccionar un servicio es obligatorio"),
  observations: Yup.string(),
  messageUser: Yup.string().required("Tu mensaje es obligatorio"),
};
