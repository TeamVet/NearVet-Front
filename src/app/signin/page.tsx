"use client";

import Screen from "@/components/Screen";
import { FormValues } from "@/types/interfaces";
import { useUser } from "@/context/UserContext";
import GoogleButton from "@/components/GoogleButton";
import ReusableForm from "@/components/Form/FormCustom";
import { InputsLogin } from "@/components/Form/InputsForms";
import Link from "next/link";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";

const SignIn: React.FC = () => {
  const { loginWithCredentials } = useUser();
  const { startLoading, stopLoading, loading } = useLoading();

  const handleSubmit = async (values: FormValues) => {
    startLoading();
    await loginWithCredentials(values);
    stopLoading();
  };
  return (
    <Screen>
      {loading && <Loading />}
      <div className="dark:bg-darkBackgroundFront dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 my-10 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Iniciar Sesión"
          inputs={InputsLogin}
          onSubmit={handleSubmit}
          submitButtonLabel="Iniciar"
          className="dark:text-lightText"
        />
        <Link
          className="text-primary font-bold flex flex-row dark:text-lightText"
          href={PATHROUTES.REGISTER}
        >
          <h3 className="px-1 dark:text-secondary">¿Aún sin cuenta? </h3>
          <span className="dark:text-primary">Registrarte</span>
        </Link>
        <span className="text-gray-400 font-bold dark:text-darkText">
          - OR -
        </span>
        <GoogleButton/>
      </div>
    </Screen>
  );
};

export default SignIn;
