"use client";
import Loading from "@/components/Loading";
import { useUser } from "@/context/UserContext";
import { calculateAge } from "@/helpers/calcularEdad";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { fetchPetIdController } from "@/lib/authController";
import { Mascota } from "@/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PetInfo from "../../[idPet]/petInfo";
import PetSection from "../../[idPet]/petSection";
import PetClinical from "../../[idPet]/PetClinical";
import ModalForm from "@/components/modalForm";
import { consulta, ErrorNotify, InfoNotify } from "@/lib/toastyfy";

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const [turnoVet, setTurnoVet] = useState<"Iniciado" | "Finalizado" | null>(
    null
  );
  const { loading, startLoading, stopLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const idUrl = useParams();
  const router = useRouter();
  const idPet = idUrl.idPet;
  //!tendriamos que traer el ID del turno, y que dentro este la mascota...

  useEffect(() => {
    if (idUrl.idPet === "undefined") {
      router.push(PATHROUTES.USER_DASHBOARD);
      return;
    }
    startLoading();

    const fetchMascota = async () => {
      try {
        const data = await fetchPetIdController(
          idUrl.idPet as string,
          user?.token as string
        );
        if (data === undefined) {
          ErrorNotify("Mascota no encontrada");
          return;
        }
        if (data.birthdate != null) {
          const dataAndAge = { ...data, age: calculateAge(data.birthdate) };
          setMascota(dataAndAge);
        } else setMascota(data);
      } finally {
        stopLoading();
      }
    };
    const fetchTurnoIniciado = async () => {
      //TODO logica para iniciar el turno modificando en el back el estado a iniciado y setearlo en el estado
      setTurnoVet("Iniciado");
    };

    if (user?.token) {
      fetchMascota();
    }
    if (user?.role.role != "Veterinario") {
      fetchTurnoIniciado();
    }
  }, [user]);

  const handleCloseTurn = async () => {
    //TODO logica para cerrar el turno, modificar en el back a finalizado y setearlo en el estado
    consulta("Finalizará el turno, ¿Desea continuar?", () => {
      InfoNotify("Turno finalizado");
      setTurnoVet("Finalizado");
    });
  };

  return (
    <>
      {loading && <Loading />}
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {mascota && idUrl.idPet && (
        <div className=" flex flex-col md:flex-row md:justify-evenly gap-1 my-2 md:m-auto">
          <div className="md:w-1/4">
            <PetInfo {...mascota} idPet />
          </div>
          <div className="md:w-2/4">
            <PetSection Status={turnoVet} idPet={idPet as string} />
          </div>
          <div className="md:w-1/4">
            <PetClinical Status={turnoVet} idPet={idPet as string} />
          </div>
          {turnoVet === "Iniciado" && (
            <div className="fixed z-10 top-2 rigth-[50%] flex flex-row gap-2 shadow-md rounded-lg p-2">
              <button
                onClick={() => setIsOpen(true)}
                className=" bg-green-600 rounded p-2 text-white hover:scale-105"
              >
                Registrar turno
              </button>
              <button
                onClick={handleCloseTurn}
                className=" bg-red-500 rounded p-2 text-white hover:scale-105"
              >
                Cerrar turno
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PetIndividual;
