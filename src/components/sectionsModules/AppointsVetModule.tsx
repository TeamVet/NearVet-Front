import React, { useEffect, useState } from "react";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import { useUser } from "@/context/UserContext";
import { fetchTurnosService } from "@/lib/authService";
const today = new Date("2024-09-23");
const todayString = today.toISOString().split("T")[0];

const AppointsVetModule = () => {
  const [turnos, setTurnos] = useState<any[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!user?.id) return;
      const response = await fetchTurnosService(user.id, today);
      console.log(response);
      if (response.length > 0) setTurnos(response);
    };
    if (user?.id) {
      fetchTurnos();
    }
  }, []);
  return (
    <>
      <h3 className="text-xl text-detail">Atenciones del {todayString}</h3>

      <section className="flex flex-col md:flex-row flex-wrap m-auto w-full md:w-3/4 my-2 gap-2">
        {turnos.map((turno) => (
          <article
            key={turno.id}
            className="flex flex-col p-5 m-auto w-1/4 border border-gray-300 gap-2 items-center cursor-default rounded-lg"
          >
            <h4 className="text-detail">{turno.Subject}</h4>
            <hr className="border-2 border-gray-400 w-full" />
            <p>
              Horario: {turno.StartTime} -- {turno.EndTime}
            </p>
            <small>{turno.description}</small>

            {turno.status === "Pendiente" ? (
              <Link
                href={`${PATHROUTES.PET}/AppointVet/${turno.id}`}
                className="bg-detail p-1 m-auto rounded-lg text-white"
              >
                Iniciar turno
              </Link>
            ) : (
              <Link
                href={`${PATHROUTES.PET}/${turno.id}`}
                className="bg-transparent p-1 m-auto rounded-lg "
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
