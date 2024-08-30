"use client";

import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import verifyToken from "@/lib/token";
import { log } from "console";
import { RegisterWithGoogle } from "@/lib/authService";
import { ErrorNotify, PromessNotify } from "@/lib/toastyfy";

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
  const [formValues, setFormValues] = useState({ dni: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Duración de la animación
    }
  }, [isOpen]);

  if (!isVisible) return null;

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
    try {
      const data = await PromessNotify(
        "Registrandote...",
        "Registrado exitosamente",
        RegisterWithGoogle(formValues)
      );
      console.log(data);
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No URL received for Google authentication");
      }
    } catch (error: any) {
      ErrorNotify(`Error: ${error.message}`);
    }

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`p-5 m-auto flex flex-col rounded-md shadow-lg bg-lightBG dark:bg-darkBG dark:text-darkHline text-black font-semibold transition-transform duration-700 transform ${
          isOpen ? "scale-100" : "scale-60"
        }`}
      >
        <div className="px-2 sm:text-lg">{text}</div>
        {icon && <div>{icon}</div>}

        <div className="flex flex-col m-auto">
          {input && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-3 p-2">
                <label htmlFor="dni" className="sm:text-lg ">
                  {input}
                </label>
                <input
                  type="number"
                  name="dni"
                  id="dni"
                  className="rounded text-center sm:text-lg bg-slate-200"
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
