"use client";

import Button from "@/common/Button";
import SearchInput from "@/common/SearchInput";
import React, { useMemo, useState } from "react";
import { FaCalendar, FaFilter } from "react-icons/fa";
import { IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

type Status = "scheduled" | "checked-in" | "complete" | "no-show";

type Appt = {
  id: string;
  date: string; // "YYYY-MM-DD"
  start: string; // "HH:MM" 24h
  durationMins: number;
  client: string;
  service: string;
  status: Status;
};

const BUSINESS_START = 8 * 60; // 08:00
const BUSINESS_END = 20 * 60; // 20:00

const MOCK: Appt[] = [
  {
    id: "a1",
    date: "2025-12-14",
    start: "09:00",
    durationMins: 60,
    client: "Sara Kim",
    service: "Cut + Blowdry",
    status: "scheduled",
  },
  {
    id: "a2",
    date: "2025-12-14",
    start: "10:30",
    durationMins: 30,
    client: "Mike Jones",
    service: "Beard Trim",
    status: "checked-in",
  },
  {
    id: "a3",
    date: "2025-12-14",
    start: "13:00",
    durationMins: 90,
    client: "Amina Ali",
    service: "Color",
    status: "scheduled",
  },
  {
    id: "a4",
    date: "2025-12-15",
    start: "09:30",
    durationMins: 45,
    client: "Jae Park",
    service: "Fade",
    status: "complete",
  },
  {
    id: "a5",
    date: "2025-12-15",
    start: "11:00",
    durationMins: 60,
    client: "Nora Diaz",
    service: "Highlights",
    status: "scheduled",
  },
  {
    id: "a6",
    date: "2025-12-16",
    start: "14:00",
    durationMins: 30,
    client: "Liam Smith",
    service: "Trim",
    status: "no-show",
  },
  {
    id: "a7",
    date: "2025-12-16",
    start: "15:00",
    durationMins: 60,
    client: "Emma Johnson",
    service: "Perm",
    status: "scheduled",
  },
  {
    id: "a8",
    date: "2025-12-16",
    start: "16:30",
    durationMins: 45,
    client: "Olivia Brown",
    service: "Blowdry",
    status: "scheduled",
  },
  {
    id: "a9",
    date: "2025-12-17",
    start: "10:00",
    durationMins: 60,
    client: "Noah Davis",
    service: "Cut + Color",
    status: "scheduled",
  },
  {
    id: "a10",
    date: "2025-12-17",
    start: "11:30",
    durationMins: 30,
    client: "Ava Wilson",
    service: "Blowdry",
    status: "checked-in",
  },
];

function toMins(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fmtTime(mins: number) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = ((h24 + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function statusClass(s: Status) {
  if (s === "checked-in") return "border-l-4 border-l-blue-500";
  if (s === "complete") return "border-l-4 border-l-green-600 opacity-80";
  if (s === "no-show") return "border-l-4 border-l-red-600 opacity-80";
  return "border-l-4 border-l-gray-400";
}

function byStart(a: Appt, b: Appt) {
  return toMins(a.start) - toMins(b.start);
}

function groupByDate(appts: Appt[]) {
  const map = new Map<string, Appt[]>();
  for (const a of appts) {
    if (!map.has(a.date)) map.set(a.date, []);
    map.get(a.date)!.push(a);
  }
  for (const [, v] of map) v.sort(byStart);
  return [...map.entries()].sort(([d1], [d2]) => d1.localeCompare(d2));
}

function fmtDayHeader(yyyy_mm_dd: string) {
  const d = new Date(`${yyyy_mm_dd}T00:00:00`);
  const month = d.toLocaleString(undefined, { month: "long" });
  const dayName = d.toLocaleString(undefined, { weekday: "long" });
  const dayNum = d.getDate();
  const year = d.getFullYear();
  return { month, dayName, dayNum, year };
}

export default function CalanderPage() {
  const [view, setView] = useState<"list" | "week">("list");

  const bookedMins = useMemo(
    () => MOCK.reduce((sum, a) => sum + a.durationMins, 0),
    []
  );

  const utilization = bookedMins / (BUSINESS_END - BUSINESS_START);

  const grouped = useMemo(() => groupByDate(MOCK), []);

  return (
    <div className="h-full min-h-0 flex flex-col gap-4">
      {/* header */}
      <div className="sticky top-0 z-10 bg-white pt-16 border-b border-gray-200 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <FaCalendar />
            <div className="text-2xl font-bold text-gray-900">Calendar</div>
          </div>

          <div className="flex gap-2">
            <Button
              label={
                <span className="flex items-center gap-2">
                  <IoMdAdd /> <p>New</p>
                </span>
              }
            />
          </div>
        </div>

        {/* search + date range row (placeholders) */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput />
          <Button
            label={
              <span className="flex items-center gap-2">
                <FaFilter />
                <p className="flex justify-center">Filter</p>
              </span>
            }
          />
        </div>
      </div>

      {/* appointments list */}
      <div className="space-y-3 pt-7 min-h-0">
        {grouped.map(([date, appts]) => {
          const h = fmtDayHeader(date);

          return (
            <div key={date}>
              <div className="h-12 flex justify-between items-center font-bold text-gray-900">
                <span className="text-lg">
                  {h.month} {h.dayNum}, {h.dayName} {h.year}
                </span>
                <span className="text-xs text-gray-600">
                  Booked: {bookedMins} mins • Utilization:{" "}
                  {Math.round(utilization * 100)}%
                </span>
              </div>

              <div className="p-2 flex flex-col gap-3">
                {appts.map((a) => (
                  <Button
                    key={a.id}
                    label={
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-gray-900 truncate">
                            {a.client}
                          </div>
                          <div className="text-xs text-gray-700 truncate">
                            {a.service}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {fmtTime(toMins(a.start))} • {a.durationMins}m
                          </div>
                        </div>

                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {a.status}
                        </span>
                      </div>
                    }
                    className={`w-full ${statusClass(
                      a.status
                    )} rounded-base  shadow-sm border border-gray-200 p-3 text-left hover:bg-gray-50`}
                  />
                ))}

                {appts.length === 0 && (
                  <div className="p-4 text-sm text-gray-500">—</div>
                )}
              </div>
            </div>
          );
        })}
        <p className="py-8 text-sm text-gray-500 text-center">
          No more data is available at this time
        </p>
      </div>
    </div>
  );
}
