import {
  FormValues,
  FormRegisterValues,
  FormNewPet,
} from "../types/interfaces";
import { fetcher, fetcherImg } from "./fetcher";

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

export const modifyUserService = async (
  values: FormRegisterValues,
  id: string,
  token: string
) => {
  const dataModify = {
    url: `/users/${id}`, //TODO despues pasarlo a .env
    method: "PUT" as const,
    data: values,
    token,
  };
  try {
    const responseModify = await fetcher(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchPetsService = async (userId: string, token: string) => {
  const dataPets = {
    url: `/pets/user/${userId}`, //TODO despues pasarlo a .env
    method: "GET" as const,
    token,
  };
  try {
    const responsePets = await fetcher(dataPets);
    if (!responsePets) throw new Error(responsePets.message);
    return responsePets;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const fetchPetIdService = async (idPet: string, token: string) => {
  const dataPet = {
    url: `/pets/${idPet}`, //TODO despues pasarlo a .env
    method: "GET" as const,
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

export const fetchAppointService = async (userId: string, token: string) => {
  const dataAppoint = {
    url: `/appointments/user${userId}`, //TODO despues pasarlo a .env
    method: "GET" as const,
    token,
  };
  try {
    const responseAppoint = await fetcher(dataAppoint);
    if (!responseAppoint.id) throw new Error(responseAppoint.message);
    return responseAppoint;
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

export const modifyPetService = async (
  values: FormNewPet,
  petId: string,
  token: string
) => {
  const dataModify = {
    url: `/pets/${petId}`, //TODO despues pasarlo a .env
    method: "PUT" as const,
    data: values,
    token,
  };
  try {
    const responseModify = await fetcher(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const modifyImgPetService = async (
  Id: string,
  token: string,
  File: any,
  type: "profile" | "pet"
) => {
  const dataModify = {
    url:
      type === "profile" ? `/users/imgProfile/${Id}` : `/pets/imgProfile/${Id}`,
    method: "PUT" as const,
    data: File,
    token,
  };
  try {
    const responseModify = await fetcherImg(dataModify);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
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

export const categoryServices = async () => {
  const response = await fetch(`${API_BASE_URL}/category-services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const serviceServices = async (category: string) => {
  const response = await fetch(
    `${API_BASE_URL}/services/category/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
