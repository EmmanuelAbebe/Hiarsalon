// components/modal/modalTypes.ts
export type ModalState =
  | { kind: "none" }
  | { kind: "appointment.details"; id: string }
  | { kind: "appointment.create" };

export type ModalActions = {
  openAppointmentDetails: (id: string) => void;
  openAppointmentCreate: () => void;
  close: () => void;
};



// export type ModalContextType = {
//   state: ModalState;
//   actions: ModalActions;
// };

// export type ModalProps = {
//   id: string;
//   title: string | ReactNode;
//   isVisible: boolean;
//   onClose: () => void;
//   children: ReactNode;
// };

// export type ModalHeaderProps = {
//   title: string | ReactNode;
//   onClose: () => void;
// };

// export type ModalBodyProps = {
//   children: ReactNode;
// };

// export type ModalFooterProps = {
//   children: ReactNode;
// };