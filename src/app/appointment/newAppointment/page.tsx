"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { InputsRegisterAppoint } from "@/components/Form/InputsForms";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { fetchPetsService } from "@/lib/authService";
import { Mascota } from "@/types/interfaces";
import { fetchPetsController } from "@/lib/authController";

const Appointments: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [availablesAppoint, setAvailableAppoint] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        startLoading();
        const responseMascotas = await fetchPetsController(
          user?.id as string,
          user?.token as string
        );
        setMascotas(responseMascotas);
        const responseService = await fetch;
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchMascotas();
    }
  }, []);

  useEffect(() => {
    if (mascotas.length > 0) {
    }
  }, [mascotas]);

  const handleSubmit = async (values: any) => {
    startLoading();
    stopLoading();
    router.push(PATHROUTES.APPOINTMENT);
  };
  return (
    <Screen>
      {loading && <Loading />}
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
