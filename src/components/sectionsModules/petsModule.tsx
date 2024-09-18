"use client";
import CardCustom from "../cardCustom";

import Image from "next/image";

import PATHROUTES from "@/helpers/path-routes";

import { useEffect, useState } from "react";

import ButtonCustom from "../ButtonCustom";

import { ErrorNotify } from "@/lib/toastyfy";
import { useUser } from "@/context/UserContext";

import { Mascota } from "@/types/interfaces";
import { fetchPetsController } from "@/lib/Controllers/petController";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";

import { useRouter } from "next/navigation";

import Title from "../Title";

const PetsModule: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await fetchPetsController(
          user?.id as string,

          user?.token as string
        );

        setMascotas(data);
      } finally {
        stopLoading();
      }
    };

    if (user?.id && user?.token) {
      startLoading();

      fetchMascota();
    }
  }, [user]);

  const handleClick = (id: string) => {
    router.push(PATHROUTES.PET + `/${id}`);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-center border-b-2 border-detail py-2 w-3/4 mx-auto">
          <Title>Tus mascotas</Title>
        </div>

        <div className="flex flex-wrap gap-5 m-5 justify-center">
          {mascotas && mascotas.length === 0 ? (
            <p className="font-semibold text-center text-base md:text-lg">
              Aún no tienes mascotas
            </p>
          ) : (
            mascotas &&
            mascotas.length > 0 &&
            mascotas.map((mascota) => (
              <CardCustom
                key={mascota.id}
                isSelect={"not"}
                onClick={() => handleClick(mascota.id)}
              >
                <div className="flex flex-col gap-2 w-full items-center">
                  <Image
                    src={mascota.imgProfile}
                    alt={`Imagen de ${mascota.name}`}
                    width={100}
                    height={100}
                    className="rounded-full bg-detail p-1 w-[15vh] h-[15vh] object-cover shadow-lg"
                  />
                  <h2 className="text-primary font-extrabold mx-10 text-center text-lg md:text-xl">
                    {mascota.name}
                  </h2>

                  <div className="flex flex-col w-3/4 items-center px-2 mx-auto gap-2">
                    <div className="flex-flex-col">
                      <h2 className="text-purpleTitles dark:text-detail font-extrabold text-center text-sm md:text-lg">
                        Raza
                      </h2>
                      <p className="text-lightHline dark:text-darkHline font-semibold text-center text-xs md:text-sm">
                        {mascota.race.race}
                      </p>
                    </div>

                    <div className="flex-flex-col">
                      <h2 className="text-purpleTitles font-extrabold dark:text-detail text-center text-sm md:text-lg">
                        Color
                      </h2>

                      <p className="text-lightHline font-semibold dark:text-darkHline text-center text-xs md:text-sm">
                        {mascota.color}
                      </p>
                    </div>
                  </div>
                </div>

                <ButtonCustom
                  text="Ver más"
                  href={PATHROUTES.PET + `/${mascota.id}`}
                />
              </CardCustom>
            ))
          )}
        </div>

        <div className="mx-auto">
          <ButtonCustom
            text="Añadir mascota"
            href={PATHROUTES.PET + "/newpet"}
          />
        </div>
      </div>
    </>
  );
};

export default PetsModule;
