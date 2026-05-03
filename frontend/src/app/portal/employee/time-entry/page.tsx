"use client";

import { useState } from "react";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import {
  MOCK_CURRENT_TIMECARD,
  MOCK_CLOCK_STATUS,
} from "@/data/employee-mock";
import type { TimeEntry } from "@/types";

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

export default function TimeEntryPage() {
  const [isClockedIn, setIsClockedIn] = useState(MOCK_CLOCK_STATUS.isClockedIn);
  const [clockInTime, setClockInTime] = useState(MOCK_CLOCK_STATUS.clockInTime);

  const entries = MOCK_CURRENT_TIMECARD.entries;
  const today = new Date().toISOString().slice(0, 10);
  const todayEntry =
    entries.find((e) => e.date === today) ?? entries[entries.length - 1];

  function handleToggleClock() {
    if (isClockedIn) {
      setIsClockedIn(false);
    } else {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      setClockInTime(`${hh}:${mm}`);
      setIsClockedIn(true);
    }
  }

  const columns: Column<TimeEntry>[] = [
    {
      key: "date",
      label: "Date",
      render: (item) => formatShortDate(item.date),
    },
    { key: "clock_in", label: "Clock In" },
    {
      key: "clock_out",
      label: "Clock Out",
      render: (item) => item.clock_out ?? "\u2014",
    },
    {
      key: "break_minutes",
      label: "Break",
      render: (item) => `${item.break_minutes} min`,
    },
    { key: "total_hours", label: "Hours" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Time Entry</h1>

      {/* Clock Status Panel */}
      <div className="bg-white border border-olive-100 rounded-sm p-6 mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <span
            className={`w-3 h-3 rounded-full inline-block mr-2 ${
              isClockedIn ? "bg-green-500" : "bg-stone"
            }`}
          />
          <span className="text-lg font-medium text-olive-900">
            {isClockedIn ? `Clocked In since ${clockInTime}` : "Clocked Out"}
          </span>
        </div>
        <button
          onClick={handleToggleClock}
          className={`px-8 py-3 rounded-sm text-lg font-medium mt-4 transition-colors ${
            isClockedIn
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>
        {isClockedIn && (
          <div>
            <button className="border border-olive-300 text-olive-700 px-4 py-2 rounded-sm text-sm mt-2 hover:bg-olive-50 transition-colors">
              Start Break
            </button>
          </div>
        )}
      </div>

      {/* Today's Summary */}
      {todayEntry && (
        <div className="bg-white border border-olive-100 rounded-sm p-5 mb-6">
          <h2 className="font-medium text-olive-900 mb-3">
            Today&apos;s Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-stone text-sm">Clock In</span>
              <span className="text-charcoal text-sm font-medium">
                {todayEntry.clock_in}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone text-sm">Clock Out</span>
              <span className="text-charcoal text-sm font-medium">
                {todayEntry.clock_out ?? "\u2014"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone text-sm">Break</span>
              <span className="text-charcoal text-sm font-medium">
                {todayEntry.break_minutes} min
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone text-sm">Total Hours</span>
              <span className="text-charcoal text-sm font-medium">
                {todayEntry.total_hours}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Daily Log */}
      <h2 className="font-medium text-olive-900 mb-3">Daily Log</h2>
      <AdminTable columns={columns} data={entries} />
    </div>
  );
}
