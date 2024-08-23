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

///# Interfaces de context
export interface User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  token: string;
  role: string;
  veterinariafavorita: string;
  mascotas: string[];
  mensajes: string[];
  turnos: string[];
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
  phone: string;
  role: string;
}
export interface InputField {
  name: string;
  type: string;
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
