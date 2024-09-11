import { FormRegisterValues } from "@/types/interfaces";
import { ErrorNotify, PromessNotify } from "../toastyfy";
import { modifyUserService } from "../Services/userService";

//userControllers
export const modyfyUserController = async (
  values: FormRegisterValues,
  userId: string,
  token: string
) => {
  try {
    const responseModify = await PromessNotify(
      "Modificando tus datos...",
      "Modificado exitosamente",
      modifyUserService(values, userId, token)
    );
    return responseModify;
  } catch (error: any) {
    ErrorNotify(`Error al modificar tus datos: ${error.message}`);
  }
};
