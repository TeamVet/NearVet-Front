import {
  FormValues,
  FormRegisterValues,
  FormNewPet,
} from "../types/interfaces";
import { fetcher } from "./fetcher";

const API_BASE_URL = "https://nearvet-latest.onrender.com";

export const LoginService = async (userData: FormValues) => {
  const dataLogin = {
    url: `/authGlobal/signin`, //TODO despues pasarlo a .env
    method: "POST" as const,
    data: userData,
  };
  try {
    const responseLogin = await fetcher(dataLogin);
    if (!responseLogin.id) throw new Error(responseLogin.message);
    return responseLogin;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerService = async (values: FormRegisterValues) => {
  const dataRegister = {
    url: `/authGlobal/signup`, //TODO despues pasarlo a .env
    method: "POST" as const,
    data: values,
  };
  try {
    const responseRegister = await fetcher(dataRegister);
    if (!responseRegister.id) throw new Error(responseRegister.message);
    return responseRegister;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerGoogleService = async (values: FormRegisterValues) => {
  const dataRegister = {
    url: `/authGlobal/signupGoogle`, //TODO despues pasarlo a .env
    method: "POST" as const,
    data: values,
  };
  try {
    const responseRegister = await fetcher(dataRegister);
    if (!responseRegister.id) throw new Error(responseRegister.message);
    return responseRegister;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addPetService = async (values: FormNewPet, token: string) => {
  const dataPet = {
    url: `/pets`, //TODO despues pasarlo a .env
    method: "POST" as const,
    data: values,
    token,
  };
  try {
    const responsePet = await fetcher(dataPet);
    if (!responsePet.id) throw new Error(responsePet.message);
    return responsePet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const Species = async () => {
  const response = await fetch(`${API_BASE_URL}/pets/species`, {
    method: "GET",
  });
  return response.json();
};
export const Races = async (especie: string) => {
  const response = await fetch(`${API_BASE_URL}/pets/races/${especie}`, {
    method: "GET",
  });
  return response.json();
};

export const SexType = async () => {
  const response = await fetch(`${API_BASE_URL}/pets/sex`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
