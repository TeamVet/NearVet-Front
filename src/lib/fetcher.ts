//variables para el fetch
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const url_login = `user/login`; //o el que fuera

export const fetcher = (url: string, metod: string, data: JSON) =>
  fetch(`${apiUrl}${url}`, {
    method: metod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const fetcherLogin = async (url_login: string, data: JSON) => {
  //TODO : cambiar JSON por la interface de UserLogin
  try {
    const response = await fetcher(url_login, "GET", data);
    if (!response) throw new Error("Error");
    if (response.token) {
      //!seteamos el context con los datos
      //TODO : notificamos al usuario
      return data;
    } else {
      //TODO : notificamos al usuario del error o lanzamos error
      return;
    }
  } catch (error: any) {
    //TODO : notificamos al usuario del error
  }
};
