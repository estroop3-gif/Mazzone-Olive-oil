"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TabNav } from "@/components/admin/ui/TabNav";
import { AdminTable, type Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { MOCK_WHOLESALE_ORDERS } from "@/data/wholesale-mock";
import type { WholesaleOrder } from "@/types";

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

const OPEN_STATUSES = ["submitted", "confirmed", "processing"];

export default function WholesaleOrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? MOCK_WHOLESALE_ORDERS
      : activeTab === "open"
        ? MOCK_WHOLESALE_ORDERS.filter((o) => OPEN_STATUSES.includes(o.status))
        : MOCK_WHOLESALE_ORDERS.filter((o) => o.status === activeTab);

  const columns: Column<WholesaleOrder>[] = [
    {
      key: "po_number",
      label: "PO #",
      render: (o) => (
        <span className="text-gold-700 font-medium">{o.po_number}</span>
      ),
    },
    {
      key: "created_at",
      label: "Date",
      render: (o) =>
        new Date(o.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      key: "items",
      label: "Items",
      render: (o) => o.items.length,
    },
    {
      key: "total_cents",
      label: "Total",
      render: (o) => `$${(o.total_cents / 100).toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      render: (o) => <StatusBadge status={o.status} />,
    },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Orders</h1>

      <TabNav tabs={STATUS_TABS} active={activeTab} onChange={setActiveTab} />

      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(o) => router.push(`/portal/wholesale/orders/${o.id}`)}
        emptyMessage="No orders match this filter."
      />
    </div>
  );
}
