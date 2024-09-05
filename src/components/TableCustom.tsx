import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { Turnos } from "@/types/interfaces";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

interface TableCustomProps {
  title: string;
  titulos: string[];
  datos: Turnos[];
  isCancelable?: boolean;
  onClick?: (id: string) => Promise<any>;
}

const TableCustom: React.FC<TableCustomProps> = ({
  title,
  titulos,
  datos,
  isCancelable,
  onClick,
}) => {
  const { user } = useUser();
  const LinkWhatsapp = `${PATHROUTES.WHATSAPP}?text=Hola,%20soy%20${user?.name}%20y%20me%20gustaria%20consultar%20respecto%20un%20turno`;

  return (
    <div className="m-auto max-w-[95%] md:min-w-[80%] md:max-w-[80%] lg:min-w-[70%] lg:max-w-[70%]">
      <h2 className="text-xl italic my-4 font-semibold text-detail text-center">
        {title}
      </h2>

      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              {titulos.map((titulo) => (
                <th key={titulo}>{titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.date}</td>
                <td>{dato.time}</td>
                <td>{dato.service.service}</td>
                <td>{dato.state.state}</td>
                <td>{dato.messageUser}</td>
                <td className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center py-2">
                  {isCancelable ? (
                    <>
                      <Link
                        href={LinkWhatsapp}
                        aria-label="Boton para ir a whatsapp"
                        target="_blank"
                        className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                      >
                        <IoLogoWhatsapp />
                      </Link>
                      <button
                        aria-label="Boton para cancelar turno"
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 hover:scale-105"
                        onClick={() => {
                          if (onClick) {
                            onClick(dato.id);
                          }
                        }}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <Link
                      aria-label="Boton para calificar atención"
                      className="p-2 m-auto rounded-lg bg-blue-500 text-white hover:bg-blue-700 hover:scale-105"
                      href={PATHROUTES.CALIFICAR}
                      target="_blank"
                    >
                      Calificar Servicio
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        {datos.map((dato) => (
          <div key={dato.id} className="border-2 mb-4 p-4 rounded-lg shadow-sm">
            <div className="flex justify-evenly">
              <span className="font-semibold">Fecha:</span>
              <span>{dato.date}</span>
            </div>
            <div className="flex justify-evenly">
              <span className="font-semibold">Hora:</span>
              <span>{dato.time}</span>
            </div>
            <div className="flex justify-evenly">
              <span className="font-semibold">Servicio:</span>
              <span>{dato.service.service}</span>
            </div>
            <div className="flex justify-evenly">
              <span className="font-semibold">Estado:</span>
              <span>{dato.state.state}</span>
            </div>
            <div className="flex justify-evenly">
              <span className="font-semibold">Mensaje:</span>
              <span>{dato.messageUser}</span>
            </div>
            <div className="mt-4 flex gap-4 justify-evenly">
              {isCancelable ? (
                <>
                  <Link
                    href={LinkWhatsapp}
                    aria-label="Boton para ir a whatsapp"
                    target="_blank"
                    className="rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                  <button
                    aria-label="Boton para cancelar turno"
                    className="w-[50%] rounded-lg bg-red-500 text-white hover:bg-red-700 hover:scale-105"
                    onClick={() => {
                      if (onClick) {
                        onClick(dato.id);
                      }
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <Link
                  aria-label="Boton para calificar atención"
                  className="size-[50%] py-2 m-auto rounded-lg bg-blue-500 text-white hover:bg-blue-700 hover:scale-105"
                  href={PATHROUTES.CALIFICAR}
                  target="_blank"
                >
                  Calificar Servicio
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableCustom;
