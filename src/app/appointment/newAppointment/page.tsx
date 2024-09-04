"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { InputsRegisterAppoint } from "@/components/Form/InputsForms";
import useLoading from "@/hooks/LoadingHook";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { useAppointmentData } from "@/hooks/useLoadDataAppoint";
import { newAppointmentController } from "@/lib/authController";
import { Mascota } from "@/types/interfaces";

const Appointments: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    mascotas,
    categories,
    services,
    fetchServices,
    loading: dataLoading,
  } = useAppointmentData(user?.id as string, user?.token as string);
  const [categorySelect, setCategorySelect] = useState("");
  const [mascotaSelect, setMascotaSelect] = useState<Mascota | null>(null);
  const [serviceSelect, setServiceSelect] = useState<{
    service: string;
    description?: string;
    price?: number;
  } | null>(null);

  useEffect(() => {
    if (categorySelect) {
      alert(categorySelect);
      fetchServices(categorySelect);
    }
  }, [categorySelect, fetchServices]);

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

    // router.push(PATHROUTES.APPOINTMENT);
  };

  if (loading || dataLoading) return <Loading />;
  const inputsWithOptions = InputsRegisterAppoint.map((input) => {
    if (input.name === "category") {
      return {
        ...input,
        options: categories,
        onInputChange: (value: string) => {
          setCategorySelect(value);
        },
      };
    } else if (input.name === "pet_id") {
      return {
        ...input,
        options: mascotas,
      };
    } else if (input.name === "service_id") {
      return {
        ...input,
        options: services,
      };
    }
    return input;
  });

  const handleOnChange = (value: string) => {
    categories.map((category) => {
      if (category.id === value) {
        fetchServices(category.id);
      }
      services.map((service) => {
        if (service.id === value) {
          setServiceSelect({
            service: service.serviceName,
            description: service.description,
            price: service.price,
          });
        }
      });
      mascotas.map((mascota) => {
        if (mascota.id === value) {
          setMascotaSelect(mascota);
        }
      });
    });
  };
  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <ReusableForm
          formTitle="Registro de Turno"
          inputs={inputsWithOptions}
          onSubmit={handleSubmit}
          submitButtonLabel="Registrar Turno"
          onInputChange={(value) => {
            handleOnChange(value);
          }}
        />
        {serviceSelect && (
          <div className="shadow-lg p-5">
            <p>Tipo de servicio seleccionado: {serviceSelect.description}</p>
            <p>Precio del servicio seleccionado: $ {serviceSelect.price}</p>
          </div>
        )}
      </div>
    </Screen>
  );
};

export default Appointments;
