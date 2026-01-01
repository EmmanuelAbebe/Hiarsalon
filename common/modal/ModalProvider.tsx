"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ModalActions, ModalState } from "./modalTypes";

const ModalStateContext = createContext<ModalState | null>(null);
const ModalActionsContext = createContext<ModalActions | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({ kind: "none" });

  const actions = useMemo<ModalActions>(
    () => ({
      openAppointmentDetails: (id) =>
        setState({ kind: "appointment.details", id }),

      openAppointmentCreate: () => setState({ kind: "appointment.create" }),

      openServiceDetails: (catagoryid, serviceid) => {
        setState({ kind: "service.details", catagoryid, serviceid });
      },

      openServiceCreate: () => setState({ kind: "service.create" }),

      openServiceCatagoryDetails: (catagoryid) => {
        setState({ kind: "serviceCatagory.details", catagoryid });
      },

      openServiceCatagoryCreate: () =>
        setState({ kind: "serviceCatagory.create" }),

      openClientDetails: (id: string) =>
        setState({ kind: "client.details", id }),

      openClientCreate: () => setState({ kind: "client.create" }),

      openStaffDetails: (id: string) => setState({ kind: "staff.details", id }),

      openStaffCreate: () => setState({ kind: "staff.create" }),

      close: () => setState({ kind: "none" }),
    }),
    []
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalActionsContext.Provider>
  );
}

export function useModalState() {
  const v = useContext(ModalStateContext);
  if (!v) throw new Error("useModalState must be used within ModalProvider");
  return v;
}

export function useModalActions() {
  const v = useContext(ModalActionsContext);
  if (!v) throw new Error("useModalActions must be used within ModalProvider");
  return v;
}
