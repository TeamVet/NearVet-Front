import { FaGreaterThan } from "react-icons/fa";
import ButtonCustom from "./ButtonCustom";
import VetCard from "./VetCard";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-12">
      <div className="flex gap-28 p-10">
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-start font-bold text-4xl dark:text-darkHline">
            Encuentra la veterinaria perfecta para tu mascota
          </h1>
          <p className="text-justify text-xl">
            Nuestro marketplace de clínicas veterinarias te conecta a las
            veterinarias mejor puntuadas en tu área. Lee reseñas y obtén los
            cuidados que tu{" "}
            <span className="text-detail font-bold">amigo peludo</span> merece.
          </p>
          <div className="flex justify-end gap-5">
            <button className="rounded-lg text-white bg-detail p-3 shadow-md hover:scale-105">
              {" "}
              Encuentra una Clínica
            </button>
            <button className="rounded-lg bg-secondary p-3 shadow-md hover:scale-105">
              {" "}
              Descubre más
            </button>
          </div>
        </div>
        <div className="w-3/5">
          <img
            className="w-full rounded-md"
            src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724516607/e-8_shgqns.png"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-secondary dark:bg-darkBG p-10 rounded-md">
        <span className="text-detail w-full text-center font-extrabold text-lg dark:text-darkHline">
          Nuestros Servicios
        </span>
        <h1 className="text-center font-bold text-4xl">
          ¡Conectándote con las mejores veterinarias!
        </h1>
        <p className="text-justify text-xl">
          Nuestra plataforma facilita encontrar las veterinarias mejor puntuadas
          en tu área. Desde chequeos de rutina hasta cuidados especializados,
          descuida{" "}
          <span className="font-bold text-primary">¡Te tenemos cubierto!</span>
        </p>
        <div className="flex gap-20">
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col justify-center h-full">
              <ul className="flex flex-col gap-10 text-start text-lg">
                <li>
                  <span className="text-detail font-bold flex">
                    <FaGreaterThan className="text-detail pt-2" />
                    Resuleve emergencias
                  </span>
                  <p>
                    Encuentra la clínica más cercana en tu área y cuida siempre
                    de tu mejor amigo.
                  </p>
                </li>
                <li>
                  <span className="text-detail font-bold flex">
                    <FaGreaterThan className="text-detail pt-2" />
                    Lee reseñas
                  </span>
                  <p>
                    Revisa las clasificaciones y reseñas para encontrar la mejor
                    veterinaria para tu mascota.
                  </p>
                </li>
                <li>
                  <span className="text-detail font-bold flex">
                    <FaGreaterThan className="text-detail pt-2 " />
                    Cuidado especializado
                  </span>
                  <p>
                    Accede a una ampli agama de servicios veterinarios para las
                    necesidades de tu mascota.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-3/5">
            <img
              className="w-full rounded-md"
              src="https://res.cloudinary.com/dvj0ded3x/image/upload/v1724518723/How-to-become-a-vet_banner_xa9mlo.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-10 rounded-md">
        <span className="text-detail max-w-sm text-center mx-auto p-2 rounded-lg text-lg bg-secondary">
          Clínicas Asociadas
        </span>
        <h1 className="text-center font-bold text-4xl">
          Las mejores veterinarias cerca de tí
        </h1>
        <p className="text-justify text-xl">
          Explora nuestra selección de clínicas veterinarias altamente
          calificadas en tu área. Agenda citas, lee reseñas, y encuentra el
          match perfecto para tu mascota.
        </p>
        <div className="flex gap-20 justify-between">
          {/* Hacer aquí el map de vets para mostrar las VetCards. */}
          <VetCard
            id={1}
            logo="example"
            name="Dra. Clauida Armendariz Rodríguez"
            nameCompany="FurryFriends"
          ></VetCard>
          <VetCard
            id={1}
            logo="example"
            name="Dra. Clauida Armendariz Rodríguez"
            nameCompany="FurryFriends"
          ></VetCard>
          <VetCard
            id={1}
            logo="example"
            name="Dra. Clauida Armendariz Rodríguez"
            nameCompany="FurryFriends"
          ></VetCard>
        </div>
      </div>
    </div>
  );
};

export default Main;
