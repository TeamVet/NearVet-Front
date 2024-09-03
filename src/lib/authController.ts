import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  User,
} from "@/types/interfaces";
import {
  addPetService,
  fetchAppointService,
  fetchPetIdService,
  fetchPetsService,
  LoginService,
  modifyPetService,
  modifyUserService,
  registerGoogleService,
  registerService,
} from "./authService";
import { ErrorNotify, PromessNotify } from "./toastyfy";

export const loginController = async (values: FormValues) => {
  try {
    const response = await PromessNotify(
      "Iniciando sesión...",
      "Iniciaste sesión exitosamente",
      LoginService(values)
    );
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al Iniciar sesión: ${error.message}`);
  }
};

export const registerUserController = async (values: FormRegisterValues) => {
  values = {
    ...values,
    startDate: new Date(),
  };
  try {
    const response = await PromessNotify(
      "Registrandote...",
      "Registrado exitosamente",
      registerService(values)
    );

    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};

export const registerWithGoogleController = async (
  values: FormRegisterValues
) => {
  try {
    const response = await PromessNotify(
      "Iniciando Sesión...",
      "Inicio exitosamente",
      registerGoogleService(values)
    );
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};

export const modyfyUserController = async (
  values: FormRegisterValues,
  userId: string,
  token: string
) => {
  try {
    const responseModify = await PromessNotify(
      "Modificando tus datos...",
      "Modificado exitosamente",
      modifyUserService(values, userId, token)
    );
    return responseModify;
  } catch (error: any) {
    ErrorNotify(`Error al modificar tus datos: ${error.message}`);
  }
};

export const fetchPetsController = async (userId: string, token: string) => {
  try {
    const response = await fetchPetsService(userId, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus mascotas: ${error.message}`);
  }
};
export const fetchPetIdController = async (idPet: string, token: string) => {
  try {
    const response = await fetchPetIdService(idPet, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus mascotas: ${error.message}`);
  }
};

export const fetchAppointController = async (userId: string, token: string) => {
  try {
    const response = await fetchAppointService(userId, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus turnos: ${error.message}`);
  }
};
export const petController = async (
  values: FormNewPet,
  userId: string,
  token: string
) => {
  values = {
    ...values,
    userId: userId,
    startDate: new Date(),
    weightCurrent: Number(values.weightCurrent),
  };
  try {
    const response = await PromessNotify(
      "Registrando tu mascota...",
      "Registrada exitosamente",
      addPetService(values, token)
    );

    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrar la mascota: ${error.message}`);
  }
};

export const modifyPetController = async (
  values: FormNewPet,
  petId: string,
  token: string
) => {
  values = {
    ...values,
    weightCurrent: Number(values.weightCurrent),
  };
  try {
    const responseModify = await PromessNotify(
      "Modificando tu mascota...",
      "Modificada exitosamente",
      modifyPetService(values, petId, token)
    );
  } catch (error: any) {
    ErrorNotify(`Error al modificar la mascota: ${error.message}`);
  }
};
