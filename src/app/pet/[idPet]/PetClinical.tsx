import PATHROUTES from "@/helpers/path-routes";
import Link from "next/link";

interface PetClinicaProps {
  Pendientes: {
    id: string;
    title: string;
    date: string;
    description: string;
  }[];
  Historial: {
    id: string;
    title: string;
    date: string;
    description: string;
  }[];
}
const PetClinical: React.FC<PetClinicaProps> = (petClinicaProps) => {
  const { Pendientes, Historial } = petClinicaProps;
  return (
    <section className=" flex flex-col shadow-lg md:min-h-[99vh]">
      <article className="flex flex-col min-h-[20vh] max-h-[20vh] m-2 p-2  items-center overflow-y-scroll">
        <h3 className="text-xl text-detail">Pendientes</h3>

        {Pendientes.length > 0 ? (
          Pendientes.map((Pendiente) => (
            <Link
              href={PATHROUTES.NEWAPPOINTMEN}
              className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg bg-red-300 hover:bg-slate-200 text-center"
            >
              <p className="italic">{Pendiente.title}</p>
              <p>Fecha: {Pendiente.date}</p>
              <p>{Pendiente.description}</p>
              <small>Click para agendar turno</small>
            </Link>
          ))
        ) : (
          <p>No hay atenciones pendientes</p>
        )}
      </article>
      <article className="min-h-[80%] flex flex-col m-2 p-2 items-center text-center">
        <h3 className=" text-xl text-detail">Historial</h3>
        {Historial.length > 0 ? (
          Historial.map((his) => (
            <div
              className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg hover:bg-slate-200"
              id={his.id}
            >
              <p className="text-detail italic">{his.title}</p>
              <p>{his.description}</p>
              <p>Fecha: {his.date}</p>
              <small>Click para descargar</small>
            </div>
          ))
        ) : (
          <p>No hay visitas al veterinario todavia</p>
        )}
      </article>
    </section>
  );
};

export default PetClinical;
