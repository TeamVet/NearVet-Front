import React from "react";
import TableCustom from "../TableCustom";

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
  return (
    <section className="shadow-lg p-5 m-auto w-2/3 text-center">
      <TableCustom
        title="Lista de Pacientes"
        titulos={["Mascota", "Dueño", "Telefono", "Email", "Accion"]}
        datos={MockDatos}
      />
    </section>
  );
};

export default PatientsListModule;
