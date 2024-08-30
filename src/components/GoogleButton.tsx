// src/components/GoogleButton.tsx

"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ModalCustom from "./ModalCustom";

interface GoogleButtonProps {
  text?: string;
  size?: string;
  color?: string;
  bgcolor?: string;
  register: boolean;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  text = "Iniciar con Google",
  size = "base",
  color = "black",
  bgcolor = "white",
  register = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (register) {
      setOpen(true);
    } else {
      alert("Te estamos logueando");
    }
  };

  // Mapeo de colores para Tailwind
  const bgColorMap: { [key: string]: string } = {
    "red-500": "bg-red-500",
    "blue-600": "bg-blue-600",
    white: "bg-white",
    // Añade más colores según tus necesidades
  };

  const finalBgColorClass = bgcolor ? bgColorMap[bgcolor] || "" : "bg-detail";

  // Mapeo de tamaños para Tailwind
  const sizeMap: { [key: string]: string } = {
    small: "text-sm",
    base: "text-base",
    lg: "text-lg",
    // Añade más tamaños según tus necesidades
  };

  const finalSizeClass = size ? sizeMap[size] || "" : "";

  // Mapeo de colores de texto para Tailwind
  const colorMap: { [key: string]: string } = {
    black: "text-black",
    "blue-600": "text-blue-600",
    // Añade más colores de texto según tus necesidades
  };

  const finalColorClass = color ? colorMap[color] || "" : "";

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md ${finalSizeClass} ${finalColorClass} ${finalBgColorClass}`}
        aria-label={text}
      >
        <FcGoogle className="mr-2" size={24} />
        {text}
      </button>
      {register && (
        <ModalCustom
          isOpen={open}
          onClose={() => setOpen(false)}
          text="Último paso, necesitamos tu DNI para validarte"
          input="DNI:"
        />
      )}
    </>
  );
};

export default GoogleButton;
