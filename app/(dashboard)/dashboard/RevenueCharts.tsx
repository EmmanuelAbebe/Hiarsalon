"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { DayMetrics } from "./RevenuePanel";

function money(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function RevenueCharts({
  kind,
  data,
}: {
  kind: "hour" | "mix";
  data: DayMetrics;
}) {
  if (kind === "hour") {
    return (
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data.revenueByHour}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip formatter={(v: any) => money(Number(v))} />
            <Bar dataKey="net" />
            <Bar dataKey="tips" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // mix
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip formatter={(v: any) => money(Number(v))} />
          <Pie
            data={data.revenueByCategory}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
