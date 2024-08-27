// authService.ts
import {
  FormValues,
  FormRegisterValues,
  FormNewPet,
} from "../types/interfaces";

const API_BASE_URL = "https://nearvet-latest.onrender.com";

export const login = async (userData: FormValues) => {
  const response = await fetch(`${API_BASE_URL}/authGlobal/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const register = async (values: FormRegisterValues) => {
  const response = await fetch(`${API_BASE_URL}/authGlobal/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response.json();
};

export const addPet = async (values: FormNewPet) => {
  const response = await fetch(`${API_BASE_URL}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response.json();
};
