"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  started: string;
  nextBilling: string;
}

const SUBSCRIBERS: Subscriber[] = [
  { id: "1", name: "Maria Conti", email: "maria.conti@email.it", plan: "Duo", status: "active", started: "2024-11-15", nextBilling: "2026-06-15" },
  { id: "2", name: "Paolo Rossi", email: "paolo.rossi@email.it", plan: "Collezione", status: "active", started: "2024-08-01", nextBilling: "2026-06-01" },
  { id: "3", name: "Francesca Leone", email: "francesca.l@email.it", plan: "Singolo", status: "active", started: "2025-01-10", nextBilling: "2026-06-10" },
  { id: "4", name: "Giovanni Bianchi", email: "g.bianchi@email.it", plan: "Duo", status: "paused", started: "2024-06-20", nextBilling: "—" },
  { id: "5", name: "Elena Moretti", email: "elena.m@email.it", plan: "Singolo", status: "active", started: "2025-03-05", nextBilling: "2026-06-05" },
  { id: "6", name: "Luca Ferraro", email: "luca.ferraro@email.it", plan: "Singolo", status: "cancelled", started: "2024-09-12", nextBilling: "—" },
  { id: "7", name: "Chiara De Luca", email: "chiara.dl@email.it", plan: "Duo", status: "active", started: "2024-12-01", nextBilling: "2026-06-01" },
  { id: "8", name: "Marco Esposito", email: "m.esposito@email.it", plan: "Collezione", status: "active", started: "2025-02-14", nextBilling: "2026-06-14" },
  { id: "9", name: "Alessandra Ricci", email: "a.ricci@email.it", plan: "Singolo", status: "active", started: "2024-07-22", nextBilling: "2026-06-22" },
  { id: "10", name: "Antonio Greco", email: "antonio.g@email.it", plan: "Duo", status: "active", started: "2025-04-01", nextBilling: "2026-06-01" },
  { id: "11", name: "Sofia Colombo", email: "sofia.c@email.it", plan: "Collezione", status: "paused", started: "2024-10-18", nextBilling: "—" },
  { id: "12", name: "Matteo Marino", email: "matteo.m@email.it", plan: "Singolo", status: "active", started: "2025-01-28", nextBilling: "2026-06-28" },
];

const columns: Column<Subscriber>[] = [
  { key: "name", label: "Name", render: (s) => <span className="font-medium text-olive-900">{s.name}</span> },
  { key: "email", label: "Email" },
  { key: "plan", label: "Plan" },
  { key: "status", label: "Status", render: (item) => <StatusBadge status={item.status} /> },
  { key: "started", label: "Started" },
  { key: "nextBilling", label: "Next Billing" },
];

export default function ClubSubscribers() {
  const router = useRouter();
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = SUBSCRIBERS.filter((s) => {
    if (planFilter !== "all" && s.plan.toLowerCase() !== planFilter) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Club Subscribers" description="Manage Il Club Mazzone members." backHref="/admin/club" />

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-olive-800">Plan:</label>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-1.5 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500"
          >
            <option value="all">All Plans</option>
            <option value="singolo">Singolo</option>
            <option value="duo">Duo</option>
            <option value="collezione">Collezione</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-olive-800">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(s) => router.push(`/admin/club/subscribers/${s.id}`)}
        emptyMessage="No subscribers match your filters."
      />
    </div>
  );
}
