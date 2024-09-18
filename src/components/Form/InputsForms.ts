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
    name: "observation",
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
    name: "petId",
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
    name: "serviceId",
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
  },
];

export const InputsModifyAppoint = [];
export const InputsAppointsVetClinical = [
  {
    name: "fc",
    type: "number",
    label: "Frecuencia Cardiaca",
    placeholder: "",
  },
  {
    name: "fr",
    type: "number",
    label: "Frecuencia Respiratoria",
    placeholder: "",
  },
  {
    name: "temperature",
    type: "number",
    label: "Temperatura",
    placeholder: "",
  },
  {
    name: "hydration",
    type: "number",
    label: "Hidratacion",
    placeholder: "",
  },
  {
    name: "tllc",
    type: "number",
    label: "TTLC",
    placeholder: "",
  },
  {
    name: "mucous",
    type: "text",
    label: "Estado Mucosas",
    placeholder: "max 30",
  },
  {
    name: "temper",
    type: "text",
    label: "Temperamento",
    placeholder: "max 50",
  },
  {
    name: "moodState",
    type: "text",
    label: "Estado de animo",
    placeholder: "max 50",
  },
  {
    name: "diagnosis",
    type: "text",
    label: "Diagnostico",
    placeholder: "max 150",
  },
  {
    name: "anamnesis",
    type: "text",
    label: "Anamnesis",
    placeholder: "",
  },
];
export const InputsAppointsVetTratamiento = [
  {
    name: "serviceId",
    type: "select",
    label: "Nombre del servicio",
    placeholder: "",
    options: [],
    labelKey: "service",
  },
  {
    name: "description",
    type: "text",
    label: "Descripción",
    placeholder: "",
  },
  {
    name: "observation",
    type: "text",
    label: "Observaciones",
    placeholder: "",
  },
  {
    name: "productId",
    type: "select",
    label: "Droga a administrar",
    placeholder: "",
    options: [],
    labelKey: "name",
    //TODO seleccion multiple y con filtro
  },
];
export const InputsAppointsVetPrescipciones = [
  {
    name: "productId",
    type: "select",
    label: "Nombre del Medicamento",
    placeholder: "",
    options: [],
    labelKey: "name",
  },
  {
    name: "description",
    type: "textarea",
    label: "Modo de aplicación",
    placeholder: "",
  },
];
export const InputsAppointsVetPendientes = [
  {
    name: "serviceId",
    type: "select",
    label: "Nombre del servicio",
    placeholder: "",
    options: [],
    labelKey: "service",
  },
  {
    name: "description",
    type: "text",
    label: "Observaciones",
    placeholder: "Tener en cuenta que...",
  },
  {
    name: "date",
    type: "date",
    label: "Fecha Limite del Pendiente",
    placeholder: "",
  },
];
export const InputsFilesAppoints = [
  {
    name: "File",
    type: "file",
    label: "Cargar Archivo",
    placeholder: "Seleccionar archivo",
  },
];

export const InputsNewVet = [
  ...InputsRegisterUser,
  {
    name: "licence",
    type: "number",
    label: "Número de licencia de veterinario",
    placeholder: "1234",
  },
  {
    name: "specialty",
    type: "text",
    label: "Escpecialidad",
    placeholder: "Veterinario, Cirujano, etc",
  },
  {
    name: "description",
    type: "text",
    label: "Descripcion del Veterinario",
    placeholder: "Antiguedad de experiencia, posgrados, etc",
  },
];
