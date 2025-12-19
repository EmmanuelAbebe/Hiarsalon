"use client";

import Button from "@/common/Button";
import SearchInput from "@/common/SearchInput";
import React, { useMemo, useState } from "react";
import { BsCashStack, BsFillDashCircleFill } from "react-icons/bs";
import { FaFilter, FaPhoneAlt } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { IoPeople, IoPersonCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const clients = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@email.com",
    phone: "555-0192",
    lastVisit: "2025-02-12",
    totalSpend: 1240,
    noShows: 0,
  },
  {
    id: 2,
    name: "Jordan Lee",
    email: "jordan@email.com",
    phone: "555-8831",
    lastVisit: "2024-11-03",
    totalSpend: 320,
    noShows: 2,
  },
  {
    id: 3,
    name: "Taylor Smith",
    email: "taylersmitch@gmail.com",
    phone: "555-4523",
    lastVisit: "2025-01-20",
    totalSpend: 560,
    noShows: 1,
  },
  {
    id: 4,
    name: "Morgan Brown",
    email: "morgan@gmail.com",
    phone: "555-3345",
    lastVisit: "2024-12-15",
    totalSpend: 890,
    noShows: 0,
  },
];

type FilterKey = "all" | "new" | "high" | "inactive";

const money = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const isRecent = (iso: string, days: number) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return diff <= days * 24 * 60 * 60 * 1000;
};

const isInactive = (iso: string, days: number) => {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return diff > days * 24 * 60 * 60 * 1000;
};

const ClientPage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return clients
      .filter((c) => {
        if (!q) return true;
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q)
        );
      })
      .filter((c) => {
        if (filter === "all") return true;
        if (filter === "new") return isRecent(c.lastVisit, 30);
        if (filter === "high") return c.totalSpend >= 800;
        if (filter === "inactive") return isInactive(c.lastVisit, 90);
        return true;
      });
  }, [query, filter]);

  return (
    <div className="h-full flex flex-col gap-6 py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IoPeople size={28} />
          <h1 className="text-2xl font-bold text-gray-900">Client List</h1>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-2">
        {/* If your SearchInput supports value/onChange, this works.
            If it doesn’t, swap to a normal <input>. */}
        <SearchInput
          placeholder="Search clients..."
          // value={query}
          // onChange={(e: any) => setQuery(e.target?.value ?? "")}
        />

        <div className="relative">
          <Button
            label={
              <span className="flex items-center gap-2">
                <FaFilter />
                <span>Filter</span>
              </span>
            }
          />
          {/* simple filter chips dropdown (always visible on md+) */}
        </div>

        {/* <div className="hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter((f) => (f === "all" ? "new" : "all"))}
            className={`px-3 py-2 rounded-md text-sm border ${
              filter === "new"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            New
          </button>
          <button
            type="button"
            onClick={() => setFilter((f) => (f === "all" ? "high" : "all"))}
            className={`px-3 py-2 rounded-md text-sm border ${
              filter === "high"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            High spenders
          </button>
          <button
            type="button"
            onClick={() => setFilter((f) => (f === "all" ? "inactive" : "all"))}
            className={`px-3 py-2 rounded-md text-sm border ${
              filter === "inactive"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Inactive
          </button>
        </div> */}

        <div className="ml-auto">
          <Button
            label={
              <span className="flex items-center gap-2">
                <IoMdAdd size={16} />
                <span>New</span>
              </span>
            }
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <IoPersonCircle className="text-blue-500" />
                  <span>Name</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-blue-500" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-blue-500" />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <GiOfficeChair className="text-blue-500" />
                  <span>Last Visit</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <BsCashStack className="text-blue-500" />
                  <span>Total Spend</span>
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <BsFillDashCircleFill className="text-blue-500" />
                  <span>No-Shows</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-400/25 overflow-scroll min-h-0">
            {filtered.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {client.name}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="flex">{client.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="flex justify-start">{client.phone}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="flex justify-start">{client.lastVisit}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <div className="flex justify-start">
                    {money(client.totalSpend)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`inline-flex items-center rounded text-xs font-semibold ${
                        client.noShows > 1 ? " text-red-600" : " text-green-600"
                      }`}
                    >
                      {client.noShows}
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  <div className="">No clients found.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPage;
