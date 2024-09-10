import React, { useEffect, useState } from "react";
import ReusableForm from "./Form/FormCustom";
import {
  InputsAppointsVetClinical,
  InputsAppointsVetPendientes,
  InputsAppointsVetPrescipciones,
  InputsAppointsVetTratamiento,
} from "./Form/InputsForms";
import { consulta, InfoNotify } from "@/lib/toastyfy";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedSection, setSelectedSection] = useState<string>(
    "Examinacion clinica"
  );
  if (!isOpen) return null;

  const handleOnClose = () => {
    consulta("Se perderan los cambios, ¿Desea continuar?", onClose);
  };
  const handleOnEndTurn = () => {
    consulta("Se cerrará el turno, ¿Desea continuar?", () => {
      InfoNotify("Turno finalizado");
      onClose();
    });
  };

  const renderSectionContent: any = () => {
    switch (selectedSection) {
      case "Examinacion clinica":
        return (
          <ReusableForm
            formTitle="Examinacion clinica"
            inputs={InputsAppointsVetClinical}
            onSubmit={handleSubmit}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      case "Tratamiento":
        return (
          <ReusableForm
            formTitle="Nuevo Tratamiento"
            inputs={InputsAppointsVetTratamiento}
            onSubmit={handleSubmit}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      case "Prescripciones":
        return (
          <ReusableForm
            formTitle="Nueva Prescripcion"
            inputs={InputsAppointsVetPrescipciones}
            onSubmit={handleSubmit}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      case "Pendientes":
        return (
          <ReusableForm
            formTitle="Nuevo Pendiente"
            inputs={InputsAppointsVetPendientes}
            onSubmit={handleSubmit}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {};
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-20 flex items-center justify-center"
      onClick={handleOnClose}
    >
      <div className="bg-white rounded-lg p-4 flex flex-col min-w-[80vw] max-w-[80vw] min-h-[90vh] max-h-[90vh] ">
        <nav className="grid grid-flow-row md:grid-flow-col text-center ">
          <button
            className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
              selectedSection === "Examinacion clinica"
                ? "bg-detail text-white"
                : "bg-slate-500 text-white"
            }`}
            onClick={() => setSelectedSection("Examinacion clinica")}
          >
            Examinacion
          </button>
          <button
            className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
              selectedSection === "Tratamiento"
                ? "bg-detail text-white"
                : "bg-slate-500 text-white"
            }`}
            onClick={() => setSelectedSection("Tratamiento")}
          >
            Tratamiento
          </button>
          <button
            className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
              selectedSection === "Prescripciones"
                ? "bg-detail text-white"
                : "bg-slate-500 text-white"
            }`}
            onClick={() => setSelectedSection("Prescripciones")}
          >
            Prescripciones
          </button>
          <button
            className={`py-2 px-2 md:px-4 border flex justify-center items-center md:gap-2 ${
              selectedSection === "Pendientes"
                ? "bg-detail text-white"
                : "bg-slate-500 text-white"
            }`}
            onClick={() => setSelectedSection("Pendientes")}
          >
            Pendientes
          </button>
        </nav>
        <article className="flex flex-col items-center mt-4 overflow-y-scroll relative">
          {renderSectionContent()}
        </article>
        <div className="absolute bottom-[8%] right-[13%] flex flex-row gap-2">
          <button
            className="bg-red-600 p-2 rounded-lg text-white hover:scale-105"
            onClick={handleOnClose}
          >
            Cerrar sin guardar
          </button>
          <button
            className="bg-detail p-2 rounded-lg text-white hover:scale-105"
            onClick={handleOnEndTurn}
          >
            Finalizar turno
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
