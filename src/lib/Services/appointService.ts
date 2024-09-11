import { FormNewAppointment } from "@/types/interfaces";
import { fetcher } from "../fetcher";

const APPOINTS = process.env.NEXT_PUBLIC_APPOINTS;
const APPOINTS_USER = process.env.NEXT_PUBLIC_APPOINTS_USER;
const APPOINTS_VETERINIAN = process.env.NEXT_PUBLIC_APPOINTS_VETERINIAN;
const APPOINTS_CANCEL = process.env.NEXT_PUBLIC_APPOINTS_CANCEL;
const APPOINTS_FINISH = process.env.NEXT_PUBLIC_APPOINTS_FINISH;
const APPOINT_CREATE = process.env.NEXT_PUBLIC_APPOINTS_CREATE;
const AVAILABILITY_SERVICE = process.env.NEXT_PUBLIC_AVAILABILITY_SERVICE;
const SERVICE_CATEGORY = process.env.NEXT_PUBLIC_SERVICE_CATEGORY;
const CATEGORY_SERVICE = process.env.NEXT_PUBLIC_CATEGORY_SERVICE;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export const fetchTurnosService = async (
  id: string,
  startDate: Date,
  endDate: Date
) => {
  const data = {
    url: `${APPOINTS_VETERINIAN}`,
    method: "POST" as const,
    data: { id, startDate, endDate },
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
