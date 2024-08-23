import { FormValues, User } from "@/types/interfaces";
import { useUser } from "@/context/UserContext";

//variables para el fetch despues tenemos que pasarlo a un .env
const apiUrl = "https://nearvet-latest.onrender.com";
const url_login = `/authGlobal/signin`;
const url_register = `/authGlobal/signup`;

export const fetcher = async (url: string, metod: string, data: FormValues) => {
  try {
    const responseFetch = await fetch(`${apiUrl}${url}`, {
      method: metod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await responseFetch.json();
    return responseData;
  } catch (error: any) {
    alert(error.message);
  }
};

export const fetcherLogin = async (url_login: string, data: FormValues) => {
  try {
    const response = await fetcher(url_login, "POST", data);
    return response;
  } catch (error: any) {
    alert(error.message);
  }
};

export const fetcherRegister = async (
  url_register: string,
  data: FormValues
) => {
  try {
    const response = await fetcher(url_register, "POST", data);
    if (!response) throw new Error(`"Error" al registrarse`);
    if (response.token) {
      //TODO : notificamos al usuario e intentamos loguearlo
      //intenemamos loguear al usuario
      const { loginContext } = useUser();
      const data = loginContext(response);
      alert(`"Registrado y logueado correctamente"`);
      return response;
    } else {
      //TODO : notificamos al usuario del error o lanzamos error

      return;
    }
  } catch (error: any) {
    alert(`"Error" al registrarse, ${error.message}`);
  }
};
