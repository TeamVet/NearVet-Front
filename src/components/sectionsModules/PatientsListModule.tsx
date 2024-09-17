import React, { useEffect, useState } from "react";
import TableCustom from "../TableCustom";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
const PatientsListModule = () => {
  const URL_PATIENTS = process.env.NEXT_PUBLIC_PATIENTS;
  const [patientsList, setPatientsList] = useState([]);
  const [page, setPage] = useState(1);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      startLoading();
      const response = await fetch(`${URL_PATIENTS}${page}&limit=100`);
      const data = await response.json();
      if (!data || data === "undefined") return;
      setPatientsList(data);
    } finally {
      stopLoading();
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  return (
    <section className="shadow-lg p-5 m-auto  text-center">
      {loading && <Loading />}
      <div className="flex flex-row justify-evenly min-w-[80vw] mx-auto items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`p-2 bg-detail text-white rounded-lg ${
            page === 1 ? "cursor-default opacity-0" : ""
          }`}
        >
          Anterior Página
        </button>
        <p className="text-2xl text-detail ">{page}</p>
        <button
          onClick={handleNextPage}
          className="p-2 bg-detail text-white rounded-lg"
        >
          Siguiente Página
        </button>
      </div>

      {patientsList.length > 0 ? (
        <TableCustom
          title="Lista de Pacientes"
          titulos={["Mascota", "Dueño", "Telefono", "Email", "Accion"]}
          datos={patientsList}
        />
      ) : (
        <TableCustom
          title="Lista de Pacientes"
          titulos={["Mascota", "Dueño", "Telefono", "Email", "Accion"]}
        />
      )}
    </section>
  );
};

export default PatientsListModule;
