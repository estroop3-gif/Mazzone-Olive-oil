"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_SHIFTS } from "@/data/employee-mock";

function capitalize(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Returns 7 dates (Mon-Sun) for the week containing Apr 27 2026, offset by weekOffset weeks */
function getWeekDates(weekOffset: number) {
  // Base Monday: Apr 27, 2026
  const base = new Date(2026, 3, 27); // month is 0-indexed
  base.setDate(base.getDate() + weekOffset * 7);
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDateStr(d: Date) {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatShortDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDayName(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDates = getWeekDates(weekOffset);
  const rangeLabel = `${formatShortDate(weekDates[0])} \u2014 ${formatShortDate(weekDates[6])}`;

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Schedule</h1>

      {/* Week navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setWeekOffset((o) => o - 1)}
          className="p-2 rounded-sm border border-olive-200 text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-medium text-olive-900">{rangeLabel}</span>
        <button
          onClick={() => setWeekOffset((o) => o + 1)}
          className="p-2 rounded-sm border border-olive-200 text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 7-day grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDates.map((d) => {
          const dateStr = formatDateStr(d);
          const shift = MOCK_SHIFTS.find((s) => s.date === dateStr);

          return (
            <div
              key={dateStr}
              className="bg-white border border-olive-100 rounded-sm p-4"
            >
              <p className="font-medium text-olive-900 text-sm">
                {formatDayName(d)}
              </p>
              <p className="text-xs text-stone mb-2">{formatShortDate(d)}</p>
              {shift ? (
                <div className="space-y-1.5">
                  <p className="text-sm text-charcoal">
                    {shift.start_time} &ndash; {shift.end_time}
                  </p>
                  <span className="inline-flex bg-olive-50 text-olive-700 text-xs px-2 py-0.5 rounded-full capitalize">
                    {capitalize(shift.department)}
                  </span>
                  <p className="text-xs text-stone">{shift.location}</p>
                </div>
              ) : (
                <p className="text-stone text-sm italic">Day Off</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Link to time off */}
      <div className="mt-6">
        <Link
          href="/portal/employee/time-off"
          className="text-gold-700 text-sm hover:underline"
        >
          Request Time Off &rarr;
        </Link>
      </div>
    </div>
  );
}
