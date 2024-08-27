import jwt from "jsonwebtoken";

const secretKey = "clavesecreta01";

const verifyToken = (token: string) => {
  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secretKey);

    return decoded; // Retorna los datos del token
  } catch (error: any) {
    console.error("Error: ", error.message);
    return null; // Retorna null si el token es inválido
  }
};

export default verifyToken;
