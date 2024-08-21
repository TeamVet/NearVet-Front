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
import PATHROUTES from "@/helpers/Pathroutes";
interface NavItem {
  name: string;
  url: string;
  icon: (arg: any) => JSX.Element;
}
export const NavItem: Array<NavItem> = [
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

export const NavItemUser: Array<NavItem> = [
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
    url: "",
    icon: MailIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];

export const NavItemAdmin: Array<NavItem> = [
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

export const NavItemVet: Array<NavItem> = [
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
