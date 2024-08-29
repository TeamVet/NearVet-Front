"use client";

import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import verifyToken from "@/lib/token";

interface ModalCustomProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  icon?: React.ReactNode;
  input?: string;
}

const ModalCustom: React.FC<ModalCustomProps> = ({
  isOpen,
  onClose,
  text,
  icon,
  input,
}) => {
  const router = useRouter();
  const { setUser } = useUser();
  const [formValues, setFormValues] = useState({ dni: 0 });
  const [error, setError] = useState<string | null>(null);
  if (!isOpen) return null;

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      (name === "dni" && value.length > 8) ||
      value.length < 7 ||
      value.includes(" ")
    )
      setError("DNI sin puntos ni espacios");
    else {
      setError(null);
    }

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    alert("Logueando...");
    // try {
    //   const response = await fetch(
    //     "https://nearvet-latest.onrender.com/authGlobal/google",
    //     {
    //       method: "POST",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ formValues }),
    //     }
    //   );
    //   const data = await response.json();
    //   if (data.url) {
    //     window.location.href = data.url; // Redirige al usuario a la URL de Google para autenticar
    //   } else {
    //     console.error("No URL received for Google authentication");
    //   }
    // } catch (error) {
    //   console.error("Error during Google authentication:", error);
    // }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="p-5 m-auto flex flex-col rounded-md shadow-lg bg-gradient-to-r from-slate-400 to-detail text-black font-semibold ">
        <div className="px-2 sm:text-lg">{text}</div>
        {icon && <div>{icon}</div>}

        <div className="flex flex-col m-auto">
          {input && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-3 p-2">
                <label htmlFor="dni" className="sm:text-lg">
                  {input}
                </label>
                <input
                  type="number"
                  name="dni"
                  id="dni"
                  className="rounded text-center sm:text-lg"
                  placeholder="40236159"
                  required
                  pattern="\d{6,8}"
                  minLength={6}
                  maxLength={8}
                  onChange={handleInputChange}
                  inputMode="numeric"
                />
              </div>
              {error && (
                <div className="w-full">
                  <p className="text-black text-wrap text-sm">{error}</p>
                </div>
              )}
              <div className="flex flex-row justify-between mt-3">
                <ButtonCustom text="Enviar" type="submit" />
                <ButtonCustom
                  text="Cancelar"
                  bgcolor="red-500"
                  onClick={onClose}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;
