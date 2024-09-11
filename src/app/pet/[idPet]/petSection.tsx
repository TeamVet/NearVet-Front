import { useState } from "react";
import {
  IoMedicalOutline,
  IoMedkitOutline,
  IoPulseOutline,
} from "react-icons/io5";
import { Mascota, Tratamiento, Medicamento, Vacuna } from "@/types/interfaces";

// Componente para las tarjetas reutilizables
const Tarjeta = ({
  title,
  description,
  extraInfo,
}: {
  title: string;
  description: string;
  extraInfo?: string;
}) => (
  <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2 shadow-md">
    <h3 className="text-detail font-semibold">{title}</h3>
    <p>{description}</p>
    {extraInfo && <p>{extraInfo}</p>}
  </div>
);

// Componente principal que maneja las secciones
const PetSection = (mascota: Mascota) => {
  const [selectedSection, setSelectedSection] = useState<string>("Vacunas");

  // Función para renderizar las tarjetas basado en la sección seleccionada
  const renderSectionContent: any = () => {
    switch (selectedSection) {
      case "Vacunas":
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {mascota.vacunas.map((vacuna: Vacuna) => (
              <Tarjeta
                key={vacuna.id}
                title={vacuna.nombre}
                description={`Aplicada el: ${vacuna.aplicada}`}
                extraInfo={`Próxima dosis: ${vacuna.proxima}`}
              />
            ))}
          </div>
        );
      case "Tratamientos":
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {mascota.tratamientos.map((tratamiento: Tratamiento) => (
              <Tarjeta
                key={tratamiento.pktratamiento}
                title={tratamiento.DescripcionTrat}
                description={`Observación: ${tratamiento.ObservacionTrat}`}
                extraInfo={`Frecuencia: ${tratamiento.frecuencia}`}
              />
            ))}
          </div>
        );
      case "Medicamentos":
        return (
          <div className="flex flex-wrap justify-center gap-2">
            {mascota.medicamentos.map((medicamento: Medicamento) => (
              <Tarjeta
                key={medicamento.pkprescripcion}
                title={medicamento.nombre}
                description={`Droga: ${medicamento.droga}`}
                extraInfo={`Aplicación: ${medicamento.aplicacion}`}
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
            selectedSection === "Vacunas"
              ? "bg-detail text-white"
              : "bg-slate-500 text-white"
          }`}
          onClick={() => setSelectedSection("Vacunas")}
        >
          <IoMedicalOutline />
          Vacunas
        </button>
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
