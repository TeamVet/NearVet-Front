"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { InputsRegisterAppoint } from "@/components/Form/InputsForms";

const Appointments: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const handleSubmit = async (values: any) => {};
  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registro de Turno"
          inputs={InputsRegisterAppoint}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar Mascota"
        />
      </div>
    </Screen>
  );
};

export default Appointments;
