import ButtonCustom from "@/components/ButtonCustom";
import { Modal } from "@/components/Modal";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { ErrorNotify } from "@/lib/toastyfy";
import { Mascota } from "@/types/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoPencil } from "react-icons/io5";

const PetInfo = (mascota: Mascota, idUrl: string) => {
  if (!mascota) return null;
  const [modal, setModal] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();
  const onCloseModal = () => {
    setModal(false);
    window.location.reload();
  };
  return (
    <div className=" md:w-1/4 shadow-lg">
      <Modal
        isOpen={modal}
        id={idUrl as string}
        token={user?.token as string}
        onClose={onCloseModal}
        type="pet"
      />
      <div className="flex flex-row relative justify-center">
        <Image
          src={mascota?.imgProfile}
          alt="Foto de la mascota"
          width={100}
          height={100}
          className="rounded-full bg-detail p-1"
        />
        <button
          className="font-semibold text-2xl absolute top-0 right-0"
          onClick={() => setModal(true)}
        >
          <IoPencil />
        </button>
      </div>
      <div className="p-2 text-justify">
        <p>
          <strong className="capitalize">{mascota.name}</strong>, es un{" "}
          {mascota.specie.specie} de raza {mascota.race.race}, nacimiento{" "}
          {mascota.birthdate}{" "}
          {mascota.age ? `con una edad de ${mascota.age} años` : ""}, sus
          colores son {mascota.color} y su sexo es {mascota.sex.sex},
          Observacion:{" "}
          {mascota.observation ? mascota.observation : "Sin observaciones"}{" "}
        </p>
      </div>
      <br />
      <div className="flex flex-row">
        <ButtonCustom
          text="Editar"
          href={PATHROUTES.PET + `/modifyPet/${mascota.id}`}
        />

        <ButtonCustom
          text="Agendar Turno"
          onClick={() => router.push(PATHROUTES.NEWAPPOINTMEN)}
        />
      </div>
    </div>
  );
};

export default PetInfo;
