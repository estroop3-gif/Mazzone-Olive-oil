"use client";

import Link from "next/link";
import {
  Clock,
  Palmtree,
  CalendarDays,
  CircleDot,
  ClipboardList,
} from "lucide-react";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import {
  MOCK_CURRENT_EMPLOYEE,
  MOCK_CURRENT_TIMECARD,
  MOCK_PTO_BALANCES,
  MOCK_SHIFTS,
  MOCK_CLOCK_STATUS,
  MOCK_ANNOUNCEMENTS,
} from "@/data/employee-mock";

function capitalize(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function EmployeeDashboard() {
  const firstName = MOCK_CURRENT_EMPLOYEE.full_name.split(" ")[0];
  const ptoAvailable = MOCK_PTO_BALANCES.reduce(
    (sum, b) => sum + b.available_hours,
    0
  );

  /* Next shift */
  const today = new Date().toISOString().slice(0, 10);
  const nextShift = [...MOCK_SHIFTS]
    .filter((s) => s.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const nextShiftLabel = nextShift
    ? `${formatShortDate(nextShift.date)} ${nextShift.start_time}`
    : "None";

  /* Today's shift (or closest weekday) */
  const todayShift =
    MOCK_SHIFTS.find((s) => s.date === today) ??
    [...MOCK_SHIFTS].sort(
      (a, b) =>
        Math.abs(new Date(a.date).getTime() - Date.now()) -
        Math.abs(new Date(b.date).getTime() - Date.now())
    )[0];

  const priorityStyles: Record<string, string> = {
    urgent: "bg-red-50 text-red-700 border-red-200",
    important: "bg-gold-50 text-gold-700 border-gold-200",
    normal: "bg-olive-50 text-olive-700 border-olive-200",
  };

  return (
    <div>
      {/* Greeting */}
      <h1 className="font-serif text-2xl text-olive-900">
        Welcome back, {firstName}
      </h1>
      <p className="text-stone text-sm mt-1 mb-6">
        {MOCK_CURRENT_EMPLOYEE.role} &middot;{" "}
        {capitalize(MOCK_CURRENT_EMPLOYEE.department)}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <AdminCard
          icon={Clock}
          value={MOCK_CURRENT_TIMECARD.total_hours}
          label="Hours This Week"
        />
        <AdminCard
          icon={Palmtree}
          value={ptoAvailable}
          label="PTO Available"
        />
        <AdminCard
          icon={CalendarDays}
          value={nextShiftLabel}
          label="Next Shift"
        />
        <AdminCard
          icon={CircleDot}
          value={MOCK_CLOCK_STATUS.isClockedIn ? "Clocked In" : "Clocked Out"}
          label="Clock Status"
        />
      </div>

      {/* Today's Schedule */}
      <div className="bg-white border border-olive-100 rounded-sm p-5 mb-5">
        <h2 className="font-medium text-olive-900 mb-3">
          Today&apos;s Schedule
        </h2>
        {todayShift ? (
          <div className="text-sm text-charcoal space-y-1">
            <p>
              <span className="text-stone">Time:</span>{" "}
              {todayShift.start_time} &ndash; {todayShift.end_time}
            </p>
            <p>
              <span className="text-stone">Department:</span>{" "}
              {capitalize(todayShift.department)}
            </p>
            <p>
              <span className="text-stone">Location:</span>{" "}
              {todayShift.location}
            </p>
          </div>
        ) : (
          <p className="text-stone text-sm">No shift scheduled today</p>
        )}
      </div>

      {/* Announcements */}
      <div className="space-y-3 mb-5">
        <h2 className="font-medium text-olive-900 mb-3">Announcements</h2>
        {MOCK_ANNOUNCEMENTS.map((ann) => (
          <div
            key={ann.id}
            className="bg-white border border-olive-100 rounded-sm p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${
                  priorityStyles[ann.priority] ?? priorityStyles.normal
                }`}
              >
                {capitalize(ann.priority)}
              </span>
              <span className="font-medium text-olive-900 text-sm">
                {ann.title}
              </span>
            </div>
            <p className="text-sm text-stone mt-1">{ann.body}</p>
            <p className="text-xs text-stone mt-2">
              {ann.author} &middot;{" "}
              {new Date(ann.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <Link
          href="/portal/employee/time-entry"
          className="bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-800 flex items-center gap-2 hover:bg-olive-100 transition-colors"
        >
          <Clock size={16} />
          Clock In/Out
        </Link>
        <Link
          href="/portal/employee/timecards"
          className="bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-800 flex items-center gap-2 hover:bg-olive-100 transition-colors"
        >
          <ClipboardList size={16} />
          Submit Timecard
        </Link>
        <Link
          href="/portal/employee/time-off"
          className="bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-800 flex items-center gap-2 hover:bg-olive-100 transition-colors"
        >
          <Palmtree size={16} />
          Request Time Off
        </Link>
      </div>
    </div>
  );
}
