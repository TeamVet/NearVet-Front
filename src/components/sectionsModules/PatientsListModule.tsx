import React, { useEffect, useState } from "react";
import TableCustom from "../TableCustom";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";

const MockDatos = [
  {
    id: 1,
    mascota: "Lara",
    user: "Luis",
    phone: 123456789,
    email: "luis@luis",
  },
  {
    id: 1,
    mascota: "Pufi",
    user: "Luis",
    phone: 123456789,
    email: "luis@luis",
  },
  {
    id: 1,
    mascota: "Pancho",
    user: "Luis",
    phone: 123456789,
    email: "luis@luis",
  },
];

const PatientsListModule = () => {
  const [patientsList, setPatientsList] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      startLoading();
      const response = await fetch(
        `https://nearvet-latest.onrender.com/users?page=1&limit=100`
      );
      const data = await response.json();
      if (!data || data === "undefined") return;
      console.log(data);
      setPatientsList(data);
    } finally {
      stopLoading();
    }
  };
  return (
    <section className="shadow-lg p-5 m-auto w-2/3 text-center">
      {loading && <Loading />}
      <TableCustom
        title="Lista de Pacientes"
        titulos={["Mascota", "Dueño", "Telefono", "Email", "Accion"]}
        datos={patientsList}
      />
    </section>
  );
};

export default PatientsListModule;
