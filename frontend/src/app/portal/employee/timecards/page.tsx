"use client";

import { useState } from "react";
import { TabNav } from "@/components/admin/ui/TabNav";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import {
  MOCK_CURRENT_TIMECARD,
  MOCK_PAST_TIMECARDS,
} from "@/data/employee-mock";
import type { Timecard } from "@/types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDayName(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function formatTimestamp(ts: string | null) {
  if (!ts) return "\u2014";
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TimecardsPage() {
  const [activeTab, setActiveTab] = useState("current");

  const tabs = [
    { label: "Current Week", value: "current" },
    { label: "History", value: "history" },
  ];

  const entries = MOCK_CURRENT_TIMECARD.entries;

  const historyColumns: Column<Timecard>[] = [
    {
      key: "week",
      label: "Week",
      render: (item) =>
        `${formatDate(item.week_start)} \u2014 ${formatDate(item.week_end)}`,
    },
    { key: "total_hours", label: "Hours" },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "submitted_at",
      label: "Submitted",
      render: (item) => formatTimestamp(item.submitted_at ?? null),
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Timecards</h1>

      <TabNav tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === "current" && (
        <div className="bg-white border border-olive-100 rounded-sm p-5">
          <h2 className="font-medium text-olive-900 mb-4">
            {formatDate(MOCK_CURRENT_TIMECARD.week_start)} &mdash;{" "}
            {formatDate(MOCK_CURRENT_TIMECARD.week_end)}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-olive-100 bg-olive-50/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                    In
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                    Out
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                    Break
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone uppercase tracking-wider">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-olive-50 last:border-0"
                  >
                    <td className="px-4 py-3">
                      {formatDayName(entry.date)} {formatDate(entry.date)}
                    </td>
                    <td className="px-4 py-3">{entry.clock_in}</td>
                    <td className="px-4 py-3">
                      {entry.clock_out ?? "\u2014"}
                    </td>
                    <td className="px-4 py-3">{entry.break_minutes} min</td>
                    <td className="px-4 py-3">{entry.total_hours}</td>
                  </tr>
                ))}
                <tr className="bg-olive-50/30 font-bold">
                  <td className="px-4 py-3" colSpan={4}>
                    Weekly Total
                  </td>
                  <td className="px-4 py-3">
                    {MOCK_CURRENT_TIMECARD.total_hours}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={() => alert("Timecard submitted!")}
            className="bg-olive-800 text-white px-4 py-2.5 rounded-sm text-sm mt-4 hover:bg-olive-900 transition-colors"
          >
            Submit Timecard
          </button>
        </div>
      )}

      {activeTab === "history" && (
        <AdminTable
          columns={historyColumns}
          data={MOCK_PAST_TIMECARDS}
          emptyMessage="No past timecards"
        />
      )}
    </div>
  );
}
