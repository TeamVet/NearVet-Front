import React, { useEffect, useState } from "react";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import { useUser } from "@/context/UserContext";
import { fetchTurnosService } from "@/lib/Services/appointService";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
const today = new Date();
console.log(today);
const todayString = today.toISOString().split("T")[0];

const AppointsVetModule = () => {
  const [turnos, setTurnos] = useState<any[]>([]);
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const fetchTurnos = async () => {
      startLoading();
      if (!user?.id) return;
      try {
        const response = await fetchTurnosService(user.id, today, today);
        console.log(response);
        if (response.length > 0) {
          const turnosConFormato = response.map((turno: any) => ({
            ...turno,
            StartTime: formatTime(turno.StartTime),
            EndTime: formatTime(turno.EndTime),
          }));
          setTurnos(turnosConFormato);
        }
      } finally {
        stopLoading();
      }
    };
    if (user?.id) {
      fetchTurnos();
    }
  }, [user]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <>
      <h3 className="text-xl text-detail">Atenciones del {todayString}</h3>
      {loading && <Loading />}
      <section className="flex flex-col md:flex-row flex-wrap m-auto w-full md:w-3/4 my-2 gap-2">
        {turnos &&
          turnos.map((turno) => (
            <article
              key={turno.id}
              className="flex flex-col p-5 m-auto w-1/4 border border-gray-300 gap-2 items-center cursor-default rounded-lg"
            >
              <h4 className="text-detail">{turno.Subject}</h4>
              <hr className="border-2 border-gray-400 w-full" />
              <p>
                Horario: {turno.StartTime} - {turno.EndTime}
              </p>
              <small>{turno.description}</small>

              {turno.stateAppointment === "Pendiente" ? (
                <Link
                  href={`${PATHROUTES.PET}/AppointVet/${turno.id}`}
                  className="bg-detail p-2 m-auto rounded-lg text-white"
                >
                  Iniciar turno
                </Link>
              ) : (
                <Link
                  href={`${PATHROUTES.PET}/${turno.id}`}
                  className="bg-transparent p-2 m-auto rounded-lg "
                >
                  Revisar Mascota
                </Link>
              )}
            </article>
          ))}
      </section>
    </>
  );
};

export default AppointsVetModule;
