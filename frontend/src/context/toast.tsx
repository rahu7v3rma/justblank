"use client";

import { ToastContextType } from "@/utils/types";
import { createContext, useCallback, useState } from "react";

export const ToastContext = createContext<ToastContextType>({
  isOpen: false,
  toastMessage: "",
  toastType: "success",
  triggerToast: () => {},
  toastTitle: "",
  setToastTitle: () => {},
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<"error" | "success" | "info">(
    "success"
  );
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastTitle, setToastTitle] = useState<string>("");

  const triggerToast = useCallback(
    (toastMessage: string, toastType: "error" | "success" | "info") => {
      setIsOpen(true);
      setToastMessage(toastMessage);
      setToastType(toastType);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        toastMessage,
        toastType,
        triggerToast,
        toastTitle,
        setToastTitle,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
