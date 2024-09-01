"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import Screen from "@/components/Screen";
import ReusableForm from "@/components/Form/FormCustom";
import { InputsRegisterUser } from "@/components/Form/InputsForms";
import { FormRegisterValues } from "@/types/interfaces";
import PATHROUTES from "@/helpers/path-routes";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";

const RegisterForm: React.FC = () => {
  const { registerWithCredentials } = useUser();

  const handleSubmit = async (values: FormRegisterValues) => {
    registerWithCredentials(values);
  };
  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registrarse"
          inputs={InputsRegisterUser}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrarse"
        />
        <Link
          className="text-primary font-bold flex flex-row"
          href={PATHROUTES.LOGIN}
        >
          <h3 className="px-1">¿Ya tienes cuenta? </h3>
          Iniciar sesión
        </Link>
        <span className="text-gray-400 font-bold">- OR -</span>
        <GoogleButton />
      </div>
    </Screen>
  );
};

export default RegisterForm;
