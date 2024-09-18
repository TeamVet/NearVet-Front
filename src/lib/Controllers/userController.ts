import { FormRegisterValues } from "@/types/interfaces";
import { ErrorNotify, PromessNotify } from "../toastyfy";
import {
  BillEndService,
  modifyUserService,
  NewVetService,
} from "../Services/userService";

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

export const BillEndController = async (billId: string) => {
  try {
    const responseEnd = await PromessNotify(
      "Cerrando factura...",
      "Finalizacion exitosa",
      BillEndService(billId)
    );
    return responseEnd;
  } catch (error: any) {
    ErrorNotify(`Error al finalizar la factura: ${error.message}`);
  }
};

export const newVet = async (values: FormRegisterValues) => {
  values = {
    ...values,
    dni: Number(values.dni),
    licence: Number(values.licence),
    startDate: new Date(),
  };
  try {
    const responseVet = await PromessNotify(
      "Registrando nuevo veterinario...",
      "Registrado con exito",
      NewVetService(values)
    );
    return responseVet;
  } catch (error: any) {
    ErrorNotify(`Error al registrar al veterinario: ${error.message}`);
  }
};
