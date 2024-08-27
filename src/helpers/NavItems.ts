import {
  PawIcon,
  HomeIcon,
  LoginIcon,
  UserIcon,
  LogOutIcon,
  ClipboardIcon,
  StoreIcon,
  MailIcon,
} from "@/lib/icons";
import PATHROUTES from "./path-routes";
import { NavItemProps } from "@/types/interfaces";

export const NavItem: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Iniciar Sesion",
    url: PATHROUTES.LOGIN,
    icon: LoginIcon,
  },
];

export const NavItemUser: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Mascotas",
    url: PATHROUTES.PET,
    icon: PawIcon,
  },
  {
    name: "Usuario",
    url: PATHROUTES.USER_DASHBOARD,
    icon: UserIcon,
  },
  {
    name: "Mensajes",
    url: "", //TODO Deberiamos abrir la modal de mensajes
    icon: MailIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];

export const NavItemAdmin: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Admin",
    url: PATHROUTES.ADMIN_DASHBOARD,
    icon: StoreIcon,
  },
  {
    name: "Veterinario",
    url: PATHROUTES.VET_DASHBOARD,
    icon: ClipboardIcon,
  },
  {
    name: "Mensajes",
    url: "",
    icon: MailIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];

export const NavItemVet: Array<NavItemProps> = [
  {
    name: "Inicio",
    url: PATHROUTES.HOME,
    icon: HomeIcon,
  },
  {
    name: "Veterinario",
    url: PATHROUTES.VET_DASHBOARD,
    icon: ClipboardIcon,
  },
  {
    name: "Mensajes",
    url: "",
    icon: MailIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];
