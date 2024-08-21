import { User } from "@/types/interfaces";
import { useUser } from "@/context/UserContext";

//variables para el fetch despues tenemos que pasarlo a un .env
const apiUrl = "https://nearvet-latest.onrender.com/api";
const url_login = `/authGlobal/signin`;
const url_register = `/authGlobal/signup`;

export const fetcher = (url: string, metod: string, data: User) =>
  fetch(`${apiUrl}${url}`, {
    method: metod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const fetcherLogin = async (url_login: string, data: User) => {
  try {
    const response = await fetcher(url_login, "POST", data);
    return response;
  } catch (error: any) {
    alert(error.message);
  }
};

export const fetcherRegister = async (url_register: string, data: User) => {
  try {
    const response = await fetcher(url_register, "POST", data);
    if (!response) throw new Error("Error");
    if (response.token) {
      //TODO : notificamos al usuario e intentamos loguearlo
      //intenemamos loguear al usuario
      const { loginContext } = useUser();
      const data = loginContext(response);
      return data;
    } else {
      //TODO : notificamos al usuario del error o lanzamos error
      return;
    }
  } catch (error: any) {
    alert(error.message);
  }
};
