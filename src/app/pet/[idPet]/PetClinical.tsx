const PetClinical: React.FC = () => {
  return (
    <section className=" flex flex-col shadow-lg md:min-h-[99vh]">
      <article className="flex flex-col max-h-[20vh] m-2 p-2  items-center overflow-y-scroll">
        <h3 className="text-xl text-detail">Pendientes</h3>
        <div className="p-2 shadow-lg">
          <p className="text-red-400">
            Tiene que vacunarse el 01-01-2022 para la polio
          </p>
        </div>
      </article>
      <article className="min-h-[80%] flex flex-col m-2 p-2 items-center">
        <h3 className=" text-xl text-detail">Historial</h3>
        <div className="p-2 shadow-lg flex flex-col">
          <p className="">Consulta el pasado 20/2/2023</p>
          <p>Enfermedad: Parvovirus</p>
          <p>Frecuencia: 1 vez por semana</p>
        </div>
        <div className="p-2 shadow-lg flex flex-col">
          <p className="">Consulta el pasado 20/2/2023</p>
          <p>Enfermedad: Parvovirus</p>
          <p>Frecuencia: 1 vez por semana</p>
        </div>
        <div className="p-2 shadow-lg flex flex-col">
          <p className="">Consulta el pasado 20/2/2023</p>
          <p>Enfermedad: Parvovirus</p>
          <p>Frecuencia: 1 vez por semana</p>
        </div>
      </article>
    </section>
  );
};

export default PetClinical;
