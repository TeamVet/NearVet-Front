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

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const { loading, startLoading, stopLoading } = useLoading();

  const { user, session } = useUser();
  const idUrl = useParams();
  const router = useRouter();

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

      {mascota && (
        <div className="w-full flex flex-col md:flex-row justify-center gap-1 my-2 m-auto">
          <PetInfo {...mascota} idUrl={idUrl.idPet} />
          <div className="md:w-2/4 flex flex-col ">
            <PetSection {...mascota} />
          </div>
          <div className="bg-slate-600 md:w-1/4">Historia Clinica</div>
        </div>
      )}
    </>
  );
};

export default PetIndividual;
