"use client";

import * as React from "react";
import { BsXCircle } from "react-icons/bs";
import { FaXbox } from "react-icons/fa";

type DateRange = {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
};

type Props = {
  value: DateRange;
  onChange: (next: DateRange) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  label?: string;
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

/**
 * Native date-range picker
 * - <input type="date"> only (true native dropdowns)
 * - fully controlled start/end
 * - TailwindCSS styled
 */
export function NativeDateRangePicker({
  value,
  onChange,
  min,
  max,
  disabled,
  label = "Date range",
}: Props) {
  const { start, end } = value;

  const setStart = (nextStart: string) => {
    let next = { start: nextStart, end };
    if (nextStart && end && nextStart > end) next.end = "";
    onChange(next);
  };

  const setEnd = (nextEnd: string) => {
    let next = { start, end: nextEnd };
    if (start && nextEnd && nextEnd < start) next.start = "";
    onChange(next);
  };

  return (
    <div className={cx("p-2", "flex flex-col gap-4", disabled && "opacity-60")}>
      <div className="flex flex-row gap-2 items-center">
        {/* Start */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-600">Start date</span>
          <input
            type="date"
            value={start}
            min={min}
            max={max}
            disabled={disabled}
            onChange={(e) => setStart(e.target.value)}
            className={cx(
              "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900",
              "shadow-sm outline-none transition",
              "focus:border-slate-400 focus:ring-2 focus:ring-slate-200",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>

        {/* End */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-600">End date</span>
          <input
            type="date"
            value={end}
            min={min}
            max={max}
            disabled={disabled}
            onChange={(e) => setEnd(e.target.value)}
            className={cx(
              "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900",
              "shadow-sm outline-none transition",
              "focus:border-slate-400 focus:ring-2 focus:ring-slate-200",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-600 h-3.5"></span>

          <button
            type="button"
            disabled={disabled || (!start && !end)}
            onClick={() => onChange({ start: "", end: "" })}
            className={cx(
              "rounded-lg border border-slate-300 px-3 h-10 text-xs font-medium",
              "bg-white text-slate-700 shadow-sm transition",
              "hover:bg-slate-50",
              "focus:outline-none focus:ring-2 focus:ring-slate-200",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="text-xs text-slate-600 tabular-nums">
            {start || "—"} <span className="mx-1 text-slate-400">→</span>{" "}
            {end || "—"}
          </div>
        </div> */}
    </div>
  );
}
