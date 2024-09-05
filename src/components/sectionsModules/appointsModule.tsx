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
  const turnoMock: Turnos = {
    id: "1",
    state: {
      id: "1",
      state: "Pendiente",
    },
    date: "2022-11-19",
    time: "10:00:00",
    messageUser: "Hola",
    price: "1000",
    pet: {
      id: "1",
      name: "Pepito",
      image: "https://placekitten.com/200/300",
      birthdate: "2022-11-19T00:00:00.000Z",
      startDate: new Date(),
      color: "Negro",
      specie: {
        id: "1",
        specie: "Perro",
      },
      race: {
        id: "1",
        race: "Caniche",
      },
      sex: {
        id: "1",
        sex: "Macho",
      },
      weightCurrent: "10",
      observation: "Observacion",
      userId: "1",
      imgProfile: "https://placekitten.com/200/300",
      repConditionId: "1",
    },
    service: {
      id: "1",
      service: "Corte de pelo",
      price: 1000,
      description: "Corte de pelo",
      duration: 60,
    },
  };
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        startLoading();
        const responseTurnos = await fetchAppointController(
          user?.id as string,
          user?.token as string
        );

        setTurnos([...turnos, turnoMock, responseTurnos]);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchTurnos();
    }
  }, [user]);

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

  //TODO -->cupones de descuento
  //TODO--> Pagar el turno
  //TODO -->cancela turno
  //--> calificar turno posturno
  //--> comunicarse x whatsapp

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
    <main className="flex flex-col mx-auto gap-4">
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
