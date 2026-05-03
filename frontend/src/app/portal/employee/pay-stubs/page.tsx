"use client";

import { useState } from "react";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { MOCK_PAY_STUBS } from "@/data/employee-mock";
import type { PayStub } from "@/types";

function formatShortDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const sortedStubs = [...MOCK_PAY_STUBS].sort(
  (a, b) => new Date(b.pay_date).getTime() - new Date(a.pay_date).getTime()
);

export default function PayStubsPage() {
  const [selectedStub, setSelectedStub] = useState<PayStub | null>(null);

  const columns: Column<PayStub>[] = [
    {
      key: "period",
      label: "Pay Period",
      render: (s) => `${formatShortDate(s.period_start)} — ${formatShortDate(s.period_end)}`,
    },
    {
      key: "pay_date",
      label: "Pay Date",
      render: (s) => formatDate(s.pay_date),
    },
    {
      key: "hours",
      label: "Hours",
      render: (s) =>
        `${s.hours}${s.overtime_hours > 0 ? ` (+${s.overtime_hours} OT)` : ""}`,
    },
    {
      key: "gross_cents",
      label: "Gross",
      render: (s) => formatCurrency(s.gross_cents),
    },
    {
      key: "net_cents",
      label: "Net",
      render: (s) => formatCurrency(s.net_cents),
    },
    {
      key: "download",
      label: "Download",
      render: () => (
        <button
          className="text-gold-700 hover:text-gold-800 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">Pay Stubs</h1>

      <AdminTable
        columns={columns}
        data={sortedStubs}
        onRowClick={(stub) => setSelectedStub(stub)}
      />

      {/* Detail Modal */}
      <AdminModal
        open={!!selectedStub}
        onClose={() => setSelectedStub(null)}
        title="Pay Stub Details"
      >
        {selectedStub && (
          <div>
            <p className="text-sm text-stone mb-4">
              {formatDate(selectedStub.period_start)} — {formatDate(selectedStub.period_end)}
            </p>

            <div className="flex justify-between py-2 border-b border-olive-50">
              <span className="text-sm text-stone">Regular Hours</span>
              <span className="text-sm text-charcoal">{selectedStub.hours}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-olive-50">
              <span className="text-sm text-stone">Overtime Hours</span>
              <span className="text-sm text-charcoal">{selectedStub.overtime_hours}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-olive-50">
              <span className="text-sm text-stone">Gross Pay</span>
              <span className="text-sm text-charcoal">{formatCurrency(selectedStub.gross_cents)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-olive-50">
              <span className="text-sm text-stone">Deductions</span>
              <span className="text-sm text-red-600">-{formatCurrency(selectedStub.deductions_cents)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-olive-50">
              <span className="text-sm text-stone">Taxes</span>
              <span className="text-sm text-red-600">-{formatCurrency(selectedStub.taxes_cents)}</span>
            </div>
            <div className="border-t border-olive-200 my-2" />
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium text-olive-900">Net Pay</span>
              <span className="text-base font-medium text-olive-900">{formatCurrency(selectedStub.net_cents)}</span>
            </div>

            <button
              onClick={() => alert("Downloading PDF...")}
              className="w-full bg-olive-800 text-white py-2 rounded-sm text-sm mt-4"
            >
              Download PDF
            </button>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
