import { FormRegisterValues, FormValues, User } from "@/types/interfaces";
import AuthForm from "../AuthForm";
import * as Yup from "yup";

interface InformationInputs {
  user: User | null
  modifyContext: (values: FormRegisterValues | FormValues) => Promise<void>;
}
export const InformationModule: React.FC<InformationInputs> = ({ user, modifyContext }) => {
  const userValues = {
    name: user?.name ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
    oldpassword: user?.password ?? "",
    password: "",
    passwordConfirm: "",
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    role: user?.role ?? ""
  };
  const loginFields = [
    {
      name: "name",
      type: "text",
      label: "Tu nombre",
      validation: Yup.string()
        .required("Name is required."),
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      validation: Yup.string()
        .email("Enter a valid email. Example abc@example.com")
        .required("Email is required."),
    },
    {
      name: "address",
      type: "text",
      label: "Tu dirección",
      validation: Yup.string()
        .required("Address is required."),
    },
    {
      name: "oldpassword",
      type: "password",
      label: "Actual contraseña",
      validation: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
    },
    {
      name: "password",
      type: "password",
      label: "Nueva contraseña",
      validation: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
    },
    {
      name: "passwordConfirm",
      type: "password",
      label: "Confirma tu nueva contraseña",
      validation: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),

    }
  ];
  return (<div className='w-full'>
    <h3 className="text-xl">Información del {user?.role}</h3>
    <AuthForm
      subtitle="Actualiza tus datos"
      linkText=""
      linkHref=""
      buttonText="Actualizar mis datos"
      onSubmit={modifyContext}
      inputValues={userValues}
      inputFields={loginFields}
    />
  </div>)
}