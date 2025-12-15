"use client";

import Button from "@/common/Button";
import React, { useState } from "react";

export default function CreateAppointment({
  onClose,
}: {
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    time: "",
    client: "",
    services: "",
    durationMins: "",
    notes: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // later: POST to /api/appointments
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-900">Time</label>
        <input
          value={form.time}
          onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
          className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
          placeholder="09:00 AM"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900">Client</label>
        <input
          value={form.client}
          onChange={(e) => setForm((s) => ({ ...s, client: e.target.value }))}
          className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
          placeholder="Client name"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900">
          Services
        </label>
        <input
          value={form.services}
          onChange={(e) => setForm((s) => ({ ...s, services: e.target.value }))}
          className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
          placeholder="Haircut, Beard trim"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900">
          Duration (mins)
        </label>
        <input
          value={form.durationMins}
          onChange={(e) =>
            setForm((s) => ({ ...s, durationMins: e.target.value }))
          }
          className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
          inputMode="numeric"
          placeholder="60"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900">Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
          className="mt-1 w-full rounded-base border border-gray-300 bg-white px-3 py-2 text-gray-900"
          rows={3}
        />
      </div>

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
