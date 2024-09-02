"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Screen from "../Screen";
import ReusableForm from "../Form/FormCustom";
import { InputsModifyUser } from "../Form/InputsForms";
import Image from "next/image";
import { fetcher } from "@/lib/fetcher";
import { User } from "@/types/interfaces";

const UserInformation: React.FC = () => {
  const [existingValues, setIExistingValues] = useState<User>();
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setIExistingValues({
        name: user?.name,
        lastname: user?.lastname,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        startDate: user?.startDate,
        imgProfile: user?.imgProfile,
        dni: user?.dni,
        role: user?.role,
      });
      InputsModifyUser.map((input) => {
        if (existingValues) {
          (input.initialValue as keyof User) = existingValues?.[input.name];
        }
      });
    }
  }, [user]);
  const handleSubmit = async (values: any) => {};
  return (
    <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto my-2">
      <h3 className="text-2xl font-semibold ">Tus Datos</h3>
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <Image
          src={user!.imgProfile}
          width={100}
          height={100}
          alt={`Foto de perfil de ${user!.name}`}
          className="rounded-full bg-detail p-1"
        />
        <div className="flex flex-col text-justify text-wrap ">
          <p>
            <span className="font-bold">Nombre:</span> {user!.name}{" "}
            {user?.lastname}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user!.email}
          </p>
          <p>
            <span className="font-bold">Telefono de contacto:</span>{" "}
            {user?.phone}
          </p>
        </div>
      </div>
      <span className="text-gray-400 font-bold">_______________</span>
      {existingValues && (
        <ReusableForm
          notLogo
          displayRow
          formTitle="Cambiar tus datos"
          inputs={InputsModifyUser}
          onSubmit={handleSubmit}
          submitButtonLabel="Modificar"
        />
      )}
    </div>
  );
};

export default UserInformation;
