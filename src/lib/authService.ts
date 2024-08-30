// authService.ts
import {
  FormValues,
  FormRegisterValues,
  FormNewPet,
} from "../types/interfaces";

const API_BASE_URL = "https://nearvet-latest.onrender.com";

export const login = async (userData: FormValues) => {
  try {
    const response = await fetch(`${API_BASE_URL}/authGlobal/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!data.token) throw new Error(data.message);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const register = async (values: FormRegisterValues) => {
  try {
    const response = await fetch(`${API_BASE_URL}/authGlobal/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!data.id) throw new Error(data.message);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addPet = async (values: FormNewPet, token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!data.id) throw new Error(data.message);
    return data;
  } catch (error: any) {}
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

export const LoginWithGoogle = async () => {};
export const RegisterWithGoogle = async (values: FormValues) => {
  try {
    const response = await fetch("https://nearvet-latest.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });
    const data = await response.json();
    if (!data) throw new Error(data.message);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
