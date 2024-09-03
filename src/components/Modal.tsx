import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { modifyImagenPetController } from "@/lib/authController";

interface ModalProps {
  isOpen: boolean;
  id: string;
  token: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, id, onClose, token }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFile(null);
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileString = reader.result as string;
        modifyImagenPetController(id as string, token as string, fileString);
      };
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm min-w-96  mx-auto">
        <h2 id="modal-title" className="text-lg font-semibold mb-2">
          Cargar Imagen
        </h2>
        <div
          id="modal-description"
          className={`mb-4 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            dragging ? "border-blue-600 bg-blue-100" : "border-gray-300"
          }`}
        >
          {file ? (
            <p className="text-center text-green-600">{file.name}</p>
          ) : (
            <p className="text-center text-gray-500">
              Arrastra y suelta una imagen aquí o haz clic para seleccionarla
            </p>
          )}
        </div>
        <div className="grid grid-cols-2  gap-2">
          <ButtonCustom text="Cargar" onClick={handleSubmit} type="submit" />

          <button
            onClick={() => {
              setFile(null);
              onClose();
            }}
            className="px-5 py-2 m-auto rounded-lg bg-red-600 text-white  hover:bg-red-700 text-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
