"use client";
import {
  Inject,
  ScheduleComponent,
  ViewDirective,
  Day,
  Week,
  Month,
  ViewsDirective,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState } from "react";
import { loadCldr, registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVJzWmFZfVpgc19FZ1ZVQ2Y/P1ZhSXxXdkxjUX5Xc3NRQWVUWUY="
);
import frNumberData from "@syncfusion/ej2-cldr-data/main/es-AR/numbers.json";
import frtimeZoneData from "@syncfusion/ej2-cldr-data/main/es-AR/timeZoneNames.json";
import frGregorian from "@syncfusion/ej2-cldr-data/main/es-AR/ca-gregorian.json";
import frNumberingSystem from "@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json";

loadCldr(frNumberData, frtimeZoneData, frGregorian, frNumberingSystem);

const turnos = [
  {
    id: 1,
    Subject: "Turno 2",
    description: "Turno de prueba",
    StartTime: new Date(2024, 8, 8, 9, 0), ///anio, -mes, dia, hora, minutos
    EndTime: new Date(2024, 8, 8, 10, 0),
    isAllDay: false,
  },
  {
    id: 1,
    Subject: "Turno 10",
    StartTime: new Date(2024, 8, 13, 9, 0),
    EndTime: new Date(2024, 8, 13, 10, 0),
    isAllDay: false,
  },
];
const eventTemplate = (props: any) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <strong>{props.Subject}</strong>
      </div>
      <div>{props.description}</div>
    </div>
  );
};
const CalendarioModule = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      const response = await fetch("");
    };
    setTurnos(turnos);
  }, []);

  return (
    <div>
      <h3 className="text-xl text-detail">Calendario</h3>
      <section className="shadow-lg p-5 m-auto w-2/3 flex flex-col gap-2 my-2 cursor-default">
        <ScheduleComponent
          eventSettings={{
            dataSource: turnos,
            allowAdding: false,
            allowDeleting: false,
            allowEditing: false,
            template: eventTemplate,
          }}
          startHour="06:00"
          endHour="23:00"
          currentView="Day"
          locale="es-AR"
        >
          <ViewsDirective>
            <ViewDirective option="Day" displayName="Dia" />
            <ViewDirective option="Agenda" />
            <ViewDirective option="Week" displayName="Semana" />
            <ViewDirective option="Month" displayName="Mes" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      </section>
    </div>
  );
};

export default CalendarioModule;

{
  /* <iframe
  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FArgentina%2FCordoba&bgcolor=%23ffffff&mode=WEEK&hl=es_419&src=dGVhbWh2ZXRAZ21haWwuY29t&src=ZW4uYXIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043"
  className="border-none w-[90vw] md:w-[60vw] m-auto h-[80vh]"
></iframe> */
}
