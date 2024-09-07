"use client";
import ButtonCustom from "@/components/ButtonCustom";
import Loading from "@/components/Loading";
import { Modal } from "@/components/Modal";
import Dashboard from "@/components/sectionsModules/dashboardCustom";
import SectionContent from "@/components/sectionsModules/sectionContent";
import { useUser } from "@/context/UserContext";
import { calculateAge } from "@/helpers/calcularEdad";
import { userPetsCards } from "@/helpers/dashBoardCards";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { fetchPetIdController } from "@/lib/authController";
import { Mascota } from "@/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PetInfo from "./petInfo";
import PetSection from "./petSection";
import Screen from "@/components/Screen";
import PetClinical from "./PetClinical";

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const { loading, startLoading, stopLoading } = useLoading();

  const { user, session } = useUser();
  const idUrl = useParams();
  const router = useRouter();
  const idPet = idUrl.idPet;

  const PetMock: Mascota = {
    id: "1",
    name: "Firulais",
    birthdate: "2022-01-01",
    startDate: new Date(),
    color: "Blanco",
    weightCurrent: "10",
    observation: "Sin observaciones",
    userId: "1",
    specie: {
      id: "1",
      specie: "Perro",
    },
    race: {
      id: "1",
      race: "Pastor Aleman",
    },
    sex: {
      id: "1",
      sex: "Macho",
    },
    repConditionId: "1",
    imgProfile: "https://i.ibb.co/0y8HbD0/IMG-20220207-131510.jpg",

    vacunas: [
      {
        id: 1,
        title: "Vacuna Polio",
        nombre: "Covid",
        description: "Para acabar la polio",
        extraInfo: "Próxima dosis: 2022-02-01",
        aplicada: "2022-01-01",
        proxima: "2022-02-01",
      },
      {
        id: 1,
        title: "Vacuna Polio",
        nombre: "Rabia",
        description: "Para acabar la polio",
        extraInfo: "Próxima dosis: 2022-02-01",
        aplicada: "2022-01-01",
        proxima: "2022-02-01",
      },
      {
        id: 1,
        title: "Vacuna Polio",
        nombre: "Polio",
        description: "Para acabar la polio",
        extraInfo: "Próxima dosis: 2022-02-01",
        aplicada: "2022-01-01",
        proxima: "2022-02-01",
      },
      {
        id: 1,
        title: "Vacuna Polio",
        nombre: "Gripe",
        description: "Para acabar la polio",
        extraInfo: "Próxima dosis: 2022-02-01",
        aplicada: "2022-01-01",
        proxima: "2022-02-01",
      },
    ],
    tratamientos: [
      {
        pktratamiento: 1,
        DescripcionTrat: "Metodo para elimiar la parvovirus",
        title: "desparacitacion",
        desciption: "Metodo para elimiar la parvovirus",
        ObservacionTrat: "Sin observaciones",
        frecuencia: "Normal",
      },
    ],
    medicamentos: [
      {
        pkprescripcion: 1,
        title: "Desparacitación",
        nombre: "Collar desparacitante",
        description: "Metodo para elimiar la parvovirus",
        extraInfo: "Frecuencia: 1 vez por semana",
        droga: "parvorius",
        aplicacion: "1 sola vez",
      },
    ],
  };

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

        if (data.birthdate != null) {
          const dataAndAge = { ...data, age: calculateAge(data.birthdate) };
          setMascota(dataAndAge);
        } else setMascota(data);
      } finally {
        stopLoading();
      }
    };

    if (user?.token) {
      fetchMascota();
    }
  }, [session]);

  return (
    <>
      {loading && <Loading />}
      {mascota && idUrl.idPet && (
        <div className=" flex flex-col md:flex-row md:justify-evenly gap-1 my-2 md:m-auto">
          <div className="md:w-1/4">
            <PetInfo {...mascota} idPet />
          </div>
          <div className="md:w-2/4">
            <PetSection
              {...PetMock}
              // {...mascota} aca iria asi si no usaramos el mock
            />
          </div>
          <div className="md:w-1/4">
            <PetClinical />
          </div>
        </div>
      )}
    </>
  );
};

export default PetIndividual;
