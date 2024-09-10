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
import Screen from "../Screen";
import AppointCard from "../AppointCard";
import { useRouter } from "next/navigation";

const AppointsModule: React.FC = () => {
  const [turnos, setTurnos] = useState<Turnos[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [turnosFinalizados, setTurnoFinalizados] = useState<Turnos[]>([]);
  const [turnosPendientes, setTurnoPendientes] = useState<Turnos[]>([]);
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        const responseTurnos = await fetchAppointController(
          user?.id as string,
          user?.token as string
        );

        setTurnos(responseTurnos);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchTurnos();
    }
  }, [user]);

  useEffect(() => {
    if (turnos && turnos.length > 0) {
      const finalizados = turnos.filter(
        (turno) =>
          turno.state.state === "Finalizado" ||
          turno.state.state === "Cancelado"
      );
      const pendientes = turnos.filter(
        (turno) =>
          turno.state.state !== "Finalizado" &&
          turno.state.state !== "Cancelado"
      );

      setTurnoFinalizados(finalizados);
      setTurnoPendientes(pendientes);
    }
  }, [turnos]);

  //TODO -->cupones de descuento
  //TODO--> Pagar el turno

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
      window.location.reload();
    }
  };

  return (
    <Screen>
      {loading && <Loading />}
      {!turnos && (
        <h3 className="text-2xl font-semibold dark:text-darkHline">Turnos</h3>
      )}
      <section className="my-5 m-auto flex flex-col ">
        {turnos && turnos.length > 0 ? (
          <>
            {turnosPendientes.length > 0 ? (
              <section className="flex flex-col  m-auto">
                <h3 className="text-2xl font-semibold italic mb-2 dark:text-darkHline">
                  Turnos Activos
                </h3>
                <div className="flex flex-row flex-wrap justify-items-center gap-2">
                  {turnosPendientes.length > 0 &&
                    turnosPendientes.map((turno) => (
                      <AppointCard
                        data={turno}
                        handleCancel={handleCancel}
                        key={turno.id}
                        isCancelable
                      />
                    ))}
                </div>
              </section>
            ) : null}

            {turnosPendientes.length > 0 && turnosFinalizados.length > 0 ? (
              <hr className="border-2 my-10 mx-auto border-gray-400 w-2/3" />
            ) : null}

            {turnosFinalizados.length > 0 ? (
              <section className="flex flex-col  m-auto">
                <h3 className="text-2xl font-semibold italic mb-2 dark:text-darkHline">
                  Turnos Finalizados
                </h3>
                <div className="flex flex-row flex-wrap justify-items-center gap-2">
                  {turnosFinalizados.length > 0 &&
                    turnosFinalizados.map((turno) => (
                      <AppointCard
                        data={turno}
                        handleCancel={handleCancel}
                        key={turno.id}
                      />
                    ))}
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <>
            <p>No hay turnos agendados</p>
          </>
        )}
      </section>
      <ButtonCustom text="Agendar Turno" href={PATHROUTES.NEWAPPOINTMEN} />
    </Screen>
  );
};

export default AppointsModule;
