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
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const { loading, startLoading, stopLoading } = useLoading();
  const [modal, setModal] = useState<boolean>(false);
  const { user, session } = useUser();
  const idUrl = useParams();
  const router = useRouter();

  useEffect(() => {
    if (idUrl.idPet === "undefined") {
      router.push(PATHROUTES.USER_DASHBOARD);
      return;
    }

    const fetchMascotas = async () => {
      try {
        const data = await fetchPetIdController(
          idUrl.idPet as string,
          user?.token as string
        );
        const dataAndAge = { ...data, age: calculateAge(data.birthdate) };
        setMascota(dataAndAge);
      } finally {
        stopLoading();
      }
    };

    if (user?.token) {
      startLoading;
      fetchMascotas();
    }
  }, [session]);

  return (
    <>
      {loading && <Loading></Loading>}
      <Modal
        isOpen={modal}
        id={idUrl.idPet as string}
        onClose={() => setModal(false)}
      />
      {mascota && (
        <div className="w-full flex flex-col md:flex-row justify-center gap-1 my-2 m-auto">
          <div className=" md:w-1/4 shadow-lg">
            <div className="flex flex-row m-2 relative border border-solid ">
              <Image
                src={mascota?.imgProfile}
                alt="Foto de la mascota"
                width={150}
                height={150}
                className=" m-auto"
              />
              <button
                className="absolute top-0 right-0"
                onClick={() => setModal(true)}
              >
                pencil
              </button>
            </div>
            <div className="flex flex-col text-justify p-2">
              <h2>Nombre: {mascota?.name}</h2>

              <p>Tipo: {mascota?.specie.specie}</p>
              <p>Raza: {mascota.race.race}</p>
              <p>Color: {mascota?.color}</p>
              <p>Sexo: {mascota?.sex.sex}</p>
              <p>Fecha de Nacimiento: {mascota.birthdate}</p>
              <p>Edad: {mascota.age} años </p>
              <ButtonCustom
                text="Editar"
                href={PATHROUTES.PET + `/modifyPet/${mascota.id}`}
              />
              <br />
              <ButtonCustom text="Necesita Atención medica" />
            </div>
          </div>
          <div className="bg-slate-300 md:w-2/4 flex flex-col ">
            <Dashboard cards={userPetsCards} renderSection={SectionContent} />
          </div>
          <div className="bg-slate-600 md:w-1/4">Historia Clinica</div>
        </div>
      )}
    </>
  );
};

export default PetIndividual;
