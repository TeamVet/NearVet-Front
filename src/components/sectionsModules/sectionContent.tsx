import React from "react";
import { useUser } from "@/context/UserContext";
import { SectionContentProps, User } from "@/types/interfaces";

import AppointsModule from "./appointsModule";
import PetsModule from "./petsModule";
import Image from "next/image";

export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const { user } = useUser();

  switch (section) {
    case "sinUser":
      return <p>No hay datos de usuario</p>;
    ///# Secciones User
    case "Información":
      return (
        // <InformationModule user={user} modifyContext={loginContext} />
        <>
          {/* <Image src={user!.imgProfile} alt="Logo" width={100} height={100} />
           */}
          <img
            src={user?.imgProfile}
            alt="Imagen del usuario"
            width={100}
            height={100}
          />
          {user?.imgProfile}
          Hola
        </>
      );
    case "Mascotas":
      return <PetsModule user={user} />;
    case "Turnos":
      return <AppointsModule user={user} />;
    case "Facturas":
      return (
        <div>
          <h3 className="text-xl">Facturas</h3>
          {/* Renderizar las facturas */}
        </div>
      );
    case "Veterinaria Favorita":
      return (
        <div>
          <h3 className="text-xl">Veterinaria Favorita</h3>
          <p>{user?.veterinariafavorita}</p>
          <button>change</button>
        </div>
      );
    ///# Secciones Pets
    case "Vacunas":
      return <>Vacunas</>;
    case "Desparasitaciones":
      return <>Desparasitaciones</>;
    case "Enfermedades":
      return <>Enfermedades</>;
    case "Medicamentos":
      return <>Medicamentos</>;
    case "Visitas":
      return <>Visitas</>;
    ///# Secciones Admin
    case "Cupones de descuento":
      return (
        <div>
          <h3 className="text-xl">Cupones de descuento</h3>
          {/* Renderizar los Cupones de descuento */}
        </div>
      );
    ///# Secciones Veterinario
    ///# Seccion default
    default:
      return null;
  }
};

export default SectionContent;
