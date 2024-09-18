import { Servicio } from "@/types/interfaces";
import ButtonCustom from "./ButtonCustom";
import PATHROUTES from "@/helpers/path-routes";
export interface Service {
  id: number;
  logo: string;
  description: string;
  name: string;
}
const VetCard: React.FC<Service> = (service) => {
  return (
    <div className="flex flex-col bg-purpleBackground p-5 rounded-lg gap-5 md:w-[16em] lg:w-[20em] w-[12em] shadow-lg dark:bg-darkBackgroundFront">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={service.logo} alt="[serviceLogo]" />
          <h1 className="text-sm md:text-lg lg:text-xl font-extrabold text-primary dark:text-white">
            {service.name}
          </h1>
        </div>
      </div>
      <p className="text-justify dark:text-gray-300 text-sm md:text-base lg:text-lg">
        asdasd
        {service.description}
      </p>
      <div className="flex justify-end">
        <ButtonCustom
          href={PATHROUTES.NEWAPPOINTMEN}
          text="Agenda Ahora"
          className="rounded-lg text-white bg-detail p-2 shadow-md hover:scale-105"
        />
      </div>
    </div>
  );
};

export default VetCard;
