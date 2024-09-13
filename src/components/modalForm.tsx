interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setTurno: () => void;
  idPet: string;
  idUser: string;
}
import React, { useReducer, useEffect } from "react";
import ReusableForm from "./Form/FormCustom";
import {
  InputsAppointsVetClinical,
  InputsAppointsVetPendientes,
  InputsAppointsVetPrescipciones,
  InputsAppointsVetTratamiento,
  InputsFilesAppoints,
} from "./Form/InputsForms";
import {
  ExaminationController,
  NewFilesController,
  NewPendingController,
  NewPrescriptionController,
  NewTratmentsController,
} from "@/lib/Controllers/appointController";
import { consulta, InfoNotify } from "@/lib/toastyfy";
import { useServices } from "@/hooks/useServices";
import { newPendingService } from "@/lib/Services/appointService";

// Estados iniciales para el reducer
const initialState = {
  selectedSection: "Examinacion clinica",
  examinationDone: true,
  services: [],
  products: [],
};

// Reducer para gestionar los estados del modal
const modalReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_SECTION":
      return { ...state, selectedSection: action.payload };
    case "SET_EXAMINATION_DONE":
      return { ...state, examinationDone: action.payload };
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  setTurno,
  idPet,
  idUser,
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { services, products, loading, error } = useServices();

  useEffect(() => {
    if (services.length > 0) {
      dispatch({ type: "SET_SERVICES", payload: services });
    }
    if (products.length > 0) {
      dispatch({ type: "SET_PRODUCTS", payload: products });
    }
  }, [services, products]);
  if (!isOpen) return null;
  const handleOnClose = () =>
    consulta("Se perderán los cambios, ¿Desea continuar?", onClose);
  const handleOnEndTurn = () => {
    consulta("Se cerrará el turno, ¿Desea continuar?", () => {
      setTurno();
      InfoNotify("Turno finalizado");
      onClose();
    });
  };

  const NewInputsTratments = InputsAppointsVetTratamiento.map((input) => {
    if (input.name === "serviceId") {
      return { ...input, options: state.services };
    } else if (input.name === "productId") {
      return { ...input, options: state.products };
    }
    return input;
  });
  const NewInputsPrescriptions = InputsAppointsVetPrescipciones.map((input) => {
    if (input.name === "productId") {
      return { ...input, options: state.products };
    }
    return input;
  });
  const handleSubmitExamination = async (values: any) => {
    const formattedValues = {
      ...values,
      fc: Number(values.fc),
      fr: Number(values.fr),
      tllc: Number(values.tllc),
      temperature: Number(values.temperature),
      hydration: Number(values.hydration),
      petId: idPet,
      veterinarianId: idUser,
    };
    const response = await ExaminationController(formattedValues);
    if (response) {
      dispatch({ type: "SET_EXAMINATION_DONE", payload: true });
      localStorage.setItem("examination", JSON.stringify(response.id));
    }
  };
  const handleSubmitTratment = async (values: any) => {
    const treatmentValues = (({
      serviceId,
      description,
      observation,
      productId,
    }) => ({
      serviceId,
      description,
      observation,
      productId,
      Date: new Date(),
      price: 10000,
    }))(values);

    await NewTratmentsController(treatmentValues);
  };

  const handleSubmitPresciption = async (values: any) => {
    const prescriptionValues = (({ productId, description }) => ({
      productId,
      description,
      clinicalExaminationId: localStorage.getItem("examination"),
    }))(values);
    await NewPrescriptionController(values);
  };
  const handleSubmitPending = async (values: any) => {
    await NewPendingController(values);
  };
  const handleSubmitFiles = async (values: any) => {
    await NewFilesController(values);
  };

  const renderSectionContent = () => {
    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p>Error al cargar servicios: {error}</p>;

    switch (state.selectedSection) {
      case "Examinacion clinica":
        return (
          <ReusableForm
            formTitle="Examinación clínica"
            inputs={InputsAppointsVetClinical}
            onSubmit={handleSubmitExamination}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      case "Tratamiento":
        return state.examinationDone ? (
          <ReusableForm
            formTitle="Nuevo Tratamiento"
            inputs={NewInputsTratments}
            onSubmit={handleSubmitTratment}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        ) : (
          <p>Primero debes realizar la examinación clínica</p>
        );
      case "Prescripciones":
        return state.examinationDone ? (
          <ReusableForm
            formTitle="Nueva Prescripcion"
            inputs={NewInputsPrescriptions}
            onSubmit={handleSubmitPresciption}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        ) : (
          <p>Primero debes realizar la examinacion clinica</p>
        );
      case "Pendientes":
        return (
          <ReusableForm
            formTitle="Nuevo Pendiente"
            inputs={InputsAppointsVetPendientes}
            onSubmit={handleSubmitPending}
            displayRow
            notLogo
            submitButtonLabel="Guardar"
          />
        );
      case "Archivos":
        return state.examinationDone ? (
          <ReusableForm
            formTitle="Archivos del turno"
            inputs={InputsFilesAppoints}
            onSubmit={handleSubmitFiles}
            displayRow
            notLogo
            submitButtonLabel="Cargar Archivos"
          />
        ) : (
          <p>Primero debes realizar la examinacion clinica</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 flex flex-col min-w-[80vw] max-w-[80vw] min-h-[90vh] max-h-[90vh]">
        <nav className="grid grid-flow-row md:grid-flow-col text-center">
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Examinacion clinica"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Examinacion clinica" })
            }
          >
            Examinación
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Tratamiento"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Tratamiento" })
            }
          >
            Tratamiento
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Prescripciones"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Prescripciones" })
            }
          >
            Prescripciones
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Archivos"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Archivos" })
            }
          >
            Archivos
          </button>
          <button
            className={`py-2 px-4 text-white ${
              state.selectedSection === "Pendientes"
                ? "bg-detail"
                : "bg-slate-500"
            }`}
            onClick={() =>
              dispatch({ type: "SET_SECTION", payload: "Pendientes" })
            }
          >
            Pendientes
          </button>
        </nav>
        <article className="flex flex-col items-center mt-4 overflow-y-scroll relative">
          {renderSectionContent()}
        </article>
        <div className="absolute bottom-[8%] right-[13%] flex flex-row gap-2">
          <button
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
            onClick={handleOnClose}
          >
            Cerrar Turno
          </button>
          <button
            className="bg-detail text-white p-2 rounded-lg hover:bg-green-600"
            onClick={handleOnEndTurn}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
