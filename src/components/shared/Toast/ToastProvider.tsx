"use client";

import { ReactNode } from "react";
import Toast from "./Toast";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  );
};

export default ToastProvider;
