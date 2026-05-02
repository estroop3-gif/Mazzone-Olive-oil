"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Users, Send, Eye, MousePointer } from "lucide-react";

const STATS = [
  { icon: Users, value: "1,847", label: "Subscribers", trend: { value: "+124", up: true } },
  { icon: Send, value: "23", label: "Campaigns Sent", trend: { value: "+3 this month", up: true } },
  { icon: Eye, value: "42%", label: "Avg Open Rate", trend: { value: "+2.1%", up: true } },
  { icon: MousePointer, value: "8.7%", label: "Avg Click Rate", trend: { value: "+0.8%", up: true } },
];

interface Campaign {
  id: string;
  subject: string;
  segment: string;
  status: string;
  sent_date: string;
  opens: number;
  clicks: number;
}

const RECENT_CAMPAIGNS: Campaign[] = [
  { id: "1", subject: "Summer Sale: 20% Off All Oils", segment: "All", status: "sent", sent_date: "Jun 15", opens: 812, clicks: 156 },
  { id: "2", subject: "June Club Pairing Reveal", segment: "Club", status: "sent", sent_date: "Jun 1", opens: 38, clicks: 12 },
  { id: "3", subject: "Puglia Tour — 3 Spots Left!", segment: "Newsletter", status: "sent", sent_date: "May 28", opens: 624, clicks: 89 },
  { id: "4", subject: "New Arrival: Olio Nuovo 2025", segment: "All", status: "sent", sent_date: "May 20", opens: 756, clicks: 201 },
  { id: "5", subject: "Cooking Class This Saturday", segment: "Newsletter", status: "sent", sent_date: "May 15", opens: 534, clicks: 67 },
];

const columns: Column<Campaign>[] = [
  { key: "subject", label: "Subject", render: (c) => <span className="font-medium text-olive-900">{c.subject}</span> },
  { key: "segment", label: "Segment" },
  { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
  { key: "sent_date", label: "Sent" },
  { key: "opens", label: "Opens" },
  { key: "clicks", label: "Clicks" },
];

const LINKS = [
  { label: "Campaigns", href: "/admin/email/campaigns" },
  { label: "Subscribers", href: "/admin/email/subscribers" },
  { label: "Templates", href: "/admin/email/templates" },
  { label: "Generate Newsletter", href: "/admin/email/generate" },
];

export default function EmailDashboard() {
  return (
    <div>
      <PageHeader title="Email Marketing" description="Campaigns, subscribers, and engagement" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map((s) => (
          <AdminCard key={s.label} {...s} />
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="px-4 py-2 bg-olive-50 text-olive-700 text-sm rounded-sm hover:bg-olive-100 transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <h2 className="font-serif text-lg text-olive-900 mb-3">Recent Campaigns</h2>
      <AdminTable columns={columns} data={RECENT_CAMPAIGNS} />
    </div>
  );
}
