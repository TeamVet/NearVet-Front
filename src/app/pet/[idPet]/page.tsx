"use client"
import ButtonCustom from "@/components/ButtonCustom";
import Dashboard from "@/components/dashboardCustom";
import Screen from "@/components/Screen";
import SectionContent from "@/components/sectionsModules/sectionContent";
import { userPetsCards } from "@/helpers/dashBoardCards";
import { Mascota } from "@/types/interfaces";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

//aca renderimos el perfil de la mascota
const PetIndividual: React.FC = () => {
  const [masctoa, setMascota] = useState<Mascota>();
  const [section, setSection] = useState<string | null>(null);
  const idUrl = useParams();
  console.log(idUrl);
  useEffect(() => {
    //aca cargamos la mascota al estado llamando a la api
  })

  const handleSection = (typeSection: string) => {
    setSection(typeSection);
  }
  return (<Screen width="full">
    <div className="w-full flex flex-col md:flex-row justify-center gap-1">
      <div className=" md:w-1/4">
        <div className=" bg-red-200 rounded-lg m-2 shadow-lg">
          <Image src="" alt="Foto de la mascota" width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <h2>Nombre del perro</h2>
          <p>Tipo</p>
          <p>Raza</p>
          <p>Edad</p>
          <button>Editar</button>
          <button>Necesita atencion medica</button>
        </div>
      </div>
      <div className="bg-slate-300 md:w-2/4 flex flex-col ">
        <Dashboard cards={userPetsCards} renderSection={SectionContent} />

      </div>
      <div className="bg-slate-600 md:w-1/4">
        Historia Clinica
      </div>

    </div>
  </Screen>);
};

export default PetIndividual;