import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import Image from "next/image";
import Link from "next/link";
import {
  IoCalendarClearOutline,
  IoLogoWhatsapp,
  IoTimeOutline,
} from "react-icons/io5";

interface AppointCardProps {
  data: {
    id: string;
    service: { service: string };
    date: string;
    time: string;
    pet: { imgProfile: string; name: string };
  };
  handleCancel: (id: string) => Promise<any>;
  isCancelable?: boolean;
}

const AppointCard: React.FC<AppointCardProps> = ({
  handleCancel,
  data,
  isCancelable,
}) => {
  const { user } = useUser();
  const LinkWhatsapp = `${PATHROUTES.WHATSAPP}?text=Hola,%20soy%20${user?.name}%20y%20me%20gustaria%20consultar%20respecto%20un%20turno`;

  const whatDayIs = (day: string): string => {
    const date = new Date(day);
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const result = whatDayIs(data?.date);
  return (
    <>
      {data && (
        <article
          id="card"
          className="flex flex-col p-5 m-auto shadow-xl gap-2 items-center cursor-default shadow-slate-300 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-detail">
            {data.service.service}
          </h3>
          <div className="flex flex-row gap-2 items-center">
            <p className="flex flex-row gap-1 items-center">
              <IoCalendarClearOutline />
              {result} {data.date}
            </p>
            <p className="text-orange-600 flex flex-row items-center">
              <IoTimeOutline />
              {data.time} hs
            </p>
          </div>
          <div className="items-center">
            <Image
              src={data.pet.imgProfile}
              alt="Imagen de Mascota"
              width={150}
              height={150}
            />
            <h4 className="text-detail">{data.pet.name}</h4>
          </div>
          <div className="flex flex-row justify-around gap-2">
            {isCancelable ? (
              <>
                <Link
                  aria-label="Boton para ir a whatsapp"
                  href={LinkWhatsapp}
                  className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                >
                  <IoLogoWhatsapp />
                </Link>
                <button
                  aria-label="Boton para cancelar turno"
                  onClick={() => handleCancel(data.id)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:scale-105"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <Link
                aria-label="Boton para calificar atención"
                className="p-2 m-auto rounded-lg bg-blue-500 text-white hover:bg-blue-700 hover:scale-105"
                href={PATHROUTES.CALIFICAR}
                target="_blank"
              >
                Calificar Servicio
              </Link>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default AppointCard;
