import {
  FormNewPet,
  FormRegisterValues,
  FormValues,
  User,
} from "@/types/interfaces";
import { addPet, login, register } from "./authService";
import { ErrorNotify, PromessNotify } from "./toastyfy";
import { signIn } from "next-auth/react";
import PATHROUTES from "@/helpers/path-routes";

export const PetController = async (
  values: FormNewPet,
  sesionId: string,
  token: string
) => {
  values = {
    ...values,
    userId: sesionId,
    startDate: new Date(),
    sexId: Number(values.sexId),
  };
  try {
    const response = await PromessNotify(
      "Registrando...",
      "Registrado exitosamente",
      addPet(values, sesionId)
    );
    if (response.id) {
      return response;
    } else throw new Error("Error al registrarte");
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
