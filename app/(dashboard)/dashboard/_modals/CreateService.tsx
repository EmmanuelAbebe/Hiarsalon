"use client";

import { DEFULT_APPOINTMENT_FORMDATA } from "@/app/lib/appointmentData";
import { DEFAULT_SERVICE_FORM_DATA } from "@/app/lib/servicesData";
import Button from "@/common/Button";
import React, { useState } from "react";

function FormInputField({
  label,
  placeholder,
  value,
  setForm,
}: {
  label: string;
  placeholder: string;
  value: string;
  setForm(): (e: any) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-900">{label}</label>
      <input
        value={value}
        onChange={setForm}
        className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function openServiceCreate({
  onClose,
}: {
  onClose: () => void;
}) {
  const [form, setForm] = useState(DEFAULT_SERVICE_FORM_DATA);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // later: POST to /api/appointments
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-3">
        <Button label="Create Appointment" type="submit" />

        <Button
          label="Cancel"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400"
        />
      </div>
    </form>
  );
}
