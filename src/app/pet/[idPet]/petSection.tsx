import { Mascota } from "@/types/interfaces";
import { useState } from "react";
import {
  IoMedicalOutline,
  IoMedkitOutline,
  IoPulseOutline,
} from "react-icons/io5";

const PetSection = (mascota: Mascota) => {
  const [select, setSelect] = useState<string>("");
  return (
    <section>
      <nav className="grid grid-flow-col text-center">
        <button
          className={`bg-slate-500 text-white py-2 border flex flex-row justify-center items-center gap-2 ${
            select === "Vacunas" && "bg-detail"
          }`}
          onClick={() => setSelect("Vacunas")}
        >
          <IoMedicalOutline />
          Vacunas
        </button>
        <button
          className={`bg-slate-500 text-white py-2 border flex flex-row justify-center items-center gap-2 ${
            select === "Tratamientos" && "bg-detail"
          }`}
          onClick={() => setSelect("Tratamientos")}
        >
          <IoPulseOutline />
          Tratamientos
        </button>
        <button
          className={`bg-slate-500 text-white py-2 border flex flex-row justify-center items-center gap-2 ${
            select === "Medicamentos" && "bg-detail"
          }`}
          onClick={() => setSelect("Medicamentos")}
        >
          <IoMedkitOutline />
          Medicamentos
        </button>
      </nav>
      {select === "Vacunas" && (
        <article className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-detail bg-white w-full text-center ">
            Vacunas
          </h3>
          <div className="flex flex-wrap justify-center gap-1">
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">Nombre de vacuna</h3>
              <div className="flex flex-row gap-1">
                <p>Aplicada el:</p>
                <p>12/12/2021</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Proxima dosis</p>
                <p>12/12/2022</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">Nombre de vacuna</h3>
              <div className="flex flex-row gap-1">
                <p>Aplicada el:</p>
                <p>12/12/2021</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Proxima dosis</p>
                <p>12/12/2022</p>
              </div>
            </div>
          </div>
        </article>
      )}
      {select === "Tratamientos" && (
        <article className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-detail bg-white w-full text-center ">
            Tratamientos
          </h3>
          <div className="flex flex-wrap justify-center gap-1">
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">
                Nombre del tratamiento
              </h3>
              <div className="flex flex-row gap-1">
                <p>Descripcion del tratamiento</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Frecuencia</p>
                <p>cada 8hs</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">
                Nombre del tratamiento
              </h3>
              <div className="flex flex-row gap-1">
                <p>Descripcion del tratamiento</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Frecuencia</p>
                <p>cada 8hs</p>
              </div>
            </div>
          </div>
        </article>
      )}
      {select === "Medicamentos" && (
        <article className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-detail bg-white w-full text-center ">
            Medicamentos
          </h3>
          <div className="flex flex-wrap justify-center gap-1">
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">
                Nombre del Medicamento
              </h3>
              <div className="flex flex-row gap-1">
                <p>Droga</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Aplicacion:</p>
                <p>oral o en la comida</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2 text-center items-center bg-white rounded m-2">
              <h3 className="text-detail font-semibold">
                Nombre del Medicamento
              </h3>
              <div className="flex flex-row gap-1">
                <p>Droga</p>
              </div>
              <div className="flex flex-row gap-1">
                <p>Aplicacion:</p>
                <p>oral o en la comida</p>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default PetSection;
