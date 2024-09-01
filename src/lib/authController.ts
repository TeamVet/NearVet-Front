import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  User,
} from "@/types/interfaces";
import {
  addPetService,
  LoginService,
  registerGoogleService,
  registerService,
} from "./authService";
import { ErrorNotify, PromessNotify } from "./toastyfy";

export const LoginController = async (values: FormValues) => {
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

export const RegisterController = async (values: FormRegisterValues) => {
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

export const RegisterWithGoogleController = async (
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
export const PetController = async (
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
      "Registrado exitosamente",
      addPetService(values, token)
    );
    if (!response) throw new Error(response.message);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrar la mascota: ${error.message}`);
  }
};
