"use client";

import dynamic from "next/dynamic";

const RevenueCharts = dynamic(() => import("./RevenueCharts"), { ssr: false });

export type DayMetrics = {
  grossSales: number;
  netSales: number;
  tips: number;
  totalCollected: number;
  avgTicket: number;

  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;

  bookedMins: number;
  availableMins: number;

  revenueByHour: { hour: string; net: number; tips: number }[];
  revenueByCategory: { name: string; value: number }[];
};

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-base border border-gray-200 bg-white p-4">
      <div className="text-xs font-bold text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-blue-500">{value}</div>
    </div>
  );
}

export default function RevenuePanel({ data }: { data: DayMetrics }) {
  const utilization =
    data.availableMins > 0 ? data.bookedMins / data.availableMins : 0;
  const completionRate =
    data.scheduled > 0 ? data.completed / data.scheduled : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi label="Net sales" value={formatMoney(data.netSales)} />
        <Kpi label="Tips" value={formatMoney(data.tips)} />
        <Kpi label="Total collected" value={formatMoney(data.totalCollected)} />
        <Kpi label="Avg ticket" value={formatMoney(data.avgTicket)} />
        <Kpi label="Utilization" value={pct(utilization)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 rounded-base border border-gray-200 bg-white p-4">
          <div className="text-sm font-bold text-gray-900 mb-3">
            Revenue by hour
          </div>
          <RevenueCharts kind="hour" data={data} />
        </div>

        <div className="rounded-base border border-gray-200 bg-white p-4">
          <div className="text-sm font-bold text-gray-900 mb-3">
            Service mix
          </div>
          <RevenueCharts kind="mix" data={data} />
        </div>

        <div className="lg:col-span-3 rounded-base bg-white p-4">
          <div className="text-sm font-bold text-gray-900 mb-3">
            Appointments
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Kpi label="Scheduled" value={`${data.scheduled}`} />
            <Kpi label="Completed" value={`${data.completed}`} />
            <Kpi label="Cancelled" value={`${data.cancelled}`} />
            <Kpi label="No-show" value={`${data.noShow}`} />
            <Kpi label="Completion rate" value={pct(completionRate)} />
          </div>
        </div>
      </div>
    </div>
  );
}
