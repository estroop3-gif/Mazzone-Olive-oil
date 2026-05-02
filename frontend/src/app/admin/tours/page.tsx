"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Tour {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  capacity: number;
  booked: number;
  waitlist: number;
  revenue: number;
  status: string;
}

const MOCK_TOURS: Tour[] = [
  {
    id: "tour-1",
    name: "Puglia Homeland",
    start_date: "2026-08-15",
    end_date: "2026-08-22",
    capacity: 12,
    booked: 10,
    waitlist: 3,
    revenue: 18600,
    status: "upcoming",
  },
  {
    id: "tour-2",
    name: "Piemonte Wine & Truffles",
    start_date: "2026-09-10",
    end_date: "2026-09-17",
    capacity: 10,
    booked: 7,
    waitlist: 0,
    revenue: 13650,
    status: "upcoming",
  },
  {
    id: "tour-3",
    name: "Sicilian Culinary Journey",
    start_date: "2026-10-05",
    end_date: "2026-10-12",
    capacity: 14,
    booked: 4,
    waitlist: 0,
    revenue: 8400,
    status: "scheduled",
  },
  {
    id: "tour-4",
    name: "Sicily Unveiled",
    start_date: "2026-11-01",
    end_date: "2026-11-08",
    capacity: 12,
    booked: 0,
    waitlist: 0,
    revenue: 0,
    status: "draft",
  },
];

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export default function ToursPage() {
  const router = useRouter();

  const columns: Column<Tour>[] = [
    { key: "name", label: "Tour", render: (t) => <span className="font-medium text-olive-900">{t.name}</span> },
    { key: "dates", label: "Dates", render: (t) => formatDateRange(t.start_date, t.end_date) },
    { key: "capacity", label: "Capacity" },
    { key: "booked", label: "Booked" },
    { key: "waitlist", label: "Waitlist", render: (t) => (t.waitlist > 0 ? t.waitlist : "—") },
    {
      key: "revenue",
      label: "Revenue",
      render: (t) => (t.revenue > 0 ? `$${t.revenue.toLocaleString()}` : "—"),
    },
    { key: "status", label: "Status", render: (t) => <StatusBadge status={t.status} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Tours"
        description="Italian culinary and cultural tours"
        action={{ label: "Create Tour", onClick: () => router.push("/admin/tours/new") }}
      />
      <AdminTable
        columns={columns}
        data={MOCK_TOURS}
        onRowClick={(t) => router.push(`/admin/tours/${t.id}`)}
        emptyMessage="No tours found"
      />
    </div>
  );
}
