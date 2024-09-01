"use client";
import ButtonCustom from "@/components/ButtonCustom";
import Dashboard from "@/components/dashboardCustom";
import SectionContent from "@/components/sectionsModules/sectionContent";
import { useUser } from "@/context/UserContext";
import { calculateAge } from "@/helpers/calcularEdad";
import { userPetsCards } from "@/helpers/dashBoardCards";
import PATHROUTES from "@/helpers/path-routes";
import { ErrorNotify } from "@/lib/toastyfy";
import { Mascota } from "@/types/interfaces";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//aca renderimos el perfil de la mascota
const PetIndividual: React.FC = () => {
  const [mascota, setMascota] = useState<Mascota>();
  const { user, session } = useUser();
  const idUrl = useParams();
  const router = useRouter();

  useEffect(() => {
    if (idUrl.idPet === "undefined") {
      router.push(PATHROUTES.USER_DASHBOARD);
      return;
    }
    const fetchMascotas = async () => {
      const response = await fetch(
        `https://nearvet-latest.onrender.com/pets/${idUrl?.idPet}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (!response) {
        ErrorNotify("Error al obtener la mascota");
        return;
      }
      const data = await response.json();
      console.log(data);
      const dataAndAge = { ...data, age: calculateAge(data.birthdate) };
      setMascota(dataAndAge);
    };

    if (user?.token) {
      fetchMascotas();
    }
  }, [session]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-1 my-2 m-auto">
      {mascota ? (
        <>
          <div className=" md:w-1/4 shadow-lg">
            <div className="  m-2 ">
              <Image
                src={mascota?.imgProfile}
                alt="Foto de la mascota"
                width={150}
                height={150}
                className=" m-auto"
              />
            </div>
            <div className="flex flex-col text-justify p-2">
              <h2>Nombre: {mascota?.name}</h2>

              <p>Tipo: {mascota?.specie.specie}</p>
              <p>Raza: {mascota.race.race}</p>
              <p>Color: {mascota?.color}</p>
              <p>Sexo: {mascota?.sex.sex}</p>
              <p>Fecha de Nacimiento: {mascota.birthdate}</p>
              <p>Edad: {mascota.age} años </p>
              <ButtonCustom text="Editar" />
              <br />
              <ButtonCustom text="Necesita Atención medica" />
            </div>
          </div>
          <div className="bg-slate-300 md:w-2/4 flex flex-col ">
            <Dashboard cards={userPetsCards} renderSection={SectionContent} />
          </div>
          <div className="bg-slate-600 md:w-1/4">Historia Clinica</div>
        </>
      ) : (
        <>Cargando ...</>
      )}
    </div>
  );
};

export default PetIndividual;
