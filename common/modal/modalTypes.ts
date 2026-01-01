// components/modal/modalTypes.ts
export type ModalState =
  | { kind: "none" }
  | { kind: "appointment.details"; id: string }
  | { kind: "appointment.create" }
  | { kind: "service.details"; catagoryid: string; serviceid: string }
  | { kind: "service.create" }
  | { kind: "serviceCatagory.details"; catagoryid: string }
  | { kind: "serviceCatagory.create" }
  | { kind: "client.details"; id: string }
  | { kind: "client.create" }
  | { kind: "staff.details"; id: string }
  | { kind: "staff.create" };

export type ModalActions = {
  openAppointmentDetails: (id: string) => void;
  openAppointmentCreate: () => void;
  openServiceDetails: (catagoryid: string, serviceid: string) => void;
  openServiceCreate: () => void;
  openServiceCatagoryDetails: (catagoryid: string) => void;
  openServiceCatagoryCreate: () => void;
  openClientDetails: (id: string) => void;
  openClientCreate: () => void;
  openStaffDetails: (id: string) => void;
  openStaffCreate: () => void;
  close: () => void;
};
