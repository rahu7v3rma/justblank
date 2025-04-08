"use client";

import Text from "@/components/text";
import { ToastContext } from "@/context/toast";
import { memo, useContext } from "react";
import Heading from "../heading";

const Toast = memo(() => {
  const { toastMessage, toastType, isOpen, toastTitle } =
    useContext(ToastContext);

  if (!isOpen) return null;

  const toastTypeClass =
    toastType === "error"
      ? "bg-toast-background-error"
      : toastType === "info"
      ? "bg-toast-background-info"
      : "bg-toast-background-success";

  return (
    <div
      className={`gap-2 break-all absolute top-20 right-10 z-50 max-w-[300px] rounded-md flex items-center justify-center p-2 ${toastTypeClass}`}
    >
      {toastTitle && <Heading>{toastTitle}</Heading>}
      <Text>{toastMessage}</Text>
    </div>
  );
});

export default Toast;
