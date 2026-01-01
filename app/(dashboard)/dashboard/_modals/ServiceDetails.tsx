"use client";

import {
  findServiceByIds,
  formatMoney,
  Service,
  ServiceStatus,
} from "@/app/lib/servicesData";
import Button from "@/common/Button";
import React, { useEffect, useMemo, useState } from "react";

export default function ServiceDetails({
  catagoryid,
  serviceid,
  onClose,
  onSetStatus,
}: {
  catagoryid: string;
  serviceid: string;
  onClose: () => void;
  onSetStatus?: (
    serviceid: string,
    status: ServiceStatus
  ) => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<ServiceStatus>("inactive");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const { svc } = findServiceByIds(catagoryid, serviceid);

    if (!svc) {
      setError("Not found");
      setLoading(false);
      return;
    }

    setStatus(svc.active ? "active" : "inactive");

    setDetail({
      service: svc.service,
      priceFrom: svc.priceFrom,
      priceTo: svc.priceTo,
      duration: svc.duration,
      description: svc.description,
      addOns: svc.addOns,
      requiresConsult: svc.requiresConsult,
      levelPricing: svc.levelPricing,
      active: svc.active,
    });

    setStatus(svc.active ? "active" : "inactive");
    setLoading(false);
  }, [catagoryid, serviceid]);

  const toggleStatus = async () => {
    const next: ServiceStatus = status === "active" ? "inactive" : "active";
    try {
      setSaving(true);
      setStatus(next);
      if (onSetStatus) await onSetStatus(serviceid, next);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const fields = useMemo(() => {
    if (!detail) return [];

    const price =
      detail.priceFrom != null && detail.priceTo != null
        ? `${formatMoney(detail.priceFrom)} – ${formatMoney(detail.priceTo)}`
        : detail.priceFrom != null
        ? formatMoney(detail.priceFrom)
        : detail.priceTo != null
        ? formatMoney(detail.priceTo)
        : "—";

    return [
      { label: "Service", data: detail.service },
      { label: "Duration", data: `${detail.duration} min` },
      { label: "Price Range", data: price },
      {
        label: "Consult Required",
        data: detail.requiresConsult ? "Yes" : "No",
      },
      { label: "Description", data: detail.description ?? "—" },
      {
        label: "Level Pricing",
        data: detail.levelPricing?.length ? (
          <ul className="list-disc pl-5">
            {detail.levelPricing.map((lp) => (
              <li key={lp.level}>
                {lp.level}: {formatMoney(lp.price)}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        ),
      },
      {
        label: "Add-ons",
        data: detail.addOns?.length ? (
          <ul className="list-disc pl-5">
            {detail.addOns.map((a) => (
              <li key={a.name}>
                {a.name} ({formatMoney(a.price)}
                {a.duration ? `, ${a.duration} min` : ""})
              </li>
            ))}
          </ul>
        ) : (
          "—"
        ),
      },
    ];
  }, [detail]);

  if (loading) return <div className="text-gray-700">Loading details…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!detail) return null;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-700">
        Current status:{" "}
        <span
          className={`font-semibold p-1 rounded-full text-gray-100 ${
            status === "active" ? "bg-green-500/80" : "bg-red-500/80"
          }`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4">
          {fields.map((f) => (
            <FieldRow key={f.label} label={f.label} data={f.data} />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button label="Close" onClick={onClose} />
        <Button
          label={
            saving
              ? "Saving..."
              : status === "active"
              ? "Deactivate"
              : "Activate"
          }
          onClick={toggleStatus}
        />
      </div>
    </div>
  );
}

function FieldRow({ label, data }: { label: string; data: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 py-2 border-b border-gray-200">
      <div className="text-sm font-bold text-gray-900">{label}</div>
      <div className="text-sm text-gray-700">{data}</div>
    </div>
  );
}
