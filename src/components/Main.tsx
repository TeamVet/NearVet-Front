"use client";
import { FaGreaterThan } from "react-icons/fa";
import ButtonCustom from "./ButtonCustom";
import VetCard from "./VetCard";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-16 dark:bg-gray-900">
      {/* Introducción */}
      <div className="flex flex-col lg:flex-row gap-12 md:gap-20 p-6 md:p-8">
        <div className="w-full flex flex-col gap-4 lg:w-3/5">
          <h1 className="text-start font-bold text-3xl md:text-4xl lg:text-5xl text-detail dark:text-purple-400">
            NearVet
          </h1>
          <h2 className="text-left font-bold text-2xl md:text-3xl lg:text-4xl dark:text-white">
            Encuentra la mejor veterinaria para tu mascota
          </h2>
          <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200">
            Nuestro marketplace de clínicas veterinarias te conecta con las
            mejores puntuadas en tu área. Lee reseñas y obtén los cuidados que
            tu{" "}
            <span className="text-detail font-bold dark:text-purple-300">
              amigo peludo
            </span>{" "}
            merece.
          </p>
          <div className="flex justify-end mt-4">
            <ButtonCustom
              text="Encuentra una Clínica"
              className="text-white bg-detail dark:bg-purple-600 hover:scale-105 hover:bg-purple-700 dark:hover:bg-purple-500 md:p-2 lg:p-3"
            />
            <ButtonCustom
              text="Descubre más"
              className="bg-secondary dark:bg-purple-800 dark:text-white hover:scale-105 dark:hover:bg-purple-700 md:p-2 lg:p-3"
            />
          </div>
        </div>
        <div className="flex items-center md:px-10">
          <img
            className="w-full h-auto lg:h-64 object-cover rounded-md shadow-lg dark:opacity-90"
            src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724516607/e-8_shgqns.png"
            alt="Veterinarian with pets"
          />
        </div>
      </div>

      {/* Nuestros Servicios */}
      <div className="bg-secondary dark:bg-gray-800 p-8 md:p-12 rounded-md shadow-md mx-4 md:mx-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-detail text-center font-extrabold text-lg md:text-xl lg:text-2xl dark:text-purple-400 block mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl dark:text-white mb-6">
            ¡Conectándote con las mejores veterinarias!
          </h2>
          <p className="text-center text-base md:text-lg lg:text-xl dark:text-gray-200 mb-8 max-w-4xl mx-auto">
            Nuestra plataforma facilita encontrar las veterinarias mejor
            puntuadas en tu área. Desde chequeos de rutina hasta cuidados
            especializados, descuida{" "}
            <span className="font-bold text-primary dark:text-green-400">
              ¡Te tenemos cubierto!
            </span>
          </p>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <ul className="space-y-8">
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail font-bold dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-xl lg:text-2xl">
                      Resuelve emergencias
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Encuentra la clínica más cercana y cuida siempre de tu
                      mejor amigo.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail font-bold dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-xl lg:text-2xl">
                      Lee reseñas
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Revisa las clasificaciones y reseñas para encontrar la
                      mejor veterinaria para tu mascota.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaGreaterThan className="text-detail dark:text-purple-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-detail font-bold dark:text-purple-400 mb-2 pl-2 w-fit text-lg md:text-xl lg:text-2xl">
                      Cuidado especializado
                    </h3>
                    <p className="dark:text-gray-300 text-start text-sm md:text-base lg:text-lg">
                      Accede a una amplia gama de servicios veterinarios para
                      las necesidades de tu mascota.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full rounded-md shadow-lg dark:opacity-90"
                src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724518723/How-to-become-a-vet_banner_xa9mlo.jpg"
                alt="Veterinarios atendiendo a un perro"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clínicas Asociadas */}
      <div className="flex flex-col gap-8 p-8 md:p-12 rounded-md">
        <span className="text-detail max-w-sm text-center mx-auto p-2 rounded-lg text-lg md:text-xl lg:text-2xl bg-secondary dark:bg-purple-700 dark:text-white">
          Clínicas Asociadas
        </span>
        <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl dark:text-white mb-6">
          Las mejores veterinarias cerca de ti
        </h1>
        <p className="text-justify text-base md:text-lg lg:text-xl dark:text-gray-200 max-w-3xl mx-auto mb-8">
          Explora nuestra selección de clínicas veterinarias altamente
          calificadas en tu área. Agenda citas, lee reseñas, y encuentra el
          match perfecto para tu mascota.
        </p>
        <div className="flex flex-row flex-wrap gap-8 md:gap-10 justify-center">
          <VetCard
            id={1}
            logo="example"
            name="Dra. Claudia Armendariz Rodríguez"
            nameCompany="FurryFriends"
          />
          <VetCard
            id={2}
            logo="example"
            name="Dra. Claudia Armendariz Rodríguez"
            nameCompany="FurryFriends"
          />
          <VetCard
            id={3}
            logo="example"
            name="Dra. Claudia Armendariz Rodríguez"
            nameCompany="FurryFriends"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
