"use client";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";
import useLoading from "@/hooks/LoadingHook";
import {
  BillEndController,
  BillModifyController,
} from "@/lib/Controllers/userController";
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
  IoCashOutline,
  IoLogoWhatsapp,
  IoMail,
  IoMap,
  IoPhonePortrait,
} from "react-icons/io5";
const SALE_URL = process.env.NEXT_PUBLIC_SALE_URL;
const METHOD_PAY = process.env.NEXT_PUBLIC_METHOD_PAY;
const LinkWhatsapp = PATHROUTES.WHATSAPP;
const idBill: React.FC = () => {
  const id = useParams().idBill;

  const { loading, startLoading, stopLoading } = useLoading();
  const { user } = useUser();
  const [factura, setFactura] = useState<Bill>();
  const [payMethods, setPayMethods] =
    useState<{ id: string; method: string; interest: number }[]>();
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
        const payData = {
          url: `${METHOD_PAY}`,
          method: "GET" as const,
        };
        const responsePayMethod = await fetcher(payData);
        setPayMethods(responsePayMethod);
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
  const handleSubmit = async (values: any) => {
    startLoading();
    const responseBill = await BillModifyController(
      values,
      factura?.id as string
    );
    console.log(responseBill);
    stopLoading();
  };
  const handlePrint = async () => {
    window.print();
  };

  return (
    <Screen>
      {loading && <Loading />}

      {factura && (
        <article className="shadow-lg rounded-lg p-4 flex flex-col gap-2 justify-center align-middle min-w-[80%] md:max-w-[80vw] mx-auto">
          <h2 className="Text-3xl text-detail">Facturacion Nº-{factura.id}</h2>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">Datos del cliente:</h3>
            <div className="flex flex-row justify-between items-center gap-4 p-2">
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
            <h3 className="text-detail font-semibold">Detalle de Productos:</h3>
            {factura.saleProducts &&
              factura.saleProducts.map((product) => (
                <div
                  key={product.saleId}
                  className="flex flex-row gap-2 items-center justify-between md:justify-start"
                >
                  <p className="text-lg text-detail text-center">
                    {product.product.name}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <ImCoinDollar />
                    <p>{product.price}</p>
                  </div>

                  <p>Cantidad: {product.acount}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto  border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">Detalle de Servicios:</h3>
            {factura.saleServices &&
              factura.saleServices.map((service) => (
                <div
                  key={service.saleId}
                  className="flex flex-row gap-2 items-center justify-between md:justify-start"
                >
                  <p className="text-lg text-detail text-center">
                    {service.service.service}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <ImCoinDollar />
                    <p>{service.price}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col p-4 gap-2  mx-auto border border-gray-400 rounded-lg min-w-[80%] max-w-[80%]">
            <h3 className="text-detail font-semibold">
              Informacion de la Factura
            </h3>
            <div className="flex flex-col md:flex-row justify-evenly gap-2 ">
              <div className="my-auto">
                <div className="flex flex-row gap-2 items-center">
                  <IoCalendarClearOutline />
                  <p className="text-lg">{factura.date}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  Estado:
                  {factura.finished ? (
                    <p className="text-green-700 italic">Finalizada</p>
                  ) : (
                    <p>En proceso</p>
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <IoCash />
                  <p>Subtotal: ${factura.subtotal}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <IoCashOutline />
                  <p>Adelanto: ${factura.advancedPay}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label
                    htmlFor="discount"
                    className="block text-sm font-semibold text-detail m-1"
                  >
                    Aplicar Descuento:
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    placeholder="$1000"
                    className="w-full bg-transparent border-[.2em] border-1 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white p-1 rounded-md text-center text-darkBorders"
                  />
                  <label
                    htmlFor="payMethod"
                    className="block text-sm font-semibold text-detail m-1"
                  >
                    Medio de pago:
                  </label>
                  <select
                    id="payMethod"
                    className="w-full bg-transparent border-[.2em] border-1 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white p-1 rounded-md text-center text-darkBorders"
                  >
                    <option label="Seleccione una opción" />
                    {payMethods &&
                      payMethods.map((payMethod) => (
                        <option key={payMethod.id} value={payMethod.id}>
                          {payMethod.method}
                        </option>
                      ))}
                  </select>
                  <button
                    className="bg-detail text-white p-2 rounded-lg m-auto"
                    type="submit"
                  >
                    Aplicar
                  </button>
                </form>
              </div>

              <p className="text-xl my-auto text-detail font-semibold">
                Total: ${factura.total}
              </p>
            </div>
            <button
              className="bg-detail text-white p-2 rounded-lg m-auto"
              onClick={handlePrint}
            >
              Imprimir Factura
            </button>
          </div>
        </article>
      )}
    </Screen>
  );
};

export default idBill;
