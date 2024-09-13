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

export interface ModalProps {
  isOpen: boolean;
  id: string;
  token: string;
  onClose: () => void;
  type: "profile" | "pet";
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

///# Interfaces de context

export interface UserContextType {
  session: any;
  status: string;
  user: User | null;
  setUser: (user: User | null) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithCredentials: (values: FormValues) => Promise<void>;
  logout: () => void;
  registerWithCredentials: (values: FormRegisterValues) => Promise<void>;
  registerPet: (values: FormNewPet) => Promise<void>;
}

///# Interfaces de Objetos
export interface User {
  id?: string;
  name: string;
  lastname: string;
  dni?: number;
  email: string;
  password?: string; //TODO viene por token?
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
  [key: string]: any;
}

export interface Mascota {
  id: string;
  name: string;
  birthdate: string;
  startDate: Date;
  color: string;
  weightCurrent: string;
  observation: string;
  userId: string | undefined;
  specie: {
    id: string;
    specie: string;
  };
  race: {
    id: string;
    race: string;
  };
  sex: {
    id: string;
    sex: string;
  };
  repConditionId: string;
  imgProfile: string;
  ///a implementar
  age?: number;
  vacunas?: any[];
  tratamientos?: any;
  medicamentos?: any;
  pendientes: {
    id: string;
    title: string;
    date: string;
    description: string;
  }[];
  [key: string]: any;
}
// Veterninarias [Missing info]
export interface Veterinaria {
  id: number;
  name: string;
  nameCompany: string;
  logo: string;
}

export interface Turnos {
  id: string;
  date: string;
  time: string;
  messageUser: string;
  price: string;
  pet: Mascota;
  state: {
    id: string;
    state: "Pendiente" | "Cancelado" | "Finalizado";
  };
  service: {
    id: string;
    service: string;
    price: number;
    description: string;
    duration: number;
  };
}

export interface Mensajes {
  id: number;
  date: string;
  hour: string;
  message: string;
  state: string;
}

// Control de values para formularios
export interface FormValues {
  //login
  dni: number;
  password: string;
}

export interface FormRegisterValues {
  //registerUser
  name: string;
  lastname?: string;
  dni?: number;
  email: string;
  startDate: Date;
  password?: string;
  passwordConfirm?: string;
  [key: string]: any;
}

export interface FormRegisterGoogleValues {
  //loginwithGoogle
  name: string;
  lastname: string;
  email: string | null | undefined;
  imgProfile: string | null | undefined;
  startDate: Date;
}

export interface FormNewPet {
  //register pet
  name: string;
  startDate: Date;
  color: string;
  specieId: string;
  raceId: string;
  sexId: string;
  birthdate: Date;
  weightCurrent: number;
  observation: string;
  image?: string;
  userId: string;
  [key: string]: string | number | Date | undefined;
}

export interface FormNewAppointment {
  date: Date;
  time: string;
  messageUser: string;
  price: number;
  pet_id: string;
  service_id: string;
}

// FORMS
export interface InputField {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  initialValue?: any;
  validation?: Yup.AnySchema;
  disable?: boolean;
  labelKey?: string;
  options?:
    | { id: string; specie: string }[]
    | { id: string; race: string }[]
    | { id: string; sex: string }[]
    | { id: string; repCondition: string }[]
    | Mascota[]
    | any[];
}

export interface ReusableFormProps {
  notLogo?: boolean;
  displayRow?: boolean;
  formTitle: string;
  inputs: InputField[];
  onSubmit: (values: any) => void;
  onInputChange?: (value: string) => void;
  submitButtonLabel: string;
}

//! FOR MOCK
export interface Tratamiento {
  applicationProducts: any[];
  clinicalExaminationId: string;
  description: string;
  id: string;
  observation: string;
  price: number;
  service: Service;
  serviceId: string;
  clinicalExamination: ClinicalExamination;
}

export interface Service {
  categoryServiceId: string;
  description: string;
  durationMin: number;
  id: string;
  price: number;
  sendMesasge: string | null;
  service: string;
  veterinarianId: string;
}
export interface ClinicalExamination {
  anamnesis: string;
  diagnosis: string;
  fc: number;
  fr: number;
  hydration: number;
  id: string;
  moodState: string;
  mucous: string;
  petId: string;
  temper: string;
  temperature: number;
  tllc: number;
  veterinarianId: string;
}

export interface Medicamento {
  pkprescripcion: number;
  nombre: string;
  title: string;
  description: string;
  extraInfo: string;
  droga: string;
  aplicacion: string;
}

export interface Vacuna {
  pkvacuna: number;
  title: string;
  description: string;
  extraInfo: string;
  aplicada: string;
  proxima: string;
  id: string;
  nombre: string;
}
