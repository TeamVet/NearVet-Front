import PATHROUTES from "@/helpers/path-routes";
import { TratmentsController } from "@/lib/Controllers/appointController";
import {
  fetchAppointIdService,
  fetchExistingPendients,
} from "@/lib/Services/appointService";
import { ClinicalExamination, Mascota, Tratamiento } from "@/types/interfaces";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import { fetchPetIdController } from "@/lib/Controllers/petController";
import { useUser } from "@/context/UserContext";

interface Pendientes {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface PetClinicaProps {
  idPet: string;
  pet?: Mascota;
}
const PetClinical: React.FC<PetClinicaProps> = ({ idPet, pet }) => {
  const [Pendientes, setPendientes] = useState<Pendientes[]>([]);
  const [Historial, setHistorial] = useState<ClinicalExamination[]>([]);

  const handleDownloadPdf = (
    idPet: any,
    his: ClinicalExamination,
    pet?: Mascota
  ) => {
    if (!idPet || !his || !pet) return;
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(16);
    doc.text("NearVet", 75, 20);
    doc.setFontSize(14);
    doc.text("Clínica de Pequeños Animales", 80, 30);
    doc.text(
      "La misma reviste caracter provisorio y podria no contener todos los datos del examen",
      60,
      40
    );

    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 50, 200, 50);

    // Información de la mascota
    doc.setFontSize(12);
    doc.text(`Fecha de descarga: ${new Date().toLocaleDateString()}`, 10, 60);
    doc.text(`Veterinario a cargo: ___________`, 120, 60);

    doc.text(`Datos del paciente`, 10, 80);
    doc.text(`Especie: ${pet.specie.specie}`, 10, 90);
    doc.text(`Raza: ${pet.race.race}`, 60, 90);
    doc.text(`Sexo: ${pet.sex.sex}`, 120, 90);
    doc.text(`Edad: ${calculateAge(pet.birthdate)}`, 10, 100);
    doc.text(`Color: ${pet.color}`, 60, 100);
    doc.text(`Nombre de la mascota: ${pet.name}`, 120, 100);

    // Motivo de consulta
    doc.setFontSize(12);
    doc.text("Motivo de consulta:", 10, 110);
    doc.text(`${his.anamnesis}`, 10, 120);

    // Parámetros clínicos en tabla
    doc.setFontSize(14);
    doc.text("Parámetros Clínicos:", 10, 130);
    doc.setFontSize(12);
    doc.text("Parámetro", 60, 140);
    doc.text("Valor", 100, 140);

    // Parámetros de la mascota
    doc.text("FC", 60, 150);
    doc.text(`${his.fc} lpm`, 100, 150);
    doc.text("FR", 60, 160);
    doc.text(`${his.fr} cpm`, 100, 160);
    doc.text("TLLC", 60, 170);
    doc.text(`${his.tllc} s`, 100, 170);
    doc.text("Temperatura", 60, 180);
    doc.text(`${his.temperature} °C`, 100, 180);
    doc.text("Hidratación", 60, 190);
    doc.text(`${his.hydration}%`, 100, 190);

    // Línea separadora final
    doc.setLineWidth(0.2);
    doc.line(10, 200, 200, 200);

    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por utilizar el servicio", 10, 270);
    doc.text("NearVet S.A.", 150, 270);

    // Descargar el PDF
    doc.save(`Historia_Clinica_${his.id}_${his.petId}.pdf`);
  };

  // Función auxiliar para calcular la edad
  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const ageDifMs = Date.now() - birth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
              key={Pendiente.id}
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
              key={his.id}
              className="p-2 shadow-lg flex flex-col cursor-pointer rounded-lg hover:bg-slate-200"
              onClick={() => handleDownloadPdf(idPet, his, pet)}
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
