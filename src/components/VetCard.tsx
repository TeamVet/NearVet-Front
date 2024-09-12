import { Veterinaria } from "@/types/interfaces";
import { FaRegStar } from "react-icons/fa6";
import ButtonCustom from "./ButtonCustom";
const VetCard: React.FC<Veterinaria> = (vet) => {
  return (
    <div className="flex flex-col bg-secondary p-5 rounded-lg gap-5 md:w-[30em] shadow-lg dark:bg-navDarkBG">
      <div className="flex justify-between">
        <div className="flex">
          <img src={vet.logo} alt="[vetLogo]" />
          <h1 className="text-lg font-extrabold dark:text-darkHline">
            {vet.nameCompany}
          </h1>
        </div>
        <span className="text-primary text-md font-semibold flex">
          <FaRegStar className="pt-1 text-md" /> 4.9
        </span>
      </div>
      <p className="text-justify">
        <b>[Descripcion de Vet || Opinión de usuarios]</b> Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Excepturi adipisci debitis blanditiis
        voluptatibus. Ut laboriosam cupiditate tempore.
      </p>
      <div className="flex justify-end">
        <ButtonCustom text="Agenda Ahora" className="rounded-lg text-white bg-detail p-2 shadow-md hover:scale-105" />
      </div>
    </div>
  );
};

export default VetCard;
