"use client";

import React from "react";
import ModalShell from "./ModalShell";
import { useModalActions, useModalState } from "./useModal";
import AppointmentDetails from "@/app/(dashboard)/dashboard/_modals/AppointmentDetails";
import CreateAppointment from "@/app/(dashboard)/dashboard/_modals/CreateAppointment";

export default function ModalHost() {
  const modal = useModalState();
  const { close } = useModalActions();

  const isVisible = modal.kind !== "none";

  const title =
    modal.kind === "appointment.details"
      ? "Appointment Details"
      : modal.kind === "appointment.create"
      ? "Create Appointment"
      : "";

  return (
    <ModalShell
      id="dashboard-modal"
      title={title}
      isVisible={isVisible}
      onClose={close}
    >
      {modal.kind === "appointment.details" && (
        <AppointmentDetails id={modal.id} onClose={close} />
      )}
      {modal.kind === "appointment.create" && (
        <CreateAppointment onClose={close} />
      )}
    </ModalShell>
  );
}
