import { toast } from "react-toastify";

export const notify = (message: string, type: "success" | "error") => {
  toast(message, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const notifyError = (message: string) => {
  notify(message, "error");
};

export const notifySuccess = (message: string) => {
  notify(message, "success");
};
