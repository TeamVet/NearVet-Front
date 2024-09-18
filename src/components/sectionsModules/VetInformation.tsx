"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import ReusableForm from "../Form/FormCustom";
import { InputsModifyVet as originalInputsModifyUser } from "../Form/InputsForms";
import Image from "next/image";
import { FormRegisterValues, User } from "@/types/interfaces";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";

import { Modal } from "../ModalImage";
import { IoPencil } from "react-icons/io5";
import { InfoNotify } from "@/lib/toastyfy";
import { fetcher } from "@/lib/fetcher";

const VetInformation: React.FC = () => {
  const [formFields, setFormFields] = useState([...originalInputsModifyUser]);
  const { user, setUser } = useUser();
  const [modal, setModal] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { loading, startLoading, stopLoading } = useLoading();
  const URL_VET = process.env.NEXT_PUBLIC_VETERINARIANS_URL;
  useEffect(() => {
    const fetchVeterinarian = async () => {
      if (!user) return;
      try {
        const dataFetch = {
          url: `${URL_VET}/${user.id}`,
          method: "GET" as const,
        };
        const data = await fetcher(dataFetch);
        console.log(data);
        if (data.id) {
          setUser(data);
          setLoaded(true);
        }
      } finally {
        stopLoading();
      }
    };

    if (user) {
      startLoading();
      fetchVeterinarian();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const updatedInputs = originalInputsModifyUser.map((input) => {
      return {
        ...input,
        initialValue: user[input.name as keyof User] || "",
      };
    });

    setFormFields(updatedInputs);
    setTimeout(() => stopLoading(), 2000);
  }, [loaded]);
  const handleSubmit = async (values: FormRegisterValues) => {
    try {
      startLoading();
      const modifiedValues = Object.keys(values).reduce((acc, key) => {
        const initialValue = formFields.find(
          (field) => field.name === key
        )?.initialValue;

        if (values[key] !== initialValue) {
          acc[key] = values[key];
        }
        return acc;
      }, {} as Record<string, any>);

      if (modifiedValues.dni) {
        modifiedValues.dni = Number(modifiedValues.dni);
      }
      if (modifiedValues.phone) {
        modifiedValues.phone = Number(modifiedValues.phone);
      }
      if (Object.keys(modifiedValues).length === 0) {
        InfoNotify("No realizaste ningun cambio.");
        return;
      }

      // const response = await modifyVeterinarianService(
      //   modifiedValues,
      //   user!.id as string,
      //   user!.token as string
      // );

      // if (response.id) {
      //   InfoNotify("Hemos actualizado tus datos.");
      //   const updateUser = {
      //     ...user,
      //     ...response,
      //   };
      //   localStorage.setItem("user", JSON.stringify(updateUser));
      //   setUser(updateUser);
      // }
    } finally {
      stopLoading();
    }
  };

  const onCloseModal = () => {
    setModal(false);
  };
  return (
    loaded && (
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto my-2">
        {loading && <Loading />}

        <Modal
          isOpen={modal}
          onClose={onCloseModal}
          id={user!.id as string}
          token={user!.token as string}
          type="profile"
        />
        <h3 className="text-2xl font-semibold dark:text-darkHline">
          Tus Datos
        </h3>
        <div className="flex flex-col md:flex-row gap-5 items-center relative p-2">
          <button
            className="font-semibold text-2xl absolute top-0 right-0"
            onClick={() => setModal(true)}
          >
            <IoPencil />
          </button>
          <Image
            src={user!.imgProfile}
            width={100}
            height={100}
            alt={`Foto de perfil de ${user!.name}`}
            className="rounded-full bg-detail p-1"
          />
          <div className="flex flex-col text-justify text-wrap">
            <p>
              <span className="font-bold">Nombre:</span> {user!.name}{" "}
              {user?.lastname}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user!.email}
            </p>
            <p>
              <span className="font-bold">Teléfono de contacto:</span>{" "}
              {user?.phone}
            </p>
          </div>
        </div>
        <span className="text-gray-400 font-bold">_______________</span>
        {formFields && !loading && (
          <ReusableForm
            notLogo
            displayRow
            formTitle="Cambiar tus datos"
            inputs={formFields}
            onSubmit={handleSubmit}
            submitButtonLabel="Modificar"
          />
        )}
      </div>
    )
  );
};

export default VetInformation;
