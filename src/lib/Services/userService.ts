import { FormRegisterValues, FormValues } from "@/types/interfaces";
import { fetcher } from "../fetcher";

const SIGNIN_URL = process.env.NEXT_PUBLIC_SIGNIN_URL;
const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL;
const SIGN_GOOGLE = process.env.NEXT_PUBLIC_SIGN_GOOGLE;
const MODIFI_USER = process.env.NEXT_PUBLIC_MODIFI_USER;
const BILLS_USER = process.env.NEXT_PUBLIC_BILLS_USER;

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

export const BillsService = async (
  page: number,
  id: string,
  startDay: string,
  endDay: string
) => {
  const dataBills = {
    url: `${BILLS_USER}${page}&limit=10&userId=${id}&start=${startDay}&end=${endDay}`,
    method: "GET" as const,
  };
  try {
    const responseBills = await fetcher(dataBills);
    if (!responseBills) throw new Error(responseBills.message);
    return responseBills;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
