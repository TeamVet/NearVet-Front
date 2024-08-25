import * as Yup from "yup";

//# Interfaces de componentes
export interface ThemeIconProps {
  isDark: boolean;
}
export interface ButtonCustomProps {
  text: string;
}

export interface ButtonCustomOptionalProps extends ButtonCustomProps {
  href: string;
  size: string;
  color: string;
  bgcolor: string;
  type: "button" | "submit" | "reset";
  onClick: () => void;
}

export interface ScreenProps {
  children: React.ReactNode;
  width?: string;
}

export interface DashboardProps {
  cards: UserCard[];
  renderSection: (props: SectionContentProps) => React.ReactNode;
}
export interface CardCustomProps {
  children: React.ReactNode;
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isSelect?: string | null;
  size?: string;
}

export interface UserCard {
  text: string;
  icon?: React.ReactNode;
}

export interface SectionContentProps {
  section: string | null;
}

///# Interfaces de Iconos y NavBar

export interface IconProps {
  isMail?: boolean;
  size?: string;
}

export interface NavItemProps {
  name: string;
  url: string;
  icon: React.FC<Partial<IconProps>>;
}

///# Iterfaces de Modulos

export interface AppointsProps {
  user: User | null;
}

export interface PetsModuleProps {
  user: User | null;
}

///# Interfaces de context
export interface User {
  name: string;
  lastname: string;
  dni: number;
  email: string;
  password: string; //viene por token
  address: string;
  city: string;
  phone: string;
  token: string;
  role: string; //viene por token
  veterinariafavorita: string;
}

export interface Mascota {
  id: string;
  name: string;
  birthdate: string;
  startDate: string;
  endDate: string;
  color: string;
  sexo: string[];
  raza: string[];
  especie: string[];
  usuario: string;
  redCondition: string;
  ///a implementar
  age: number;
  image: string;
  stateSalud: string;
  historiaClinica: string;
  enfermedades: string[];
  vacunas: string[];
  desparacitaciones: string[];
}

export interface Turnos {
  id: number;
  date: string;
  hour: string;
  state: string;
}

export interface Mensajes {
  id: number;
  date: string;
  hour: string;
  message: string;
  state: string;
}

export interface UserContextType {
  user: User | null;
  loginContext: (userData: FormValues) => Promise<void>;
  logoutContext: () => void;
  error: string | null;
  loading: boolean;
  registerContext: (values: FormRegisterValues | FormValues) => Promise<void>;
}

///# Interfaces de formularios
export interface FormValues {
  email: string;
  password: string;
}
export const initialValues: FormValues = {
  email: "",
  password: "",
};

export interface FormRegisterValues {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  phone: number;
  birthdate: string;
  startDate: string;
  isAdmin: boolean;
  role: "user" | "adminVet" | "veterinarian";
}
export interface InputField {
  name: string;
  type: string | null;
  as?: string;
  option?: string[];
  placeholder?: string;
  label: string;
  validation: Yup.StringSchema;
}

export interface AuthFormProps {
  title?: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  buttonText: string;
  onSubmit: (values: FormValues | FormRegisterValues) => Promise<void>;
  inputFields: InputField[];
  inputValues?: FormValues | FormRegisterValues;
  googleButtonText?: string;
}
