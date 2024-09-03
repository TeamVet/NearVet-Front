import { Flip, toast } from "react-toastify";

export const SuccessNotify = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
  });
};
export const ErrorNotify = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
  });
};

export const PromessNotify = (
  messagePending: string = "Procesando...",
  messageSuccess: string = "Petición exitosa",
  promise: Promise<any>
) => {
  return toast.promise(promise, {
    pending: `${messagePending}`,
    success: `${messageSuccess}`,
  });
};

export const InfoNotify = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
    draggable: true,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: false,
    hideProgressBar: false,
  });
};
