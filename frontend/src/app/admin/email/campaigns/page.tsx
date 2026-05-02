"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Campaign {
  id: string;
  subject: string;
  segment: string;
  status: string;
  sent_date: string;
  opens: number;
  clicks: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "1", subject: "Summer Sale: 20% Off All Oils", segment: "All", status: "sent", sent_date: "Jun 15, 2024", opens: 812, clicks: 156 },
  { id: "2", subject: "June Club Pairing Reveal", segment: "Club", status: "sent", sent_date: "Jun 1, 2024", opens: 38, clicks: 12 },
  { id: "3", subject: "Puglia Tour — 3 Spots Left!", segment: "Newsletter", status: "sent", sent_date: "May 28, 2024", opens: 624, clicks: 89 },
  { id: "4", subject: "New Arrival: Olio Nuovo 2025", segment: "All", status: "sent", sent_date: "May 20, 2024", opens: 756, clicks: 201 },
  { id: "5", subject: "Cooking Class This Saturday", segment: "Newsletter", status: "sent", sent_date: "May 15, 2024", opens: 534, clicks: 67 },
  { id: "6", subject: "July Newsletter Draft", segment: "Newsletter", status: "draft", sent_date: "—", opens: 0, clicks: 0 },
  { id: "7", subject: "Harvest Season Pre-Orders", segment: "All", status: "scheduled", sent_date: "Jul 1, 2024", opens: 0, clicks: 0 },
  { id: "8", subject: "Welcome to Mazzone", segment: "All", status: "sent", sent_date: "May 1, 2024", opens: 1204, clicks: 342 },
];

const columns: Column<Campaign>[] = [
  { key: "subject", label: "Subject", render: (c) => <span className="font-medium text-olive-900">{c.subject}</span> },
  { key: "segment", label: "Segment" },
  { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
  { key: "sent_date", label: "Sent Date" },
  { key: "opens", label: "Opens" },
  { key: "clicks", label: "Clicks" },
];

export default function CampaignList() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Email campaign management"
        action={{ label: "New Campaign", onClick: () => router.push("/admin/email/campaigns/new") }}
        backHref="/admin/email"
      />
      <AdminTable
        columns={columns}
        data={MOCK_CAMPAIGNS}
        onRowClick={(c) => router.push(`/admin/email/campaigns/${c.id}`)}
      />
    </div>
  );
}
