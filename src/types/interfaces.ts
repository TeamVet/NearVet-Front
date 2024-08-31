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

export interface GoogleButtonProps {
  text?: string;
  size?: string;
  color?: string;
  bgcolor?: string;
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
  id?: string;
  name: string;
  lastname: string;
  dni?: number;
  email: string;
  password?: string; //viene por token?
  address?: string;
  city?: string;
  phone?: number;
  token?: string;
  startDate: Date;
  endDate?: string;
  imgProfile: string;
  role: {
    id?: string;
    role: string;
  }; //viene por token
  veterinariafavorita?: string;
  turnos?: Turnos[];
  mascotas?: Mascota[];
}

export interface Mascota {
  id: string;
  name: string;
  birthdate: string;
  startDate: Date;
  color: string;
  weightCurrent: number;
  observation: string;
  image: string;
  userId: string | undefined;
  specieId: string;
  raceId: string;
  sexId: string;
  repConditionId: string;
  imgProfile: string;
  ///a implementar
  age: number;
  stateSalud: string;
  historiaClinica: string;
  enfermedades: string[];
  vacunas: string[];
  desparacitaciones: string[];
}
// Veterninarias [Missing info]
export interface Veterinaria {
  id: number;
  name: string;
  nameCompany: string;
  logo: string;
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

// interfaces.ts
export interface FormValues {
  dni: number;
  password: string;
}

export interface FormRegisterValues {
  name: string;
  lastname?: string;
  dni?: number;
  email: string;
  startDate: Date;
  password?: string;
  passwordConfirm?: string;
}

export interface FormRegisterGoogleValues {
  name: string;
  lastname: string;
  email: string | null | undefined;
  imgProfile: string | null | undefined;
  startDate: Date;
}

export interface FormNewPet {
  name: string;
  startDate: Date;
  color: string;
  specieId: string;
  raceId: string;
  sexId: number;
  birthdate: Date;
  weightCurrent: number;
  observation: string;
  image?: string;
  userId: string | undefined;
}

export interface UserContextType {
  user: User | null;
  loginContext: (userData: FormValues) => Promise<User | undefined>;
  logoutContext: () => void;
  handleGoogleSignIn: () => Promise<any | undefined>;
  loading: boolean;
  registerContext: (values: FormRegisterValues) => Promise<User | undefined>;
  newPet: (values: FormNewPet) => Promise<Mascota | undefined>;
}

///
export interface InputField {
  name: string;
  type?: string; // Hacer tipo opcional
  as?: string;
  option?: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  label: string;
  validation: Yup.StringSchema;
  initialValue?: string; // Valor inicial opcional
}

export interface AuthFormProps<T> {
  title?: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  buttonText: string;
  onSubmit: any;
  inputFields: InputField[];
  googleButtonText?: string;
  onFieldChange?: any;
  register?: boolean;
}
