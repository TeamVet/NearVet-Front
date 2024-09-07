"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCutSharp } from "react-icons/io5";
import jsPDF from "jspdf";

interface Bill {
  service: string;
  item: string;
  price: number;
  date: string;
  user: string;
  id: string;
}

const BillModule: React.FC = () => {
  const [facturas, setFacturas] = useState<Bill[]>([]);

  useEffect(() => {
    // Simulamos la petición al backend para obtener las facturas
    const fakeData = [
      {
        service: "Peluqueria",
        item: "Corte de pelo",
        price: 1000,
        date: "2024-09-01",
        user: "Juan Carlos",
        id: "1",
      },
      {
        service: "Clinica",
        item: "Castracion",
        price: 500,
        date: "2024-09-03",
        user: "Ramon",
        id: "2",
      },
    ];
    setFacturas(fakeData);
  }, []);

  // Función para generar el PDF
  // SVG logo como string (ejemplo simple de logo)

  // Función para generar el PDF
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
      `Factura de Servicio y Servicio en NearVet tipo: ${factura.service}`,
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
    doc.text(`${factura.item}`, 45, 90);
    doc.text("1", 95, 90);
    doc.text(`${factura.price}`, 155, 90);
    doc.text(`Precio total: $${factura.price}`, 150, 110);
    // Nota al pie
    doc.setFontSize(10);
    doc.text("Gracias por su compra lo esperamos pronto", 10, 270);
    doc.text("NearVet S.A.", 150, 270);
    // Descargar el PDF
    doc.save(`Factura_${factura.item}_${factura.date}.pdf`);
  };

  return (
    <section className="flex flex-col md:flex-row flex-wrap gap-2 w-2/3 m-auto justify-center">
      {/* Renderizando las facturas */}
      {facturas &&
        facturas.map((factura, index) => (
          <article
            key={index}
            className="shadow-lg rounded-lg bg-slate-200 dark:bg-slate-700 p-4 hover:scale-105 cursor-pointer"
            onClick={() => handleDownloadPdf(factura)}
          >
            <div className="flex flex-row justify-between gap-2 items-center">
              <h4 className="text-xl text-detail">{factura.service}</h4>
              <p>{factura.date}</p>
            </div>
            <div className="flex flex-row justify-evenly gap-2 items-center">
              <IoCutSharp />
              <p>{factura.item}</p>
            </div>
            <div className="flex flex-row justify-between gap-2">
              <p>Total</p>
              <p>$ {factura.price}</p>
            </div>
            <small className="text-xs">
              Comprobante no válido como factura
            </small>
          </article>
        ))}
    </section>
  );
};

export default BillModule;
