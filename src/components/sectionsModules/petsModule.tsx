"use client" //! Verificar si puede ser serverComponent
import Link from "next/link";
import CardCustom from "../cardCustom";
import Image from "next/image";
import PATHROUTES from "@/helpers/path-routes";
import { Mascota, PetsModuleProps } from "@/types/interfaces";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";


const PetsModule: React.FC<PetsModuleProps> = ({ user }) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  useEffect(() => {
    user?.mascotas && setMascotas(user.mascotas);

  }, [])

  //vista de la mascota 
  // all data

  return (<div className='w-full m-5'>
    <h3 className="text-xl">Mascotas</h3>
    <div className='flex flex-col md:flex-row md:flex-wrap gap-5 m-5 justify-center'>
      {mascotas.map((mascota) => (
        <CardCustom key={mascota.id} isSelect={"not"} >
          <Link href={PATHROUTES.PET + `/${mascota.id}`}>
            <Image src={mascota.image} alt={`Imagen de ${mascota.name}`} width={100} height={100} />
            <h3 className='text-xl text-black dark:text-white mx-10'>
              Nombre: {mascota.name}
            </h3 >
            <p className='text-black dark:text-white'>Tipo: {mascota.especie}</p>
            <p className='text-black dark:text-white'>Raza: {mascota.raza}</p>
            <p className='text-black dark:text-white mb-2'>Edad: {mascota.age}</p>

            <ButtonCustom text="Editar" href={PATHROUTES.PET + `/${mascota.id}`} />
          </Link>
        </CardCustom>
      ))}
    </div>
    <ButtonCustom text="Añadir mascota" href={PATHROUTES.PET + "/newpet"} />
  </div>);
};

export default PetsModule;