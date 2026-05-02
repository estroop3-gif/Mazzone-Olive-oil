"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { TabNav } from "@/components/admin/ui/TabNav";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  capacity: number;
  booked: number;
  price: number;
  status: string;
}

const TYPE_LABELS: Record<string, string> = {
  wine_tasting: "Wine Tasting",
  cooking_class: "Cooking Class",
  language_class: "Language Class",
  workshop: "Workshop",
  dinner: "Dinner",
  market: "Market",
  series: "Series",
  private: "Private Tasting",
};

const MOCK_EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Sicilian Wine & Oil Pairing",
    type: "wine_tasting",
    date: "2026-06-07T18:00:00",
    location: "Mazzone Tasting Room, Brooklyn",
    capacity: 24,
    booked: 22,
    price: 85,
    status: "upcoming",
  },
  {
    id: "evt-2",
    title: "Summer Pasta Class",
    type: "cooking_class",
    date: "2026-06-14T11:00:00",
    location: "Mazzone Kitchen Studio, Brooklyn",
    capacity: 16,
    booked: 14,
    price: 120,
    status: "upcoming",
  },
  {
    id: "evt-3",
    title: "Italian for the Table",
    type: "language_class",
    date: "2026-06-21T10:00:00",
    location: "Mazzone Tasting Room, Brooklyn",
    capacity: 20,
    booked: 8,
    price: 45,
    status: "upcoming",
  },
  {
    id: "evt-4",
    title: "Limoncello Workshop",
    type: "workshop",
    date: "2026-07-05T14:00:00",
    location: "Mazzone Kitchen Studio, Brooklyn",
    capacity: 12,
    booked: 12,
    price: 95,
    status: "upcoming",
  },
  {
    id: "evt-5",
    title: "Harvest Dinner",
    type: "dinner",
    date: "2026-10-18T19:00:00",
    location: "Rooftop Terrace, Manhattan",
    capacity: 40,
    booked: 15,
    price: 195,
    status: "scheduled",
  },
  {
    id: "evt-6",
    title: "Union Square Market",
    type: "market",
    date: "2026-05-10T08:00:00",
    location: "Union Square Greenmarket, NYC",
    capacity: 0,
    booked: 0,
    price: 0,
    status: "confirmed",
  },
  {
    id: "evt-7",
    title: "Fall Cooking Series",
    type: "series",
    date: "2026-09-06T11:00:00",
    location: "Mazzone Kitchen Studio, Brooklyn",
    capacity: 16,
    booked: 4,
    price: 350,
    status: "draft",
  },
  {
    id: "evt-8",
    title: "Private Tasting",
    type: "private",
    date: "2026-04-12T17:00:00",
    location: "Client Residence, Upper East Side",
    capacity: 10,
    booked: 10,
    price: 150,
    status: "confirmed",
  },
];

const TABS = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
  { label: "All", value: "all" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventsPage() {
  const router = useRouter();
  const [tab, setTab] = useState("upcoming");

  const now = new Date();
  const filtered =
    tab === "all"
      ? MOCK_EVENTS
      : tab === "upcoming"
        ? MOCK_EVENTS.filter((e) => new Date(e.date) >= now)
        : MOCK_EVENTS.filter((e) => new Date(e.date) < now);

  const columns: Column<Event>[] = [
    { key: "title", label: "Title", render: (e) => <span className="font-medium text-olive-900">{e.title}</span> },
    { key: "type", label: "Type", render: (e) => <span className="text-stone">{TYPE_LABELS[e.type] ?? e.type}</span> },
    { key: "date", label: "Date", render: (e) => formatDate(e.date) },
    { key: "location", label: "Location" },
    { key: "capacity", label: "Capacity", render: (e) => (e.capacity > 0 ? e.capacity : "—") },
    { key: "booked", label: "Booked", render: (e) => (e.capacity > 0 ? e.booked : "—") },
    {
      key: "price",
      label: "Price",
      render: (e) => (e.price > 0 ? `$${e.price}` : "Free"),
    },
    { key: "status", label: "Status", render: (e) => <StatusBadge status={e.status} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Events"
        description="Tastings, classes, dinners, and workshops"
        action={{ label: "Create Event", onClick: () => router.push("/admin/events/new") }}
      />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />
      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(e) => router.push(`/admin/events/${e.id}`)}
        emptyMessage="No events found"
      />
    </div>
  );
}
