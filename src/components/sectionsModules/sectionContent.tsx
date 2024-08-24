import React from 'react';
import { useUser } from '@/context/UserContext';
import { SectionContentProps, User } from '@/types/interfaces';
import { InformationModule } from './informationModule';
import AppointsModule from './appointsModule';
import PetsModule from './petsModule';


export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const { loginContext } = useUser();

  //simulacion de user
  const user: User = {
    name: "Jorge",
    lastname: "Perez",
    password: "123456",
    token: "123456789",
    role: "user",
    email: "jorge@jorge",
    phone: "123456789",
    address: "calle 123",
    city: "Posadas",
    dni: 123456789,
    veterinariafavorita: "veterinaria 1",
    mensajes: [
      {
        id: 2,
        state: "enviado",
        message: "hola",
        date: "2022-01-01",
        hour: "10:00"
      },
      {
        id: 2,
        state: "enviado",
        message: "hola",
        date: "2022-01-01",
        hour: "10:00"
      },
    ],
    mascotas: [
      {
        id: 1,
        name: "Lolu",
        especie: "perro",
        raza: "chihuahua",
        age: 2,
        image: "/mascota.png",
        birthdate: "2022-01-01",
        startDate: "2022-01-01",
        endDate: "2022-01-01",
        color: "blanco",
        sexo: "macho",
        stateSalud: "sano",
        usuario: "jorge@jorge",
      },
    ],
    turnos: [
      {
        id: 2,
        date: "2022-01-01",
        hour: "10:00",
        state: "realizado",
      },
      {
        id: 3,
        date: "2022-01-01",
        hour: "10:00",
        state: "pendiente",
      },
      {
        id: 4,
        date: "2022-01-01",
        hour: "10:00",
        state: "pendiente",
      },
    ]

  }


  switch (section) {
    case "sinUser":
      return (
        <p>No hay datos de usuario</p>
      )
    ///# Secciones User
    case "Información":
      return (
        <InformationModule user={user} modifyContext={loginContext} />
      );
    case "Mascotas":
      return (
        <PetsModule user={user} />
      );
    case "Turnos":
      return (
        <AppointsModule user={user} />
      );
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
      return (
        <>Vacunas</>
      );
    case "Desparasitaciones":
      return (
        <>Desparasitaciones</>
      );
    case "Enfermedades":
      return (
        <>Enfermedades</>
      );
    case "Medicamentos":
      return (
        <>Medicamentos</>
      );
    case "Visitas":
      return (
        <>Visitas</>
      );
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