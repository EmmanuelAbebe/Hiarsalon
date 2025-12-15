"use client";

import React from "react";
import { ModalProvider } from "@/common/modal/ModalProvider";
import ModalHost from "@/common/modal/ModaHost";

export default function DashboardClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      {children}
      <ModalHost />
    </ModalProvider>
  );
}
