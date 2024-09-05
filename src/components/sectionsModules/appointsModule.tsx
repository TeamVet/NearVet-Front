"use client";
import { Turnos } from "@/types/interfaces";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";
import {
  cancelAppointController,
  fetchAppointController,
} from "@/lib/authController";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { useUser } from "@/context/UserContext";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import TableCustom from "../TableCustom";

const AppointsModule: React.FC = () => {
  const [turnos, setTurnos] = useState<Turnos[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [turnosFinalizados, setTurnoFinalizados] = useState<Turnos[]>([]);
  const [turnosPendientes, setTurnoPendientes] = useState<Turnos[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        const responseTurnos = await fetchAppointController(
          user?.id as string,
          user?.token as string
        );

        setTurnos([...turnos, responseTurnos]);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchTurnos();
    }
  }, []);

  useEffect(() => {
    if (turnos) {
      turnos.map((turno) => {
        if (
          turno.state.state === "Finalizado" ||
          turno.state.state === "Cancelado"
        ) {
          setTurnoFinalizados([turno]);
        } else {
          setTurnoPendientes([turno]);
        }
      });
    }
  }, [turnos]);

  // nuevo turno
  // -->cupones de descuento
  //--> Pagar el turno
  // Renderizar los turnos en pasados y nuevos
  // -->cancela turno
  //--> calificar turno posturno
  //--> comunicarse x whatsapp
  //TODO pagina para renderizar turnos activos

  const handleCancel = async (idTurno: string) => {
    try {
      startLoading();
      const responseCancel = await cancelAppointController(
        user?.id as string,
        user?.token as string,
        idTurno
      );
      return responseCancel;
    } finally {
      stopLoading();
    }
  };

  return (
    <main className="flex flex-col m-auto gap-4 justify-center">
      {loading && <Loading />}
      <h3 className="text-2xl font-semibold dark:text-darkHline">Turnos</h3>

      {turnos && turnos.length > 0 ? (
        <section className="m-auto">
          {turnosPendientes.length > 0 && (
            <TableCustom
              title="Turnos Activos"
              titulos={["Fecha", "Hora", "Estado", "Acciones"]}
              datos={turnosPendientes}
              isCancelable
              onClick={handleCancel}
            />
          )}
          {turnosFinalizados.length > 0 && (
            <TableCustom
              title="Turnos Finalizados"
              titulos={["Fecha", "Hora", "Estado", "Acciones"]}
              datos={turnosFinalizados}
            />
          )}
        </section>
      ) : (
        <>
          <p>No hay turnos agendados</p>
        </>
      )}
      <ButtonCustom text="Agendar Turno" href={PATHROUTES.NEWAPPOINTMEN} />
    </main>
  );
};

export default AppointsModule;
