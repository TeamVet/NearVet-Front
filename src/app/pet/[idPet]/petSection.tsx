import { useEffect, useState } from "react";
import {
  IoMedicalOutline,
  IoMedkitOutline,
  IoPulseOutline,
} from "react-icons/io5";
import { Tratamiento, Medicamento, Vacuna } from "@/types/interfaces";
import { TratmentsController } from "@/lib/Controllers/appointController";

const Tarjeta = ({
  title,
  description,
  extraInfo,
  fecha,
}: {
  title: string;
  description: string;
  extraInfo?: string;
  fecha: string;
}) => (
  <div className="flex flex-col w-1/3 gap-2 p-2 text-center items-center bg-white rounded m-2 shadow-md cursor-default">
    <h3 className="text-detail font-semibold">{title}</h3>
    {extraInfo && <p>{extraInfo}</p>}
    <small>
      {description} - {fecha}
    </small>
  </div>
);
interface PetSectionProps {
  idPet: string;
}
const PetSection: React.FC<PetSectionProps> = ({ idPet }) => {
  const [selectedSection, setSelectedSection] = useState<string>("Vacunas");

  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  console.log(tratamientos);
  useEffect(() => {
    const fetchTratamientos = async () => {
      const responseTratamiento = await TratmentsController(idPet);
      console.log(responseTratamiento);
      if (responseTratamiento.length > 0) {
        responseTratamiento.map((tratamiento: Tratamiento) => {
          tratamiento.clinicalExamination.petId === idPet;
          setTratamientos((prevHistorial) => [...prevHistorial, tratamiento]);
        });
      }
      responseTratamiento.map((tratamiento: Tratamiento) => {
        tratamiento.applicationProducts.map((product: any) => {
          setMedicamentos(product);
        });
      });
    };

    if (idPet) {
      fetchTratamientos();
    }
  }, [idPet]);

  const renderSectionContent: any = () => {
    switch (selectedSection) {
      case "Tratamientos":
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {tratamientos.map((tratamiento: Tratamiento) => (
              <Tarjeta
                key={tratamiento.id}
                title={tratamiento.description}
                description={`Observación: ${tratamiento.observation}`}
                extraInfo={`Servicio: ${tratamiento.service.service}`}
                fecha={
                  "Fecha: "
                  // + tratamiento.clinicalExamination.date
                }
              />
            ))}
          </div>
        );
      case "Medicamentos":
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {medicamentos.map((medicamento: Medicamento) => (
              <Tarjeta
                key={medicamento.pkprescripcion}
                title={medicamento.nombre}
                description={`Droga: ${medicamento.droga}`}
                extraInfo={`Aplicación: ${medicamento.aplicacion}`}
                fecha=""
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="shadow-lg md:min-h-[99vh]">
      <nav className="grid grid-flow-col text-center">
        <button
          className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
            selectedSection === "Tratamientos"
              ? "bg-detail text-white"
              : "bg-slate-500 text-white"
          }`}
          onClick={() => setSelectedSection("Tratamientos")}
        >
          <IoPulseOutline />
          Tratamientos
        </button>
        <button
          className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
            selectedSection === "Medicamentos"
              ? "bg-detail text-white"
              : "bg-slate-500 text-white"
          }`}
          onClick={() => setSelectedSection("Medicamentos")}
        >
          <IoMedkitOutline />
          Medicamentos
        </button>
      </nav>

      <article className="flex flex-col items-center mt-4">
        {renderSectionContent()}
      </article>
    </section>
  );
};

export default PetSection;
