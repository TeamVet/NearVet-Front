"use client" //! Verificar si puede ser serverComponent
import { AppointsProps, Turnos } from "@/types/interfaces";
import CardCustom from "../cardCustom";
import { useEffect, useState } from "react";
import ButtonCustom from "../ButtonCustom";


const AppointsModule: React.FC<AppointsProps> = ({ user }) => {
  const [turnosRealizados, setTurnoRealizado] = useState<Turnos[]>([]);
  const [turnosActivos, setTurnoActivos] = useState<Turnos[]>([]);

  useEffect(() => {
    user?.turnos?.map((turno) => {
      if (turno.state === "realizado") {
        setTurnoRealizado([...turnosRealizados, turno]);
      } else {
        setTurnoActivos([...turnosActivos, turno]);
      }
    })
  }, [])

  // nuevo turno
  // -->cupones de descuento
  //--> Pagar el turno
  // Renderizar los turnos en pasados y nuevos
  // -->cancela turno
  //--> calificar turno posturno
  //--> comunicarse x whatsapp
  //TODO pagina para renderizar turnos activos
  return (<div className="flex flex-col  gap-4 justify-center">
    <h3 className="text-xl">Turnos</h3>


    {user && user.turnos ?
      (<>
        <th className="italic">Turnos Activos</th>
        <table className="text-center border m-5 cursor-default">
          <tr className="font-bold border">
            <td>Fecha</td>
            <td>Hora</td>
            <td>Estado</td>
            <td>Acciones</td>
          </tr>
          {turnosActivos.map((turno) => (
            <tr key={turno.id} >
              <td>{turno.date}</td>
              <td>{turno.hour}</td>
              <td>{turno.state}</td>
              <td className="flex flex-col gap-2">
                <button>Whatsapp</button>
                <button>Cancelar</button>
              </td>
            </tr>

          ))}
        </table>

        <th className="italic">Turnos Finalizados</th>
        <table className="text-center border m-5 cursor-default">
          <tr className="font-bold border">
            <td>Fecha</td>
            <td>Hora</td>
            <td>Estado</td>
            <td>Acciones</td>
          </tr>
          {turnosRealizados.map((turno) => (
            <tr key={turno.id} >
              <td>{turno.date}</td>
              <td>{turno.hour}</td>
              <td>{turno.state}</td>
              <td className="flex flex-col gap-2"><button>Calificar Atención</button></td>
            </tr>
          ))}

        </table></>)
      :
      (
        <>
          <p>No hay turnos agendados</p>
        </>
      )
    }
    <ButtonCustom text="Agendar Turno" onClick={() => { alert("Turno Agendado") }} />
  </div>);
};

export default AppointsModule;