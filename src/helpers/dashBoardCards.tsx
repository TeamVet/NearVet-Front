import {
  EmployeeIcon,
  InformationIcon,
  MedicalIcon,
  PawIcon,
  StoreIcon,
  TicketIcon,
} from "@/lib/icons";
import { UserCard } from "@/types/interfaces";

export const userCards: UserCard[] = [
  {
    text: "Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Mascotas",
    icon: <PawIcon size="2xl" />,
  },
  {
    text: "Turnos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Facturas",
    icon: <TicketIcon size="2xl" />,
  },
  // {
  //   text: "Veterinaria Favorita",
  //   icon: <StoreIcon size="2xl" />,
  // }
];

export const userPetsCards: UserCard[] = [
  {
    text: "Vacunas",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Desparasitaciones",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Enfermedades",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Medicamentos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Visitas",
    icon: <MedicalIcon size="2xl" />,
  },
];
export const adminCards: UserCard[] = [
  {
    text: "Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Veterinaria",
    icon: <StoreIcon size="2xl" />,
  },
  {
    text: "Turnos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Facturas",
    icon: <TicketIcon size="2xl" />,
  },
  {
    text: "Empleados",
    icon: <EmployeeIcon size="2xl" />,
  },
];

export const vetCards: UserCard[] = [
  {
    text: "Información",
    icon: <InformationIcon size="2xl" />,
  },
  {
    text: "Proximos Turnos",
    icon: <MedicalIcon size="2xl" />,
  },
  {
    text: "Historial de turnos",
    icon: <MedicalIcon size="2xl" />,
  },
];
