"use client";
import { useEffect, useState } from "react";

import { fetcher } from "@/lib/fetcher";
import { Turnos } from "@/types/interfaces";
import useLoading from "@/hooks/LoadingHook";

const POLLING_INTERVAL = 5000; // 5000ms = 5 segundos

const Page = () => {
  const [turnoLlamado, setTurnoLlamado] = useState<Turnos | null>(null);
  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let turno = localStorage.getItem("turno");
      fetchTurno(turno);

      setInterval(() => {
        turno = localStorage.getItem("turno");
        fetchTurno(turno);
      }, POLLING_INTERVAL);
    }
  }, []);

  const fetchTurno = async (turno: any) => {
    if (turno === null) return;

    if (turno === "null") {
      startLoading();
      return;
    }
    stopLoading();

    if (turno) {
      const dataFetch = {
        url: `/appointments/${turno}`,
        method: "GET" as const,
      };
      const response = await fetcher(dataFetch);
      if (response.id) {
        setTurnoLlamado(response);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 fixed z-50 bg-white top-0 w-full h-full items-center justify-center">
      {turnoLlamado && turnoLlamado !== null && !loading ? (
        <div className="shadow-lg p-5 flex flex-col gap-2 min-w-1/2 animate-bounce duration-200 bg-orange-300">
          <h3 className="text-2xl text-center">Turno Llamado:</h3>
          <p className="text-xl text-detail text-center">
            Mascota: {turnoLlamado.pet.name}
          </p>
          <div className="flex flex-row justify-around align-top items-start border border-white rounded-lg p-2">
            <div className="flex flex-col gap-1 text-center border-r p-2 ">
              <strong>Servicio:</strong>
              <p>{turnoLlamado.service.service}</p>
            </div>
            <div className="flex flex-col gap-1 text-center border-r p-2">
              <strong>Horario:</strong>
              <p>{turnoLlamado.time}</p>
            </div>
            <div className="flex flex-col gap-1 text-center border-r p-2">
              <strong>Consultorio:</strong>
              <p className="text-detail text-xl text-center"> 1</p>
            </div>

            <div className="flex flex-col gap-1 text-center  p-2">
              <strong>Demora aproximada para proximo turno: </strong>
              <p>{turnoLlamado.service.durationMin}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-detail text-3xl">
          Esperando turno... Gracias por aguardar y confiar en NearVet
        </p>
      )}
    </div>
  );
};

export default Page;
