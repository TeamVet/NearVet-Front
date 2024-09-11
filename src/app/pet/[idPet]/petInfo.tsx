import ButtonCustom from "@/components/ButtonCustom";
import { Modal } from "@/components/ModalImage";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { Mascota } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";

const PetInfo = (mascota: Mascota) => {
  if (!mascota) return null;
  const [modal, setModal] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();
  const idUrl = useParams();

  const onCloseModal = () => {
    setModal(false);
    // window.location.reload();
  };

  return (
    <div className="shadow-lg md:min-h-[99vh] p-3">
      <Modal
        isOpen={modal}
        id={idUrl.idPet as string}
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
      <div className="md:p-5 text-justify">
        <p>
          <strong className="capitalize">{mascota.name}</strong>, es un{" "}
          {mascota.specie.specie}, de raza {mascota.race.race},
          {mascota.birthdate
            ? `con fecha de nacimiento el ${mascota.birthdate}`
            : ""}
          {mascota.age
            ? ` con una edad de ${mascota.age} años aproximadamente`
            : ""}
          , sus colores son {mascota.color} y su sexo es {mascota.sex.sex}.
        </p>
        <p className="py-2">
          Observaciones:{" "}
          {mascota.observation ? mascota.observation : "Sin observaciones"}{" "}
        </p>
      </div>
      <br />
      <div className="flex flex-row">
        <Link
          href={PATHROUTES.PET + `/modifyPet/${mascota.id}`}
          className="bg-detail p-3 m-auto rounded-lg text-white"
        >
          Editar
        </Link>
        <Link
          href={PATHROUTES.NEWAPPOINTMEN}
          className="bg-detail p-3 m-auto rounded-lg text-white"
        >
          Nuevo Turno
        </Link>
      </div>
    </div>
  );
};

export default PetInfo;
