import CardCustom from "../cardCustom";
import Image from "next/image";
import PATHROUTES from "@/helpers/path-routes";
import { Mascota, PetsModuleProps } from "@/types/interfaces";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";
import { ErrorNotify } from "@/lib/toastyfy";

const PetsModule: React.FC<PetsModuleProps> = ({ user }) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

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
        if (!response.ok) {
          throw new Error("Error al obtener mascotas");
        }
        const data = await response.json();
        setMascotas(data);
      } catch (error) {
        ErrorNotify(`Error al obtener tus mascotas: ${error}`);
      }
    };

    if (user?.id) {
      fetchMascotas();
    }
  }, [user]);

  return (
    <div className="w-full m-5">
      <h3 className="text-xl">Tus Mascotas</h3>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 m-5 justify-center">
        {mascotas.length >= 1 ? (
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
                text="Editar"
                href={PATHROUTES.PET + `/${mascota.id}`}
              />
            </CardCustom>
          ))
        ) : (
          <>Aun no tienes mascotas</>
        )}
      </div>
      <ButtonCustom text="Añadir mascota" href={PATHROUTES.PET + "/newpet"} />
    </div>
  );
};

export default PetsModule;
