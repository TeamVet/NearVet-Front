import {
  appointmentValidationSchema,
  loginValidationSchema,
  petCreationValidationSchema,
  registrationValidationSchema,
} from "./FormValidation";
import { InputField, Mascota } from "@/types/interfaces";

export const InputsRegisterUser: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Juan...",
    label: "Nombre",
    validation: registrationValidationSchema.nombre,
  },
  {
    name: "lastName",
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
    name: "lastName",
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
    labelKey: "specie",
  },
  {
    name: "raceId",
    type: "select",
    label: "Raza",
    validation: petCreationValidationSchema.raza,
    options: [],
    labelKey: "race",
  },
  {
    name: "sexId",
    type: "select",
    label: "Sexo",
    validation: petCreationValidationSchema.sexo,
    options: [],
    labelKey: "sex",
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
    name: "pet_id",
    type: "select",
    label: "Mascota",
    validation: appointmentValidationSchema.pet,
    options: [],
    labelKey: "name",
  },
  {
    name: "category",
    type: "select",
    label: "Categoría",
    validation: appointmentValidationSchema.category,
    options: [],
    labelKey: "categoryService",
  },
  {
    name: "service_id",
    type: "select",
    label: "Servicio",
    validation: appointmentValidationSchema.service,
    options: [],
    labelKey: "service",
  },
  {
    name: "date",
    type: "date",
    label: "Fecha",
    validation: appointmentValidationSchema.date,
  },
  {
    name: "time",
    type: "select",
    label: "Horario",
    options: [],
    validation: appointmentValidationSchema.time,
    labelKey: "hour",
  },
  {
    name: "messageUser",
    type: "text",
    label: "Observación",
    placeholder: "Tiene sintomas de...",
    validation: appointmentValidationSchema.messageUser,
  },
];

export const InputsModifyAppoint = [];
export const InputsAppointsVetClinical = [
  {
    name: "FC",
    type: "text",
    label: "Frecuencia Cardiaca",
    placeholder: "",
  },
  {
    name: "FR",
    type: "text",
    label: "Frecuencia Respiratoria",
    placeholder: "",
  },
  {
    name: "temperature",
    type: "text",
    label: "Temperatura",
    placeholder: "",
  },
  {
    name: "hidratation",
    type: "number",
    label: "Hidratacion",
    placeholder: "",
  },
  {
    name: "TTLC",
    type: "text",
    label: "TTLC",
    placeholder: "",
  },
  {
    name: "mocous",
    type: "text",
    label: "Mocous",
    placeholder: "",
  },
  {
    name: "temperamento",
    type: "text",
    label: "Temperamento",
    placeholder: "",
  },
  {
    name: "diagnosis",
    type: "text",
    label: "Diagnostico",
    placeholder: "",
  },
  {
    name: "anamnesis",
    type: "textarea",
    label: "Anamnesis",
    placeholder: "",
  },
];
export const InputsAppointsVetTratamiento = [
  {
    name: "fkservicio",
    type: "select",
    label: "Nombre del tratamiento",
    placeholder: "",
    options: [],
    labelKey: "",
  },
  {
    name: "DescriptionTrat",
    type: "text",
    label: "Modo de aplicar",
    placeholder: "",
  },
  {
    name: "ObservacionTrat",
    type: "text",
    label: "Observaciones",
    placeholder: "",
  },
];
export const InputsAppointsVetPrescipciones = [
  {
    name: "fkproducto",
    type: "text",
    label: "Nombre de la droga",
    placeholder: "",
  },
  {
    name: "description",
    type: "text",
    label: "Modo de aplicación",
    placeholder: "",
  },
  {
    name: "observation",
    type: "text",
    label: "Observaciones",
    placeholder: "",
  },
  {
    name: "file",
    type: "file",
    label: "Receta",
    placeholder: "",
  },
];
export const InputsAppointsVetPendientes = [
  {
    name: "fkservice",
    type: "text",
    label: "Motivo del Pendiente",
    placeholder: "Aplicacion vacuna...",
  },
  {
    name: "description",
    type: "text",
    label: "Observaciones",
    placeholder: "Tener en cuenta que...",
  },
  {
    name: "endPending",
    type: "date",
    label: "Fecha Limite del Pendiente",
    placeholder: "",
  },
];
