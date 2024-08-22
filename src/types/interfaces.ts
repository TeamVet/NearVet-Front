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

export interface User {
  nombre: string;
  mail: string;
  token: string;
  role: string;
  mascotas: string[];
  veterinariafavorita: string;
  mensajes: string[];
}

export interface UserContextType {
  user: User | null;
  loginContext: (userData: FormValues) => Promise<void>;
  logoutContext: () => void;
  error: string | null;
  loading: boolean;
}

export interface FormValues {
  email: string;
  password: string;
}
export const initialValues: FormValues = {
  email: "",
  password: "",
};
