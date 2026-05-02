"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Subscriber {
  email: string;
  name: string;
  date: string;
  source: string;
  status: string;
}

const MOCK_SUBSCRIBERS: Subscriber[] = [
  { email: "maria.conti@gmail.com", name: "Maria Conti", date: "Jun 12, 2024", source: "website", status: "active" },
  { email: "james.wilson@outlook.com", name: "James Wilson", date: "Jun 10, 2024", source: "checkout", status: "active" },
  { email: "sofia.r@yahoo.com", name: "Sofia Romano", date: "Jun 8, 2024", source: "club", status: "active" },
  { email: "david.chen@gmail.com", name: "David Chen", date: "Jun 5, 2024", source: "website", status: "active" },
  { email: "anna.b@hotmail.com", name: "Anna Bianco", date: "Jun 1, 2024", source: "website", status: "active" },
  { email: "marco.f@gmail.com", name: "Marco Ferrari", date: "May 28, 2024", source: "manual", status: "active" },
  { email: "lisa.parker@gmail.com", name: "Lisa Parker", date: "May 20, 2024", source: "website", status: "active" },
  { email: "tom.harris@outlook.com", name: "Tom Harris", date: "May 15, 2024", source: "checkout", status: "cancelled" },
  { email: "giulia.m@gmail.com", name: "Giulia Moretti", date: "May 10, 2024", source: "club", status: "active" },
  { email: "sarah.j@yahoo.com", name: "Sarah Johnson", date: "May 5, 2024", source: "website", status: "active" },
];

const columns: Column<Subscriber>[] = [
  { key: "email", label: "Email", render: (s) => <span className="font-medium text-olive-900">{s.email}</span> },
  { key: "name", label: "Name" },
  { key: "date", label: "Subscribed" },
  { key: "source", label: "Source", render: (s) => <span className="capitalize">{s.source}</span> },
  { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
];

export default function EmailSubscribers() {
  const [search, setSearch] = useState("");

  const filtered = search
    ? MOCK_SUBSCRIBERS.filter((s) => s.email.includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()))
    : MOCK_SUBSCRIBERS;

  return (
    <div>
      <PageHeader title="Email Subscribers" description="Manage your mailing list" backHref="/admin/email" />

      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subscribers..."
          className="px-3 py-2 border border-olive-200 rounded-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-olive-500"
        />
        <button
          onClick={() => alert("Import subscribers (demo)")}
          className="px-4 py-2 bg-olive-50 text-olive-700 text-sm rounded-sm hover:bg-olive-100"
        >
          Import CSV
        </button>
        <button
          onClick={() => alert("Export subscribers (demo)")}
          className="px-4 py-2 bg-olive-50 text-olive-700 text-sm rounded-sm hover:bg-olive-100"
        >
          Export
        </button>
      </div>

      <AdminTable columns={columns} data={filtered} />
    </div>
  );
}
