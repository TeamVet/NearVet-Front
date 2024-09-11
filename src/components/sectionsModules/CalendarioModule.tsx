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
  "MzQ2NTg0MkAzMjM2MmUzMDJlMzBaQzRISjI5OS9WQmJMdG1DNW1aaDlEQURhdjhFQlJxTzV4OE52YWUzdFZRPQ==;Mgo+DSMBaFt5QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRbQlRjQH5ad0RmXXZYc3U=;Mgo+DSMBPh8sVXJyS0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9nSXdTf0VqWH5bdXRVT2k=;ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adkxjUH5fdXFVRGVZ;NRAiBiAaIQQuGjN/V0B+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3pTf0VqWXZfcXFQRmRdUA==;MzQ2NTg0N0AzMjM2MmUzMDJlMzBSdTU1bTZHZWNJaC9Ra1JkTE5MUTRyMk9pRmF4STZuRFFJOE03bUM4MHlRPQ==;MzQ2NTg0OEAzMjM2MmUzMDJlMzBSRktuTGlwcUlMZThFK0dhaGs5TXdqOEtDT01tQUorNkhkaWF0NGVVU1hNPQ==;Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adkxjUH5fdXFUT2hf;MzQ2NTg1MEAzMjM2MmUzMDJlMzBvSXdGeGFWNTVkQmhXZ0hBOHg1TUd2VXlNREVxd01IMlhOaVNPU0I2RFBVPQ==;MzQ2NTg1MUAzMjM2MmUzMDJlMzBkUHByWklKNUc2Sm5malc3NVRvTUlyT3I1Y1NrMTJrRCtjeFBwYlFHQVFRPQ=="
);
import frNumberData from "@syncfusion/ej2-cldr-data/main/es-AR/numbers.json";
import frtimeZoneData from "@syncfusion/ej2-cldr-data/main/es-AR/timeZoneNames.json";
import frGregorian from "@syncfusion/ej2-cldr-data/main/es-AR/ca-gregorian.json";
import frNumberingSystem from "@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json";
import { useUser } from "@/context/UserContext";
import { fetchTurnosService } from "@/lib/authService";

loadCldr(frNumberData, frtimeZoneData, frGregorian, frNumberingSystem);

const turnos = [
  {
    id: 1,
    Subject: "Rayos X - Javier",
    description: "Mascota: Firu - Observaciones: Sin observaciones",
    StartTime: new Date(2024, 8, 9, 9, 0), ///anio, -mes, dia, hora, minutos
    EndTime: new Date(2024, 8, 9, 10, 0),
    isAllDay: false,
  },
  {
    id: 2,
    Subject: "Castracion - Laura",
    description: "Mascota: Lara - Observaciones: Sin observaciones",
    StartTime: new Date(2024, 8, 9, 13, 0),
    EndTime: new Date(2024, 8, 9, 14, 0),
    isAllDay: false,
  },
  {
    id: 3,
    Subject: "Peluqueria - Juan",
    description: "Mascota: Pancho - Observaciones: No le gusta el secador",
    StartTime: new Date(2024, 8, 9, 11, 0),
    EndTime: new Date(2024, 8, 9, 12, 0),
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
  const [turnosBackend, setTurnos] = useState([]);
  const { user } = useUser();
  const today = new Date("2024-09-12");
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!user?.id) return;
      const response = await fetchTurnosService(user.id, today);
      console.log(response);
      if (response.length > 0) setTurnos(response);
      //aca hariamos el llamado al backend para traer los turnos de momento mock
    };
    if (user?.id) {
      fetchTurnos();
    }
  }, []);

  return (
    <div>
      <h3 className="text-xl text-detail">Calendario</h3>
      <section className="shadow-lg p-5 m-auto w-full md:w-4/5 flex flex-col gap-2 my-2 cursor-default">
        <ScheduleComponent
          eventSettings={{
            dataSource: turnosBackend,
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
