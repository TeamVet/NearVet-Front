//variables para el fetch despues tenemos que pasarlo a un .env
const apiUrl = "https://nearvet-latest.onrender.com";

// fetcher.ts
export const fetcher = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
) => {
  const response = await fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return await response.json();
};
