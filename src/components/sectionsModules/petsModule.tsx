"use client";
import CardCustom from "../cardCustom";
import Image from "next/image";
import PATHROUTES from "@/helpers/path-routes";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import { ErrorNotify } from "@/lib/toastyfy";
import { useUser } from "@/context/UserContext";
import { Mascota } from "@/types/interfaces";

const PetsModule: React.FC = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await fetch(
          `https://nearvet-latest.onrender.com/pets/user/${user!.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        if (!data) {
          throw new Error(data.error);
        }
        if (data.length === 0) {
          return;
        }

        setMascotas(data);
      } catch (error) {
        ErrorNotify(
          `Error al obtener tus mascotas: ${error}, intenta logueandote nuevamente`
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMascotas();
    }
  }, [user]);

  console.log(mascotas);

  return (
    <div className="w-full m-5">
      <h3 className="text-2xl font-semibold ">Tus Mascotas</h3>
      <span className="text-gray-400 font-bold">_______________</span>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Cargando tus mascotas...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:flex-wrap gap-5 m-5 justify-center">
          {mascotas.length === 0 ? (
            <p>Aún no tienes mascotas</p>
          ) : (
            mascotas.length > 0 &&
            mascotas.map((mascota) => (
              <CardCustom key={mascota.id} isSelect={"not"}>
                <div className="my-2">
                  <Image
                    src={mascota.imgProfile}
                    alt={`Imagen de ${mascota.name}`}
                    width={100}
                    height={100}
                    className="mx-auto my-2"
                  />
                  <h3 className="text-xl text-black dark:text-white mx-10">
                    Nombre: {mascota.name}
                  </h3>
                  <p className="text-black dark:text-white">
                    Color: {mascota.color}
                  </p>
                </div>

                <ButtonCustom
                  text="Ver más"
                  href={PATHROUTES.PET + `/${mascota.id}`}
                />
              </CardCustom>
            ))
          )}
        </div>
      )}
      <ButtonCustom text="Añadir mascota" href={PATHROUTES.PET + "/newpet"} />
    </div>
  );
};

export default PetsModule;
