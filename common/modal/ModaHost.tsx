"use client";

import React from "react";
import ModalShell from "./ModalShell";
import { useModalActions, useModalState } from "./useModal";
import AppointmentDetails from "@/app/(dashboard)/dashboard/_modals/AppointmentDetails";
import CreateAppointment from "@/app/(dashboard)/dashboard/_modals/CreateAppointment";
import ServiceDetails from "@/app/(dashboard)/dashboard/_modals/ServiceDetails";
import AddService from "@/app/(dashboard)/dashboard/_modals/AddService";

export default function ModalHost() {
  const modal = useModalState();
  const { close } = useModalActions();

  const isVisible = modal.kind !== "none";

  const title =
    modal.kind === "appointment.details"
      ? "Appointment Details"
      : modal.kind === "appointment.create"
      ? "Create Appointment"
      : modal.kind === "service.details"
      ? "Service Details"
      : modal.kind === "service.create"
      ? "Create Service"
      : modal.kind === "serviceCatagory.details"
      ? "Service Catagory Details"
      : modal.kind === "serviceCatagory.create"
      ? "Create Service Catagory"
      : modal.kind === "client.details"
      ? "Client Details"
      : modal.kind === "client.create"
      ? "New Client"
      : modal.kind === "staff.details"
      ? "Staff Details"
      : modal.kind === "staff.create"
      ? "New Staff"
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
      {modal.kind === "service.details" && (
        <ServiceDetails
          catagoryid={modal.catagoryid}
          serviceid={modal.serviceid}
          onClose={close}
        />
      )}
      {modal.kind === "service.create" && <AddService onClose={close} />}
    </ModalShell>
  );
}
