import React from "react";
import { SectionContentProps, User } from "@/types/interfaces";
import AppointsModule from "./appointsModule";
import PetsModule from "./petsModule";
import UserInformation from "./UserInformation";
import { ErrorNotify } from "@/lib/toastyfy";
import BillModule from "./BillModule";

export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  switch (section) {
    case "sinUser":
      return <p>No hay datos de usuario</p>;
    ///# Secciones User
    case "Ver Información":
      return <UserInformation />;
    case "Ver Mascotas":
      return <PetsModule />;
    case "Ver Turnos":
      return <AppointsModule />;
    case "Ver Facturas":
      return <BillModule />;
    case "Ver Veterinaria Favorita":
      return (
        <div>
          <h3 className="text-xl">Veterinaria Favorita</h3>
          <p>No tienes una veterinaria favorita</p>
          <button onClick={() => ErrorNotify("Funcionalidad no disponible")}>
            Cambiar
          </button>
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
    default:
      return null;
  }
};

export default SectionContent;
