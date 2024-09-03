import {
  appointmentValidationSchema,
  loginValidationSchema,
  petCreationValidationSchema,
  registrationValidationSchema,
} from "./FormValidation";
import { InputField } from "@/types/interfaces";

export const InputsRegisterUser: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Juan...",
    label: "Nombre",
    validation: registrationValidationSchema.nombre,
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Perez...",
    label: "Apellido",
    validation: registrationValidationSchema.apellido,
  },
  {
    name: "dni",
    type: "number",
    placeholder: "30350201",
    label: "DNI",
    validation: registrationValidationSchema.DNI,
  },
  {
    name: "email",
    type: "email",
    placeholder: "example@mail.com",
    label: "Email",
    validation: registrationValidationSchema.email,
  },
  {
    name: "password",
    type: "password",
    placeholder: "******",
    label: "Contraseña",
    validation: registrationValidationSchema.password,
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "******",
    label: "Confirmación de Contraseña",
    validation: registrationValidationSchema.passwordConfirm,
  },
];

export const InputsModifyUser: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Juan...",
    label: "Nombre",
    validation: registrationValidationSchema.nombre,
    initialValue: "",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Perez...",
    label: "Apellido",
    validation: registrationValidationSchema.apellido,
    initialValue: "",
  },
  {
    name: "dni",
    type: "number",
    placeholder: "30350201",
    label: "DNI",
    validation: registrationValidationSchema.DNI,
    initialValue: "",
  },
  {
    name: "email",
    type: "email",
    placeholder: "example@mail.com",
    label: "Email",
    validation: registrationValidationSchema.email,
    initialValue: "",
  },
  {
    name: "phone",
    type: "number",
    placeholder: "1123123456",
    label: "Telefono",
    validation: registrationValidationSchema.phone,
    initialValue: "",
  },
  {
    name: "address",
    type: "text",
    placeholder: "Calle 123",
    label: "Dirección",
    validation: registrationValidationSchema.address,
    initialValue: "",
  },
  {
    name: "city",
    type: "text",
    placeholder: "Bogota",
    label: "Ciudad",
    validation: registrationValidationSchema.city,
    initialValue: "",
  },
  {
    name: "birthday",
    type: "date",
    label: "Fecha de Nacimiento",
    initialValue: "",
  },
  {
    name: "password",
    type: "password",
    placeholder: "******",
    label: "Contraseña",
    validation: registrationValidationSchema.password,
    initialValue: "",
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "******",
    label: "Confirmación de Contraseña",
    validation: registrationValidationSchema.passwordConfirm,
    initialValue: "",
  },
];
export const InputsLogin = [
  {
    name: "dni",
    type: "number",
    placeholder: "40236159",
    label: "Documento de Identidad",
    validation: loginValidationSchema.DNI,
  },
  {
    name: "password",
    type: "password",
    placeholder: "******",
    label: "Contraseña",
    validation: loginValidationSchema.contrasenia,
  },
];

export const InputsRegisterPet: InputField[] = [
  {
    name: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Firulais",
    validation: petCreationValidationSchema.nombre,
  },
  {
    name: "birthdate",
    type: "date",
    label: "Fecha de Nacimiento",
    validation: petCreationValidationSchema.nacimiento,
  },
  {
    name: "color",
    type: "text",
    placeholder: "Negro con manchas blancas...",
    label: "Color",
    validation: petCreationValidationSchema.color,
  },
  {
    name: "specieId",
    type: "select",
    label: "Especie",
    validation: petCreationValidationSchema.especie,
    options: [],
  },
  {
    name: "raceId",
    type: "select",
    label: "Raza",
    validation: petCreationValidationSchema.raza,
    options: [],
  },
  {
    name: "sexId",
    type: "select",
    label: "Sexo",
    validation: petCreationValidationSchema.sexo,
    options: [],
  },
  {
    name: "weightCurrent",
    type: "number",
    label: "Peso Actual",
    placeholder: "0kg",
    validation: petCreationValidationSchema.pesoActual,
  },
  {
    name: "observaciones",
    type: "text",
    label: "Observaciones",
    placeholder: "Muerde mucho...",
    validation: petCreationValidationSchema.observaciones,
  },
];
export const InputsModifyPet: InputField[] = [
  {
    name: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Firulais",
    validation: petCreationValidationSchema.nombre,
  },
  {
    name: "birthdate",
    type: "date",
    label: "Fecha de Nacimiento",
    validation: petCreationValidationSchema.nacimiento,
  },
  {
    name: "color",
    type: "text",
    placeholder: "Negro con manchas blancas...",
    label: "Color",
    validation: petCreationValidationSchema.color,
  },
  {
    name: "observation",
    type: "text",
    label: "Observaciones",
    placeholder: "Muerde mucho...",
    validation: petCreationValidationSchema.observaciones,
  },
  {
    name: "weightCurrent",
    type: "number",
    label: "Peso Actual",
    placeholder: "0kg",
    validation: petCreationValidationSchema.pesoActual,
  },
];
export const InputsRegisterAppoint: InputField[] = [
  {
    name: "date",
    type: "date", //TODO: despues debera ser select
    label: "Fecha",
    validation: appointmentValidationSchema.date,
  },
  {
    name: "time",
    type: "time", //TODO: despues debera ser select
    label: "Hora",
    validation: appointmentValidationSchema.time,
  },
  {
    name: "serviceId",
    type: "select",
    label: "Servicio",
    validation: appointmentValidationSchema.service,
    options: [],
  },
  {
    name: "messageUser",
    type: "text",
    label: "Observación",
    placeholder: "Mi mascota tiene los siguientes problemas...",
    validation: appointmentValidationSchema.messageUser,
  },
  {
    name: "price",
    type: "number",
    label: "Precio",
    disable: true,
  },
];
export const InputsModifyAppoint = [];
