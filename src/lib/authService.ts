import {
  FormValues,
  FormRegisterValues,
  FormNewPet,
  FormNewAppointment,
} from "../types/interfaces";
import { fetcher, fetcherImg } from "./fetcher";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
//inicio y registro
const SIGNIN_URL = process.env.NEXT_PUBLIC_SIGNIN_URL;
const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL;
const SIGN_GOOGLE = process.env.NEXT_PUBLIC_SIGN_GOOGLE;
//usuario
const MODIFI_USER = process.env.NEXT_PUBLIC_MODIFI_USER;
//mascota
const PETS_USER = process.env.NEXT_PUBLIC_PETS_USER;
const PETS = process.env.NEXT_PUBLIC_PETS;
//turnos
const APPOINTS = process.env.NEXT_PUBLIC_APPOINTS;
const APPOINTS_USER = process.env.NEXT_PUBLIC_APPOINTS_USER;
const APPOINTS_VETERINIAN = process.env.NEXT_PUBLIC_APPOINTS_VETERINIAN;
const APPOINTS_CANCEL = process.env.NEXT_PUBLIC_APPOINTS_CANCEL;
const APPOINTS_FINISH = process.env.NEXT_PUBLIC_APPOINTS_FINISH;
//mascotas
const SPECIES = process.env.NEXT_PUBLIC_SPECIES;
const RACES = process.env.NEXT_PUBLIC_RACES;

const APPOINT_CREATE = process.env.NEXT_PUBLIC_APPOINTS_CREATE;
const AVAILABILITY_SERVICE = process.env.NEXT_PUBLIC_AVAILABILITY_SERVICE;
const SERVICE_CATEGORY = process.env.NEXT_PUBLIC_SERVICE_CATEGORY;
const CATEGORY_SERVICE = process.env.NEXT_PUBLIC_CATEGORY_SERVICE;
const PET_SEX = process.env.NEXT_PUBLIC_PETS_SEX;

export const LoginService = async (userData: FormValues) => {
  const dataLogin = {
    url: SIGNIN_URL as string,
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
    url: SIGNUP_URL as string,
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
    url: SIGN_GOOGLE as string,
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
  values: Partial<FormRegisterValues>,
  id: string,
  token: string
) => {
  const dataModify = {
    url: `${MODIFI_USER}/${id}`,
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
    url: `${PETS_USER}/${userId}`,
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
    url: `${PETS}/${idPet}`,
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
    url: `${APPOINTS_USER}/${userId}`,
    method: "GET" as const,
    token,
  };
  try {
    const responseAppoint = await fetcher(dataAppoint);
    if (!responseAppoint) throw new Error(responseAppoint.message);
    return responseAppoint;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addPetService = async (values: FormNewPet, token: string) => {
  const dataPet = {
    url: PETS as string,
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
    url: `${PETS}/${petId}`,
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
      type === "profile"
        ? `${MODIFI_USER}/imgProfile/${Id}`
        : `${PETS}/imgProfile/${Id}`,
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

export const cancelAppointmentService = async (
  id: string,
  token: string,
  idTurno: string
) => {
  const dataCancel = {
    url: `${APPOINTS_CANCEL}/${idTurno}`,
    method: "PUT" as const,
    token,
  };
  const responseCancel = await fetcher(dataCancel);
  if (!responseCancel) throw new Error(responseCancel.message);
  return responseCancel;
};

export const Species = async () => {
  const response = await fetch(`${API_BASE_URL}${SPECIES}`, {
    method: "GET",
  });
  return response.json();
};
export const Races = async (especie: string) => {
  const response = await fetch(`${API_BASE_URL}${RACES}/${especie}`, {
    method: "GET",
  });
  return response.json();
};

export const SexType = async () => {
  const response = await fetch(`${API_BASE_URL}${PET_SEX}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const categoryServices = async () => {
  const response = await fetch(`${API_BASE_URL}${CATEGORY_SERVICE}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const serviceServices = async (category: string) => {
  const response = await fetch(
    `${API_BASE_URL}${SERVICE_CATEGORY}/${category}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const horariosService = async (serviceId: string) => {
  const response = await fetch(`${API_BASE_URL}${AVAILABILITY_SERVICE}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const addAppointmentService = async (values: FormNewAppointment) => {
  const dataAppoint = {
    url: APPOINT_CREATE as string,
    method: "POST" as const,
    data: values,
  };
  try {
    const responseModify = await fetcher(dataAppoint);
    if (!responseModify.id) throw new Error(responseModify.message);
    return responseModify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchTurnosService = async (id: string, date: Date) => {
  const data = {
    url: `${APPOINTS_VETERINIAN}`,
    method: "POST" as const,
    data: { id, date },
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};

export const fetchAppointIdService = async (id: string) => {
  const data = {
    url: `${APPOINTS}/${id}`,
    method: "GET" as const,
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};

export const fetchFinishAppoint = async (idAppoint: string) => {
  const data = {
    url: `${APPOINTS_FINISH}/${idAppoint}`,
    method: "PUT" as const,
  };
  const response = await fetcher(data);
  if (!response) throw new Error(response.message);
  return response;
};
