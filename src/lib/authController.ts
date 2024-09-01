import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  User,
} from "@/types/interfaces";
import { addPet, login, register, registerGoogle } from "./authService";
import { ErrorNotify, PromessNotify } from "./toastyfy";

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
      addPet(values, token)
    );
    if (!response) throw new Error("Error al registrar la mascota");
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};

export const LoginController = async (values: FormValues) => {
  try {
    const response = await PromessNotify(
      "Iniciando sesión...",
      "Iniciaste sesión exitosamente",
      login(values)
    );
    if (!response.id) throw new Error(response.message);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};

export const RegisterController = async (values: FormRegisterValues) => {
  try {
    const response = await PromessNotify(
      "Registrandote...",
      "Registrado exitosamente",
      register(values)
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
    const response = await registerGoogle(values);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al registrarte: ${error.message}`);
  }
};
