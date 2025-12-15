"use client";

import Button from "@/common/Button";
import React, { useEffect, useState } from "react";

type AppointmentStatus =
  | "scheduled"
  | "checked-in"
  | "complete"
  | "no-show"
  | "cancelled";

type AppointmentDetail = {
  id: string;
  time: string;
  client: string;
  status: AppointmentStatus;
  services: string[];
  durationMins: number;
  notes?: string;
};

const DETAILS: Record<string, AppointmentDetail> = {
  a1: {
    id: "a1",
    time: "09:00 AM",
    client: "Sara Kim",
    status: "scheduled",
    services: ["Haircut", "Blowdry"],
    durationMins: 60,
    notes: "Prefers quiet appointment.",
  },
  a2: {
    id: "a2",
    time: "10:30 AM",
    client: "Mike Jones",
    status: "checked-in",
    services: ["Beard trim"],
    durationMins: 20,
  },
  a3: {
    id: "a3",
    time: "01:15 PM",
    client: "Amina Ali",
    status: "scheduled",
    services: ["Color", "Treatment"],
    durationMins: 90,
    notes: "Allergy: lavender products.",
  },
};

function mockFetchDetail(id: string): Promise<AppointmentDetail> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const d = DETAILS[id];
      if (!d) reject(new Error("Not found"));
      else resolve(d);
    }, 350);
  });
}

export default function AppointmentDetails({
  id,
  onClose,
  onSetStatus,
}: {
  id: string;
  onClose: () => void;
  onSetStatus?: (id: string, status: AppointmentStatus) => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<AppointmentDetail | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setDetail(null);

    mockFetchDetail(id)
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message || "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const setStatus = async (status: AppointmentStatus) => {
    try {
      setSaving(true);

      // mock: update local UI immediately
      setDetail((prev) => (prev ? { ...prev, status } : prev));

      // real app: call API
      if (onSetStatus) await onSetStatus(id, status);

      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-700">Loading details…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!detail) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-900">Time</div>
          <div className="text-gray-700">{detail.time}</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-900">Status</div>
          <div className="text-gray-700">{detail.status}</div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-900">Client</div>
          <div className="text-gray-700">{detail.client}</div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-900">Services</div>
          <div className="text-gray-700">{detail.services.join(", ")}</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-900">Duration</div>
          <div className="text-gray-700">{detail.durationMins} mins</div>
        </div>

        {detail.notes && (
          <div className="col-span-2 flex flex-col gap-2">
            <div className="text-sm font-bold text-gray-900">Notes</div>
            <div className="text-gray-700">{detail.notes}</div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          label={saving ? "Saving..." : "Check In"}
          onClick={() => setStatus("checked-in")}
        />
        <Button
          label={saving ? "Saving..." : "Complete"}
          onClick={() => setStatus("complete")}
        />
        <Button
          label={saving ? "Saving..." : "No Show"}
          onClick={() => setStatus("no-show")}
        />

        <Button
          label={saving ? "Saving..." : "Cancel Appointment"}
          onClick={() => setStatus("cancelled")}
        />
      </div>
    </div>
  );
}
