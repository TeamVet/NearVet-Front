"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { InputsRegisterAppoint } from "@/components/Form/InputsForms";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useAppointmentData } from "@/hooks/useLoadDataAppoint";
import { newAppointmentController } from "@/lib/authController";
import Image from "next/image";

const Appointments: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    mascotas,
    mascotaSelect,
    categories,
    services,
    horarios,
    loading: dataLoading,
    serviceSelect,
    handleOnChange,
  } = useAppointmentData(user?.id as string, user?.token as string);

  const handleSubmit = async (values: any) => {
    startLoading();
    try {
      values = {
        ...values,
        price: serviceSelect?.price,
      };
      const response = await newAppointmentController(values);
      if (response) {
        router.push(PATHROUTES.APPOINTMENT);
      }
    } finally {
      stopLoading();
    }
  };

  if (loading || dataLoading) return <Loading />;

  const inputsWithOptions = InputsRegisterAppoint.map((input) => {
    if (input.name === "category") {
      return { ...input, options: categories };
    } else if (input.name === "pet_id") {
      return { ...input, options: mascotas };
    } else if (input.name === "service_id") {
      return { ...input, options: services };
    } else if (input.name === "time") {
      return { ...input, options: horarios };
    }
    return input;
  });

  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto relative">
        <ReusableForm
          formTitle="Registro de Turno"
          inputs={inputsWithOptions}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar Turno"
          onInputChange={(value) => handleOnChange(value)}
        />
        {mascotaSelect && (
          <Image
            src={mascotaSelect.imgProfile}
            alt="mascota"
            width={100}
            height={100}
            className="-z-10 absolute top-[2vh] left-[2vw] size-[20vw] md:size-[10vw] opacity-90 rounded-full"
          />
        )}
        {serviceSelect && (
          <div className="dark:border rounded-md p-5 flex flex-col text-start gap-2">
            <h3 className="text-lg font-semibold text-center text-detail">
              Detalles del Servicio seleccionado
            </h3>
            <p>
              <strong>Tipo de servicio seleccionado:</strong>
              {serviceSelect.description}
            </p>
            <p>
              <strong>Precio del servicio seleccionado:</strong>$
              {serviceSelect.price}
            </p>
          </div>
        )}
      </div>
    </Screen>
  );
};

export default Appointments;
