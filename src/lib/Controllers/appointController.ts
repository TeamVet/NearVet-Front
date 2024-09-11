import { FormNewAppointment } from "@/types/interfaces";
import {
  addAppointmentService,
  cancelAppointmentService,
  fetchAppointService,
  fetchTratmentPetService,
} from "../authService";
import { ErrorNotify, PromessNotify } from "../toastyfy";

//appointControllers
export const fetchAppointController = async (userId: string, token: string) => {
  try {
    const response = await fetchAppointService(userId, token);
    return response;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus turnos: ${error.message}`);
  }
};

export const newAppointmentController = async (values: FormNewAppointment) => {
  try {
    const responseAppoitn = await PromessNotify(
      "Registrando tu turno...",
      "Registrado exitosamente",
      addAppointmentService(values)
    );
    return responseAppoitn;
  } catch (error: any) {
    ErrorNotify(`Error al registrar tu turno: ${error.message}`);
  }
};

export const cancelAppointController = async (
  userId: string,
  token: string,
  idTurno: string
) => {
  try {
    const responseCancel = await PromessNotify(
      "Cancelando tu turno...",
      "Cancelado exitosamente",
      cancelAppointmentService(userId, token, idTurno)
    );
    return responseCancel;
  } catch (error: any) {
    ErrorNotify(`Error al cancelar tu turno: ${error.message}`);
  }
};

export const TratmentsController = async (idPet: string) => {
  try {
    const responseTratamiento = await fetchTratmentPetService(idPet);
    return responseTratamiento;
  } catch (error: any) {
    ErrorNotify(`Error al cargar tus tratamientos: ${error.message}`);
  }
};
