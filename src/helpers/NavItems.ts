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
interface NavItem {
  name: string;
  url: string;
  icon: (arg: any) => JSX.Element;
}
export const NavItem: Array<NavItem> = [
  {
    name: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Loguearse",
    url: "/sign",
    icon: LoginIcon,
  },
];

export const NavItemUser: Array<NavItem> = [
  {
    name: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Mascotas",
    url: "/pet",
    icon: PawIcon,
  },
  {
    name: "Usuario",
    url: "/userDashboard",
    icon: UserIcon,
  },
  {
    name: "Mensajes",
    url: "/message",
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
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Admin",
    url: "/adminDashboard",
    icon: StoreIcon,
  },
  {
    name: "Veterinario",
    url: "/vetDashboard",
    icon: ClipboardIcon,
  },
  {
    name: "Mensajes",
    url: "/message",
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
    url: "/",
    icon: HomeIcon,
  },
  {
    name: "Veterinario",
    url: "/vetDashboard",
    icon: ClipboardIcon,
  },
  {
    name: "Mensajes",
    url: "/message",
    icon: MailIcon,
  },
  {
    name: "Salir",
    url: "",
    icon: LogOutIcon,
  },
];
