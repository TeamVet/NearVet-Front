"use client";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import { BillEndController } from "@/lib/Controllers/userController";
import { fetcher } from "@/lib/fetcher";
import { Bill } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImCoinDollar } from "react-icons/im";
import {
  IoCalendarClearOutline,
  IoCash,
  IoLogoWhatsapp,
  IoMail,
  IoMap,
  IoPerson,
  IoPhonePortrait,
  IoPricetag,
} from "react-icons/io5";
const SALE_URL = process.env.NEXT_PUBLIC_SALE_URL;
const LinkWhatsapp = PATHROUTES.WHATSAPP;
const idBill: React.FC = () => {
  const id = useParams().idBill;

  const { loading, startLoading, stopLoading } = useLoading();
  const { user } = useUser();
  const [factura, setFactura] = useState<Bill>();
  useEffect(() => {
    const fetchBill = async () => {
      if (!id) return;
      try {
        startLoading();
        const dataFetcher = {
          url: `${SALE_URL}/${id}`,
          method: "GET" as const,
        };
        const response = await fetcher(dataFetcher);

        setFactura(response);
      } finally {
        stopLoading();
      }
    };
    if (user) {
      fetchBill();
    }
  }, [user]);

  const handleFinalizar = async () => {
    try {
      startLoading();
      const responseFinalizar = await BillEndController(factura?.id as string);
      if (responseFinalizar.id) {
        alert("Factura finalizada");
        window.location.reload();
      }
    } finally {
      stopLoading();
    }
  };
  const handleDescuento = async () => {};
  const handleNotPay = async () => {};
  const handlePrint = async () => {};

  return (
    <Screen>
      {loading && <Loading />}

      {factura && (
        <article className="shadow-lg rounded-lg p-4 flex flex-col gap-2 justify-center align-middle md:max-w-[80vw] mx-auto">
          <h2 className="Text-3xl text-detail">Facturacion Nº-{factura.id}</h2>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail">Datos del cliente:</h3>
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="text-justify">
                <p className="text-lg text-detail text-center">
                  {factura.user.name} {factura.user.lastName}
                </p>
                <div className="flex flex-row items-center gap-2">
                  <IoMail />
                  <p> {factura.user.email}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IoMap />
                  <p>
                    {factura.user.address}, {factura.user.city}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <IoPhonePortrait />
                  {factura.user.phone}
                  <Link
                    href={`${LinkWhatsapp}/${factura.user.phone}`}
                    aria-label="Boton para ir a whatsapp"
                    target="_blank"
                    className="rounded-full size-5 md:size-10 flex items-center justify-center text-white text-2xl bg-green-700 hover:scale-105"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src={factura.user.imgProfile}
                  width={100}
                  height={100}
                  alt={`Foto de ${factura.user.name}`}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail">Detalle de Productos:</h3>
            {factura.saleProducts &&
              factura.saleProducts.map((product) => (
                <div
                  key={product.saleId}
                  className="flex flex-row gap-2 items-center"
                >
                  <p className="text-lg text-detail text-center">
                    {product.product.name}
                  </p>

                  <ImCoinDollar />
                  <p>{product.price}</p>

                  <p>Cantidad: {product.acount}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto  border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail">Detalle de Servicios:</h3>
            {factura.saleServices &&
              factura.saleServices.map((service) => (
                <div
                  key={service.saleId}
                  className="flex flex-row gap-2 items-center"
                >
                  <p className="text-lg text-detail text-center">
                    {service.service.service}
                  </p>

                  <ImCoinDollar />
                  <p>{service.price}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail">Informacion de la Factura</h3>
            <div className="flex flex-row justify-evenly gap-2 ">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <IoCalendarClearOutline />
                  <p>{factura.date}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  Estado:
                  {factura.finished ? (
                    <p className="text-green-700 italic">Finalizada</p>
                  ) : (
                    <p>En proceso</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <IoCash />
                <p>Subtotal: ${factura.subtotal}</p>
                <p>Adelanto: ${factura.advancedPay}</p>
                <p>Descuentos: ${factura.discount}</p>
                <p>Total: ${factura.total}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 m-auto justify-evenly my-2">
            <button
              className="bg-detail text-white p-2 rounded-lg m-auto"
              onClick={handlePrint}
            >
              Imprimir
            </button>
            <button
              className="bg-detail text-white p-2 rounded-lg m-auto"
              onClick={handleDescuento}
            >
              Agregar descuento
            </button>
            <button
              className="bg-detail text-white p-2 rounded-lg m-auto"
              onClick={handleNotPay}
            >
              No abonada
            </button>
            {factura.finished ? (
              <></>
            ) : (
              <button
                className="bg-detail text-white p-2 rounded-lg m-auto"
                onClick={handleFinalizar}
              >
                Finalizar factura
              </button>
            )}
          </div>
        </article>
      )}
    </Screen>
  );
};

export default idBill;
