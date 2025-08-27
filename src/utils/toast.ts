// src/utils/toast.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";


const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
};


export const notifySuccess = (message: string) => {
  toast.success(message, toastOptions);
};

export const notifyError = (message: string) => {
  toast.error(message, toastOptions);
};

export const notifyInfo = (message: string) => {
  toast.info(message, toastOptions);
};

export const notifyWarning = (message: string) => {
  toast.warn(message, toastOptions);
};

export const handleApiError = (
  err: unknown,
  fallbackMessage = "Đã có lỗi xảy ra."
) => {
  console.error("API Error:", err);

  let msg = fallbackMessage;

  if (err instanceof AxiosError) {
    msg = err.response?.data?.message || fallbackMessage;
  } else if (err instanceof Error) {
    msg = err.message;
  }

  notifyError(msg);
};

