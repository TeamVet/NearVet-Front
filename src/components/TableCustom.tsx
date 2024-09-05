import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import { Turnos } from "@/types/interfaces";
import Link from "next/link";
import { MouseEventHandler } from "react";
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

  return (
    <table className="table cursor-default">
      <caption className="text-xl italic m-2 font-semibold text-detail">
        {title}
      </caption>
      <thead className=" ">
        <tr>
          {titulos.map((titulo) => (
            <th key={titulo}>{titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((dato) => (
          <tr key={dato.id}>
            <td>{dato.date} </td>
            <td>{dato.time}</td>
            <td>{dato.state.state}</td>
            <td className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center py-2  border-l-0">
              {isCancelable ? (
                <>
                  <Link
                    href={PATHROUTES.WHATSAPP}
                    aria-label="Boton para ir a whatsapp"
                    target="_blank"
                    className="rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                  <button
                    aria-label="Boton para cancelar turno"
                    className=" p-2 m-auto rounded-lg bg-red-500 text-white hover:bg-red-700 hover:scale-105"
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
                <>
                  <button
                    aria-label="Boton para calificar atención"
                    className=" p-2 m-auto rounded-lg bg-blue-500 text-white hover:bg-blue-700 hover:scale-105"
                  >
                    Calificar Atención
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustom;
