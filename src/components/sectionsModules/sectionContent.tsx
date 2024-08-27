import React from "react";
import { useUser } from "@/context/UserContext";
import { SectionContentProps, User } from "@/types/interfaces";

import AppointsModule from "./appointsModule";
import PetsModule from "./petsModule";
import Image from "next/image";
import ButtonCustom from "../ButtonCustom";

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
          <p>Información del usuario</p>
          {user && (
            <>
              <div className=" p-2 m-2">
                <img
                  src={user?.imgProfile}
                  alt="Foto de usuario"
                  width={100}
                  height={100}
                  className="rounded m-auto"
                />
                <p>Nombre: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Telefono: {user?.phone}</p>
              </div>
              <ButtonCustom text="Editar" />
            </>
          )}
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
