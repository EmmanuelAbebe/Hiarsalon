"use client";

import React from "react";
import { useModalActions } from "@/common/modal/useModal";
import Button from "@/common/Button";
import RevenuePanel, { DayMetrics } from "./RevenuePanel";

const MOCK: DayMetrics = {
  grossSales: 620,
  netSales: 580,
  tips: 110,
  totalCollected: 690,
  avgTicket: 145,

  scheduled: 6,
  completed: 4,
  cancelled: 1,
  noShow: 1,

  bookedMins: 300,
  availableMins: 480,

  revenueByHour: [
    { hour: "9a", net: 120, tips: 20 },
    { hour: "10a", net: 80, tips: 10 },
    { hour: "11a", net: 150, tips: 30 },
    { hour: "12p", net: 0, tips: 0 },
    { hour: "1p", net: 230, tips: 50 },
  ],
  revenueByCategory: [
    { name: "Cut", value: 220 },
    { name: "Color", value: 260 },
    { name: "Treatment", value: 100 },
  ],
};

type AppointmentSummary = {
  id: string;
  time: string;
  client: string;
  status: "scheduled" | "checked-in" | "complete" | "no-show";
};

const LIST: AppointmentSummary[] = [
  { id: "a1", time: "09:00 AM", client: "Sara Kim", status: "scheduled" },
  { id: "a2", time: "10:30 AM", client: "Mike Jones", status: "checked-in" },
  { id: "a3", time: "01:15 PM", client: "Amina Ali", status: "scheduled" },
];

function StatusPill({ status }: { status: AppointmentSummary["status"] }) {
  return (
    <span className="inline-flex rounded-full border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800">
      {status.replace("-", " ")}
    </span>
  );
}

export default function Page() {
  const { openAppointmentDetails, openAppointmentCreate } = useModalActions();

  return (
    <div className="flex flex-col py-16">
      <div className="mb-6">
        <Button
          label="New Appointment"
          onClick={() => openAppointmentCreate()}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-base"
        />
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-sans text-gray-900 font-bold">
            Today’s Appointments
          </h1>

          <button
            type="button"
            onClick={() => openAppointmentCreate()}
            className="text-white bg-brand rounded-base px-4 py-2"
          >
            New appointment
          </button>
        </div>

        <div className="space-y-3">
          {LIST.map((appt) => (
            <button
              key={appt.id}
              type="button"
              onClick={() => openAppointmentDetails(appt.id)}
              className="w-full rounded-md p-4 text-left cursor-pointer flex hover:bg-blue-400 transition-all delay-150 duration-200"
            >
              <div className="bg-blue-400 w-4 rounded me-6" />

              <div className="grid grid-cols-6 gap-4 items-center w-full">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">Time</span>
                  <span className="text-gray-700">{appt.time}</span>
                </div>

                <div className="flex flex-col col-span-2">
                  <span className="font-bold text-gray-900">Client</span>
                  <span className="text-gray-700">{appt.client}</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">Status</span>
                  <StatusPill status={appt.status} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-2xl text-heading font-bold">
          Today's Revenue
        </h1>
        <RevenuePanel data={MOCK} />
      </div>
    </div>
  );
}
