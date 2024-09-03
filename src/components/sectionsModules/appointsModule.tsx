"use client";
import { AppointsProps, Turnos } from "@/types/interfaces";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";
import { fetchAppointController } from "@/lib/authController";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";

const AppointsModule: React.FC<AppointsProps> = ({ user }) => {
  const [turnos, setTurnos] = useState<Turnos[]>([]);
  const [turnosRealizados, setTurnoRealizado] = useState<Turnos[]>([]);
  const [turnosActivos, setTurnoActivos] = useState<Turnos[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        const turnos = await fetchAppointController(
          user?.id as string,
          user?.token as string
        );
        setTurnos(turnos);
      } finally {
        stopLoading();
      }
    };

    if (user) {
      fetchTurnos();
    }
  }, []);

  useEffect(() => {
    turnos?.map((turno) => {
      if (turno.state === "realizado") {
        setTurnoRealizado([...turnosRealizados, turno]);
      } else {
        setTurnoActivos([...turnosActivos, turno]);
      }
    });
  }, [turnos]);

  // nuevo turno
  // -->cupones de descuento
  //--> Pagar el turno
  // Renderizar los turnos en pasados y nuevos
  // -->cancela turno
  //--> calificar turno posturno
  //--> comunicarse x whatsapp
  //TODO pagina para renderizar turnos activos
  return (
    <div className="flex flex-col  gap-4 justify-center">
      {loading && <Loading />}
      <h3 className="text-2xl font-semibold dark:text-darkHline">Turnos</h3>

      {turnos && turnos.length > 0 ? (
        <>
          <th className="italic">Turnos Activos</th>
          <table className="text-center border m-5 cursor-default">
            <tr className="font-bold border">
              <td>Fecha</td>
              <td>Hora</td>
              <td>Estado</td>
              <td>Acciones</td>
            </tr>
            {turnosActivos.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.date}</td>
                <td>{turno.hour}</td>
                <td>{turno.state}</td>
                <td className="flex flex-col gap-2">
                  <button>Whatsapp</button>
                  <button>Cancelar</button>
                </td>
              </tr>
            ))}
          </table>

          <th className="italic">Turnos Finalizados</th>
          <table className="text-center border m-5 cursor-default">
            <tr className="font-bold border">
              <td>Fecha</td>
              <td>Hora</td>
              <td>Estado</td>
              <td>Acciones</td>
            </tr>
            {turnosRealizados.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.date}</td>
                <td>{turno.hour}</td>
                <td>{turno.state}</td>
                <td className="flex flex-col gap-2">
                  <button>Calificar Atención</button>
                </td>
              </tr>
            ))}
          </table>
        </>
      ) : (
        <>
          <p>No hay turnos agendados</p>
        </>
      )}
      <ButtonCustom text="Agendar Turno" href={PATHROUTES.NEWAPPOINTMEN} />
    </div>
  );
};

export default AppointsModule;
