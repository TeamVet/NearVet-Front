import PATHROUTES from "@/helpers/path-routes";
import { TratmentsController } from "@/lib/Controllers/appointController";
import { fetchExistingPendients } from "@/lib/Services/appointService";
import { ClinicalExamination, Tratamiento } from "@/types/interfaces";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";

interface Pendientes {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface PetClinicaProps {
  idPet: string;
}
const PetClinical: React.FC<PetClinicaProps> = ({ idPet }) => {
  const [Pendientes, setPendientes] = useState<Pendientes[]>([]);
  const [Historial, setHistorial] = useState<ClinicalExamination[]>([]);

  const handleDownloadPdf = (idPet: any, his: ClinicalExamination) => {
    if (!idPet || !his) return;
    const doc = new jsPDF();
    // Posición x, y, width, height
    // Información del encabezado
    doc.setFontSize(16);
    doc.text("NearVet", 75, 20);
    doc.text("Historia clinica mascota ID:", 120, 20);
    doc.setFontSize(12);
    doc.text(`${idPet}`, 120, 30);
    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 60, 200, 60); // (x1, y1, x2, y2)
    doc.setFontSize(16);
    doc.text(`Amensis y situación de la mascota:`, 10, 70);
    doc.setFontSize(12);
    doc.text(`${his.anamnesis}`, 10, 80);
    doc.setLineWidth(0.2);
    doc.line(30, 85, 180, 85);
    doc.text("Parametro", 60, 90);
    doc.text(`Valor`, 100, 90);
    doc.text(`FC`, 60, 100);
    doc.text(`${his.fc}`, 100, 100);
    doc.text(`FR`, 60, 110);
    doc.text(`${his.fr}`, 100, 110);
    doc.text(`TLLC`, 60, 120);
    doc.text(`${his.tllc}`, 100, 120);

    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por utilizar el servicio", 10, 270);
    doc.text("NearVet S.A.", 150, 270);
    // Descargar el PDF
    doc.save(`Historia Clinica${his.id}_${his.petId}.pdf`);
  };
  useEffect(() => {
    const fetchPendientes = async () => {
      const responsePendings = await fetchExistingPendients(idPet);
      if (responsePendings.length > 0) {
        setPendientes(responsePendings);
      }
    };
    const fetchHistorial = async () => {
      const responseHistorial = await TratmentsController(idPet);

      if (responseHistorial.length > 0) {
        const updatedHistorial = responseHistorial
          .filter(
            (tratamiento: Tratamiento) =>
              tratamiento.clinicalExamination?.petId === idPet
          )
          .map((tratamiento: Tratamiento) => tratamiento.clinicalExamination);

        setHistorial((prevHistorial) => [
          ...prevHistorial,
          ...updatedHistorial,
        ]);
      }
    };

    if (idPet) {
      fetchPendientes();
      fetchHistorial();
    }
  }, [idPet]);

  return (
    <section className=" flex flex-col shadow-lg md:min-h-[99vh]">
      <article className="flex flex-col min-h-[20vh] max-h-[30vh] m-2 p-2 gap-2 items-center overflow-y-scroll">
        <h3 className="text-xl text-detail">Pendientes</h3>

        {Pendientes.length > 0 ? (
          Pendientes.map((Pendiente) => (
            <Link
              href={PATHROUTES.NEWAPPOINTMEN}
              className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg border border-red-400  text-center"
            >
              <p className="italic">{Pendiente.title}</p>
              <p>Fecha: {Pendiente.date}</p>
              <p>Descripcion: {Pendiente.description}</p>
              <small>Click para reservar turno</small>
            </Link>
          ))
        ) : (
          <p className="text-center text-sm p-2">
            No hay atenciones pendientes
          </p>
        )}
      </article>
      <article className="max-h-[80vh] flex flex-col m-2 p-2 gap-2 items-center text-center overflow-y-scroll">
        <h3 className=" text-xl text-detail">Historial</h3>
        {Historial.length > 0 ? (
          Historial.map((his) => (
            <div
              className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg hover:bg-slate-200"
              id={his.id}
              onClick={() => handleDownloadPdf(idPet, his)}
            >
              <p className="text-detail italic">{his.anamnesis}</p>
              <p>{his.diagnosis}</p>
              <small>Identificador: {his.id}</small>
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
