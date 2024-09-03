import { useEffect } from "react";
import ButtonCustom from "./ButtonCustom";

interface ModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, id, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-10 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto flex flex-col ">
        <h2 id="modal-title" className="text-lg font-semibold mb-2 m-auto">
          Modal Title
        </h2>
        <div id="modal-description" className="mb-4">
          La imagen{id}
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <ButtonCustom text="Actualizar" />
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
