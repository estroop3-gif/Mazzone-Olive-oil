"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_EPISODES } from "@/data/media-mock";
import { MOCK_SUBSCRIBER_STATS } from "@/data/media-mock";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Film, Eye, Users, DollarSign, Star } from "lucide-react";
import type { Episode } from "@/types";

const STATS = [
  { icon: Film, value: MOCK_SUBSCRIBER_STATS.total_episodes, label: "Total Episodes" },
  { icon: Eye, value: MOCK_SUBSCRIBER_STATS.published_episodes, label: "Published" },
  { icon: Users, value: MOCK_SUBSCRIBER_STATS.total_subscribers.toLocaleString(), label: "Subscribers" },
  { icon: DollarSign, value: `$${(MOCK_SUBSCRIBER_STATS.monthly_revenue_cents / 100).toLocaleString()}`, label: "MRR" },
];

const columns: Column<Episode>[] = [
  {
    key: "thumbnail",
    label: "",
    className: "w-16",
    render: () => (
      <div className="w-12 h-8 bg-olive-100 rounded-sm flex items-center justify-center">
        <Film size={14} className="text-olive-400" />
      </div>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (ep) => <span className="font-medium text-charcoal">{ep.title}</span>,
  },
  {
    key: "episode",
    label: "Episode",
    render: (ep) => (
      <span className="text-stone">S{String(ep.season).padStart(2, "0")}E{String(ep.episode_number).padStart(2, "0")}</span>
    ),
  },
  {
    key: "duration_minutes",
    label: "Duration",
    render: (ep) => <span className="text-stone">{ep.duration_minutes} min</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (ep) => <StatusBadge status={ep.status} />,
  },
  {
    key: "is_featured",
    label: "",
    className: "w-10",
    render: (ep) => ep.is_featured ? <Star size={14} className="text-gold-500 fill-gold-500" /> : null,
  },
  {
    key: "published_at",
    label: "Date",
    render: (ep) => (
      <span className="text-stone text-xs">
        {ep.published_at
          ? new Date(ep.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "—"}
      </span>
    ),
  },
];

export default function AdminMediaPage() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="Media"
        description="Manage The Mazzone Olive Oil Show"
        action={{ label: "Add Episode", onClick: () => router.push("/admin/media/new") }}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => (
          <AdminCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Episodes Table */}
      <AdminTable
        columns={columns}
        data={MOCK_EPISODES}
        onRowClick={(ep) => router.push(`/admin/media/${ep.id}`)}
        emptyMessage="No episodes yet"
      />
    </div>
  );
}
