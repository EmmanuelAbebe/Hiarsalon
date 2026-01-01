"use client";

import Button from "@/common/Button";
import { useModalActions } from "@/common/modal/useModal";
import SearchInput from "@/common/SearchInput";
import React, { useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";
import {
  CategorySection,
  buildSections,
  ServiceRow,
  STATIC_SERVICE_LISTING,
  Money,
  Minutes,
} from "../../../lib/servicesData";

const fmtPrice = (cents?: Money) =>
  typeof cents === "number"
    ? `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`
    : "";

const fmtPriceRange = (from?: Money, to?: Money, consult?: boolean) => {
  if (consult) return "Consultation";
  if (typeof from === "number" && typeof to === "number" && to > from)
    return `${fmtPrice(from)}–${fmtPrice(to)}`;
  if (typeof from === "number") return `${fmtPrice(from)}+`;
  if (typeof to === "number") return `Up to ${fmtPrice(to)}`;
  return "—";
};

const fmtDuration = (mins: Minutes) => {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};

type Staff = { id: string; name: string };

const staff: Staff[] = [
  { id: "s1", name: "Alex" },
  { id: "s2", name: "Sam" },
  { id: "s3", name: "Jordan" },
];

export default function ServicesPage() {
  const {
    openServiceDetails,
    openServiceCreate,
    openServiceCatagoryCreate,
    openServiceCatagoryDetails,
  } = useModalActions();

  const [query, setQuery] = useState("");
  const [sections, setSections] = useState<CategorySection[]>(() =>
    buildSections(STATIC_SERVICE_LISTING)
  );

  const staffNameById = useMemo(() => {
    const m = new Map<string, string>();
    for (const s of staff) m.set(s.id, s.name);
    return m;
  }, []);

  const staffLabel = (svc: ServiceRow) => {
    if (svc.staffIds === null) return "Any";
    if (svc.staffIds.length === 0) return "—";
    return svc.staffIds.map((id) => staffNameById.get(id) ?? "—").join(", ");
  };

  const toggleActive = (categoryId: string, serviceId: string) => {
    setSections((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          services: cat.services.map((svc) =>
            svc.id === serviceId ? { ...svc, active: !svc.active } : svc
          ),
        };
      })
    );
  };

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    return sections
      .map((sec) => {
        const services = sec.services.filter((svc) => {
          const staffNames =
            svc.staffIds === null
              ? "any"
              : svc.staffIds.map((id) => staffNameById.get(id) ?? "").join(" ");
          return (
            svc.service.toLowerCase().includes(q) ||
            sec.serviceCatagory.toLowerCase().includes(q) ||
            staffNames.toLowerCase().includes(q) ||
            (svc.description ?? "").toLowerCase().includes(q)
          );
        });
        return { ...sec, services };
      })
      .filter((sec) => sec.services.length > 0);
  }, [sections, query, staffNameById]);

  const updateService = (categoryId: string, updated: ServiceRow) => {
    setSections((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              services: cat.services.map((svc) =>
                svc.id === updated.id ? updated : svc
              ),
            }
      )
    );
  };

  return (
    <div className="h-full flex flex-col gap-6 py-16">
      <div className="sticky top-0 z-10 bg-white pt-16 border-b border-gray-200 py-4 space-y-4">
        <div className="flex items-center gap-3 min-w-[180px]">
          <MdHomeRepairService size={28} />
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchInput />
            {/* if your SearchInput supports value/onChange, wire it:
                <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
             */}
          </div>

          <div className="flex items-center gap-2 min-w-[240px] justify-end">
            <Button
              label={
                <span className="flex items-center gap-2">
                  <IoMdAdd size={16} />
                  <span>New service</span>
                </span>
              }
            />
            <Button
              label={
                <span className="flex items-center gap-2">
                  <IoMdAdd size={16} />
                  <span>New category</span>
                </span>
              }
            />
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-8 overflow-auto">
        {filteredSections.map((sec) => (
          <li
            key={sec.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-gray-900">
                  {sec.serviceCatagory}
                </h2>
                <span className="text-xs text-gray-500">
                  ({sec.services.length})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  label={
                    <span className="flex items-center gap-2">
                      <IoMdAdd size={16} />
                      <span>Add service</span>
                    </span>
                  }
                  onClick={() => openServiceCreate()}
                />
              </div>
            </div>

            <div className="border border-gray-200/99">
              <div className="px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6">Services</div>
                  <div className="col-span-3">Duration</div>
                  <div className="col-span-3">Price</div>
                </div>
              </div>

              <ul className="m-0 px-4 py-3 space-y-2">
                {sec.services.map((svc) => (
                  <li
                    key={svc.id}
                    className="p-3 rounded-md hover:bg-blue-400/60 border border-gray-200/70 cursor-pointer"
                    onClick={() => openServiceDetails(sec.id, svc.id)}
                  >
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-6 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {svc.service}
                        </p>
                      </div>

                      <div className="col-span-3 text-slate-700">
                        {fmtDuration(svc.duration)}
                      </div>

                      <div className="col-span-3 text-slate-700">
                        {fmtPriceRange(
                          svc.priceFrom,
                          svc.priceTo,
                          svc.requiresConsult
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
