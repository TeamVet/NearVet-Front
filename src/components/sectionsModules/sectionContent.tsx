import React from "react";
import { useUser } from "@/context/UserContext";
import { SectionContentProps, User } from "@/types/interfaces";

import AppointsModule from "./appointsModule";
import PetsModule from "./petsModule";
import Image from "next/image";
import ButtonCustom from "../ButtonCustom";
import UserInformation from "./UserInformation";

export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const { user } = useUser();

  switch (section) {
    case "sinUser":
      return <p>No hay datos de usuario</p>;
    ///# Secciones User
    case "Ver Información":
      return <UserInformation />;
    case "Ver Mascotas":
      return <PetsModule />;
    case "Ver Turnos":
      return <AppointsModule user={user} />;
    case "Ver Facturas":
      return (
        <div>
          <h3 className="text-xl">Facturas</h3>
          {/* Renderizar las facturas */}
        </div>
      );
    case "Ver Veterinaria Favorita":
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
