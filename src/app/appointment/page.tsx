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
      <ReusableForm
        formTitle="Registro de Turno"
        inputs={InputsRegisterAppoint}
        onSubmit={handleSubmit}
        submitButtonLabel="Registrar Mascota"
      />
    </Screen>
  );
};

export default Appointments;
