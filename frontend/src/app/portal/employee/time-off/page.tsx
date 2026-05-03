"use client";

import { useState } from "react";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { MOCK_PTO_BALANCES, MOCK_PTO_REQUESTS } from "@/data/employee-mock";
import type { PTORequest } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimestamp(isoStr: string) {
  return new Date(isoStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TimeOffPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const columns: Column<PTORequest>[] = [
    {
      key: "type",
      label: "Type",
      render: (r) => <span className="capitalize">{r.type}</span>,
    },
    {
      key: "dates",
      label: "Dates",
      render: (r) => `${formatDate(r.start_date)} — ${formatDate(r.end_date)}`,
    },
    { key: "hours", label: "Hours" },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "created_at",
      label: "Submitted",
      render: (r) => formatTimestamp(r.created_at),
    },
  ];

  function handleSubmit() {
    alert("Request submitted!");
    setModalOpen(false);
    setType("");
    setStartDate("");
    setEndDate("");
    setHours("");
    setNotes("");
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Time Off</h1>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {MOCK_PTO_BALANCES.map((b) => {
          const pct = b.accrued_hours > 0 ? (b.used_hours / b.accrued_hours) * 100 : 0;
          return (
            <div key={b.type} className="bg-white border border-olive-100 rounded-sm p-5">
              <p className="font-medium text-olive-900 capitalize">{b.type}</p>
              <p className="text-2xl font-serif text-olive-900 mt-1">
                {b.available_hours}
                <span className="text-xs text-stone ml-1">hours</span>
              </p>
              <div className="bg-olive-100 h-2 rounded-full mt-3">
                <div
                  className="bg-olive-600 h-2 rounded-full"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <p className="text-xs text-stone mt-1">
                Used {b.used_hours}h of {b.accrued_hours}h
              </p>
            </div>
          );
        })}
      </div>

      {/* Request Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-olive-800 text-white px-4 py-2.5 rounded-sm text-sm mb-6"
      >
        Request Time Off
      </button>

      {/* Request Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Request Time Off">
        <div className="space-y-4">
          <AdminFormField
            label="Type"
            type="select"
            value={type}
            onChange={setType}
            required
            options={[
              { label: "Vacation", value: "vacation" },
              { label: "Sick", value: "sick" },
              { label: "Personal", value: "personal" },
            ]}
          />
          <AdminFormField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
            required
          />
          <AdminFormField
            label="End Date"
            type="date"
            value={endDate}
            onChange={setEndDate}
            required
          />
          <AdminFormField
            label="Hours"
            type="number"
            value={hours}
            onChange={setHours}
            required
          />
          <AdminFormField
            label="Notes"
            type="textarea"
            value={notes}
            onChange={setNotes}
            placeholder="Optional notes..."
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-olive-800 text-white py-2.5 rounded-sm text-sm"
          >
            Submit Request
          </button>
        </div>
      </AdminModal>

      {/* Request History */}
      <AdminTable columns={columns} data={MOCK_PTO_REQUESTS} />
    </div>
  );
}
