"use client";

import React, { useMemo, useState } from "react";
import Button from "@/common/Button";

type Money = number;
type Minutes = number;

type AddOn = { name: string; price: Money; duration?: Minutes };
type LevelPrice = { level: string; price: Money };

type ServiceRow = {
  id: string;
  name: string;
  duration: Minutes;
  priceFrom?: Money;
  priceTo?: Money;
  requiresConsult?: boolean;
  staffIds: string[] | null;
  active: boolean;
  description?: string;
  addOns?: AddOn[];
  levelPricing?: LevelPrice[];
};

const fmtPrice = (cents?: Money) =>
  typeof cents === "number"
    ? `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`
    : "";

const fmtPriceRange = (from?: Money, to?: Money, consult?: boolean) => {
  if (consult) return "Consultation";
  if (typeof from === "number" && typeof to === "number" && to > from)
    return `${fmtPrice(from)}–${fmtPrice(to)}`;
  if (typeof from === "number") return `From ${fmtPrice(from)}`;
  if (typeof to === "number") return `Up to ${fmtPrice(to)}`;
  return "—";
};

function Field({ label, data }: { label: string; data: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-bold text-gray-900">{label}</div>
      <div className="text-gray-700">{data}</div>
    </div>
  );
}

export function ServiceDetailsModal({
  service,
  staffLabel,
  onClose,
  onToggleActive,
}: {
  service: ServiceRow;
  staffLabel: (svc: ServiceRow) => string;
  onClose: () => void;
  onToggleActive: () => void | Promise<void>;
}) {
  const [saving, setSaving] = useState(false);

  const fields = useMemo(() => {
    return [
      { label: "Name", data: service.name },
      { label: "Duration", data: `${service.duration} min` },
      {
        label: "Price",
        data: fmtPriceRange(
          service.priceFrom,
          service.priceTo,
          service.requiresConsult
        ),
      },
      { label: "Staff", data: staffLabel(service) },
      {
        label: "Consult Required",
        data: service.requiresConsult ? "Yes" : "No",
      },
      { label: "Description", data: service.description ?? "—" },
      {
        label: "Level Pricing",
        data: service.levelPricing?.length ? (
          <ul className="list-disc pl-5">
            {service.levelPricing.map((lp) => (
              <li key={lp.level}>
                {lp.level}: {fmtPrice(lp.price)}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        ),
      },
      {
        label: "Add-ons",
        data: service.addOns?.length ? (
          <ul className="list-disc pl-5">
            {service.addOns.map((a) => (
              <li key={a.name}>
                {a.name} ({fmtPrice(a.price)}
                {a.duration ? `, ${a.duration} min` : ""})
              </li>
            ))}
          </ul>
        ) : (
          "—"
        ),
      },
    ];
  }, [service, staffLabel]);

  const toggle = async () => {
    try {
      setSaving(true);
      await onToggleActive();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-700">
        Current status:{" "}
        <span
          className={`font-semibold p-1 rounded-full text-gray-100 ${
            service.active === true ? "bg-green-500/80" : "bg-red-500/80"
          }`}
        >
          {service.active ? "Active" : "In Active"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map((f) => (
          <Field key={f.label} label={f.label} data={f.data} />
        ))}
      </div>

      <div className="flex gap-3">
        <Button label="Close" onClick={onClose} />
        <Button
          label={
            saving ? "Saving..." : service.active ? "Deactivate" : "Activate"
          }
          onClick={toggle}
        />
      </div>
    </div>
  );
}
