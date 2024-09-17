"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCutSharp, IoMedicalSharp } from "react-icons/io5";
import jsPDF from "jspdf";
import { useUser } from "@/context/UserContext";
import { BillsGeneralService, BillsService } from "@/lib/Services/userService";
import { Bill } from "@/types/interfaces";

const BillModule: React.FC = () => {
  const [facturas, setFacturas] = useState<Bill[]>([]);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const startDay = new Date(user?.startDate as Date);
  const endDay = new Date();

  useEffect(() => {
    const fetchBills = async () => {
      if (!user) return;
      const formattedStartDay = startDay.toISOString().split("T")[0];
      const formattedEndDay = endDay.toISOString().split("T")[0];
      const responseBills = await BillsService(
        page,
        user.id as string,
        formattedStartDay,
        formattedEndDay
      );
      if (responseBills.length > 0) {
        setFacturas(responseBills);
      }
    };

    if (user) {
      fetchBills();
    }
  }, [user, page, startDay, endDay]);

  const handleDownloadPdf = (factura: Bill) => {
    const doc = new jsPDF();
    doc.addImage("logo.png", "PNG", 10, 10, 40, 40); // Posición x, y, width, height del logo
    // Información del encabezado
    doc.setFontSize(16);
    doc.text("NearVet", 75, 20);
    doc.setFontSize(12);
    doc.text("Dirección: Calle Falsa 123, Posadas.", 120, 20);
    doc.text("CUIL: 20-12345678-9", 60, 30);
    doc.text(`Fecha Inicio de Actividad:`, 60, 40);
    doc.text(`01-01-2024 ${factura.date}`, 60, 50);
    doc.text(`Fecha compra: ${factura.date}`, 130, 50);
    doc.text(`Nro de Transacción: 000-${factura.id}`, 130, 30);
    doc.text(`Consumidor: ${factura.user}`, 130, 40);
    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 60, 200, 60); // (x1, y1, x2, y2)
    // Detalles de la factura
    doc.setFontSize(16);
    doc.text(
      `Factura de Servicio y Servicio en NearVet tipo: ${factura.service.service}`,
      10,
      70
    );
    // Datos de la factura
    doc.setFontSize(12);
    doc.text("Descripción", 40, 80);
    doc.text("Cantidad", 90, 80);
    doc.text("Precio", 150, 80);
    doc.setLineWidth(0.2);
    doc.line(30, 82, 180, 82);
    doc.text(`${factura.service.service}`, 45, 90);
    doc.text("1", 95, 90);
    doc.text(`${factura.subtotal}`, 155, 90);
    doc.text(`Precio total: $${factura.total}`, 150, 110);
    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por su compra lo esperamos pronto", 10, 270);
    doc.text("NearVet S.A.", 150, 270);
    // Descargar el PDF
    doc.save(`Factura_${factura.date}.pdf`);
  };
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  return (
    <section className="flex flex-col w-2/3 m-auto shadow-lg">
      <div className="flex flex-row justify-around w-full m-auto">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`p-2 bg-detail text-white rounded-lg ${
            page === 1 ? "cursor-default opacity-0 " : ""
          }`}
        >
          Anterior Página
        </button>
        <button
          onClick={handleNextPage}
          className="p-2 bg-detail text-white rounded-lg"
        >
          Siguiente Página
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center min-h-[80vh] ">
        {facturas &&
          facturas.map((factura, index) => (
            <article
              key={index}
              className="shadow-lg rounded-lg bg-slate-200 dark:bg-slate-700 p-4 hover:scale-105 cursor-pointer"
              onClick={() => handleDownloadPdf(factura)}
            >
              <div className="flex flex-row justify-between gap-2 items-center">
                <h4 className="text-xl text-detail">
                  {factura.service.service}
                </h4>
                <p>{factura.date}</p>
              </div>
              <div className="flex flex-row justify-evenly gap-2 items-center my-2">
                <div className="text-detail"></div>
              </div>
              <div className="flex flex-row justify-between gap-2">
                <p>Total</p>
                <p>$ {factura.total}</p>
              </div>
              <div className="flex flex-col mt-1">
                <small>Comprobante no válido como factura.</small>
                <small>Para descargarla, haga click</small>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default BillModule;
