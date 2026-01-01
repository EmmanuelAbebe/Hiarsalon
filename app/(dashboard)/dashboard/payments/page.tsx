// app/payments/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MdOutlinePayment } from "react-icons/md";
import SearchInput from "@/common/SearchInput";
import { NativeDateRangePicker } from "@/common/DateRangePicker";
import { mockPayments } from "@/app/lib/paymentData";

type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
type PaymentMethod = "CARD" | "CASH" | "WALLET" | "BANK_TRANSFER";

type StringRange = { start: string; end: string };

const currency = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100
  );

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

function statusBadgeClass(status: PaymentStatus) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-50 text-green-700 ring-green-600/20";
    case "PENDING":
      return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
    case "FAILED":
      return "bg-red-50 text-red-700 ring-red-600/20";
    case "REFUNDED":
      return "bg-slate-50 text-slate-700 ring-slate-600/20";
  }
}

function methodLabel(method: PaymentMethod) {
  switch (method) {
    case "CARD":
      return "Card";
    case "CASH":
      return "Cash";
    case "WALLET":
      return "Wallet";
    case "BANK_TRANSFER":
      return "Bank transfer";
  }
}

export default function PaymentsPage() {
  const today = useMemo(() => new Date(), []);

  const [range, setRange] = useState<StringRange>(() => {
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(start.getDate() - 7);
    return { start: isoDate(start), end: isoDate(end) };
  });

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    mockPayments[0]?.id ?? ""
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const startMs = range.start?.trim()
      ? new Date(range.start + "T00:00:00.000Z").getTime()
      : NaN;
    const endMs = range.end?.trim()
      ? new Date(range.end + "T23:59:59.999Z").getTime()
      : NaN;

    return (
      mockPayments
        .filter((p) => {
          const t = new Date(p.createdAt).getTime();

          if (Number.isFinite(startMs) && t < startMs) return false;
          if (Number.isFinite(endMs) && t > endMs) return false;

          if (!q) return true;

          return (
            p.clientName.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.status.toLowerCase().includes(q) ||
            p.method.toLowerCase().includes(q)
          );
        })
        // newest first (typical payments list)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    );
  }, [range.start, range.end, query]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId("");
      return;
    }
    if (!selectedId || !filtered.some((p) => p.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = useMemo(() => {
    if (!selectedId) return filtered[0] ?? null;
    return filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null;
  }, [filtered, selectedId]);

  const totals = useMemo(() => {
    const grossRevenueCents = filtered.reduce(
      (sum, p) => sum + p.amountCents,
      0
    );
    const tipCents = filtered.reduce((sum, p) => sum + p.tipCents, 0);
    const transactionCount = filtered.length;
    return { grossRevenueCents, tipCents, transactionCount };
  }, [filtered]);

  return (
    <div className="h-full min-h-0 flex flex-col gap-4">
      <div className="sticky top-0 z-10 bg-white pt-16 border-b border-gray-400 py-4 space-y-4">
        <div className="flex items-center gap-3 min-w-45">
          <MdOutlinePayment size={28} />
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </div>

        <div className="flex flex-col gap-2 mb-4 lg:flex-row w-full">
          <div className="py-6 w-full">
            {/* <SearchInput value={query} onChange={(v: string) => setQuery(v)} /> */}
            <SearchInput />
            <div className="mt-2 text-xs text-slate-600 ps-9.5">
              Filter applies to the list and totals.
            </div>
          </div>

          <NativeDateRangePicker
            value={range}
            onChange={(next: StringRange) => setRange(next)}
          />
        </div>

        <div className="px-2 py-4 flex flex-row items-center gap-6">
          <div className="text-xl font-semibold text-slate-900 mb-2 pe-6 py-3 border-r">
            <p>Total Summary</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 tabular-nums mx-auto">
                {range.start || "—"}
                <span className="mx-1 text-slate-400">→</span>
                {range.end || "—"}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-14 py-3">
            <div>
              <div className="text-xs text-slate-600">Gross revenue</div>
              <div className="text-sm font-bold text-blue-600">
                {currency(totals.grossRevenueCents)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Tips</div>
              <div className="text-sm font-bold text-blue-600">
                {currency(totals.tipCents)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Transactions</div>
              <div className="text-sm font-bold text-blue-600">
                {totals.transactionCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UL/Li list */}
      <div className="overflow-hidden mb-75">
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-slate-600">
            No payments in this range.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((p) => {
              const active = selected?.id === p.id;

              return (
                <li
                  key={p.id}
                  className={[
                    "cursor-pointer hover:bg-blue-400 hover:text-white rounded-md my-2 py-2",
                    active ? "bg-slate-50" : "bg-white",
                  ].join(" ")}
                  onClick={() => setSelectedId(p.id)}
                >
                  <div className="px-4 py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0 w-150">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                          {formatDateTime(p.createdAt)}
                        </div>
                        <div className="text-sm text-slate-700 truncate">
                          {p.clientName}
                        </div>
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ring-1 ring-inset",
                            statusBadgeClass(p.status),
                          ].join(" ")}
                        >
                          {p.status}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <div className="whitespace-nowrap">ID: {p.id}</div>
                        <div className="whitespace-nowrap">
                          Method: {methodLabel(p.method)}
                        </div>
                        <div className="whitespace-nowrap">
                          Tip: {currency(p.tipCents)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-slate-500 whitespace-nowrap">
                          Amount
                        </div>
                        <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                          {currency(p.amountCents)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

{
  /* <div className="w-14 text-right">
  {p.squarePaymentUrl ? (
    <Link
      href={p.squarePaymentUrl}
      target="_blank"
      rel="noreferrer"
      className="text-slate-900 underline underline-offset-2"
      onClick={(e) => e.stopPropagation()}
    >
      View
    </Link>
  ) : (
    <span className="text-slate-400">—</span>
  )}
</div>; */
}
