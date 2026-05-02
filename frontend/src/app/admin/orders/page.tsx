"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Clock, Loader2, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { MOCK_ADMIN_ORDERS, AdminOrder } from "@/data/admin-orders";

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Processing", value: "processing" },
  { label: "Packed", value: "packed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const SHIPPING_LABELS: Record<string, string> = {
  pickup: "Pickup",
  flat_rate: "Flat Rate",
  free: "Free",
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = MOCK_ADMIN_ORDERS;
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(q) ||
          o.order_number.toString().includes(q)
      );
    }
    return result;
  }, [statusFilter, search]);

  const stats = useMemo(() => {
    const total = MOCK_ADMIN_ORDERS.length;
    const pending = MOCK_ADMIN_ORDERS.filter((o) => o.status === "pending").length;
    const processing = MOCK_ADMIN_ORDERS.filter(
      (o) => o.status === "processing" || o.status === "packed"
    ).length;
    const revenue = MOCK_ADMIN_ORDERS.filter(
      (o) => o.status !== "cancelled"
    ).reduce((sum, o) => sum + o.total_cents, 0);
    return { total, pending, processing, revenue };
  }, []);

  const columns: Column<AdminOrder>[] = [
    {
      key: "order_number",
      label: "Order #",
      render: (item) => (
        <span className="font-medium text-olive-900">#{item.order_number}</span>
      ),
    },
    {
      key: "customer_name",
      label: "Customer",
      render: (item) => (
        <div>
          <p className="text-olive-900">{item.customer_name}</p>
          <p className="text-stone text-xs">{item.customer_email}</p>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (item) =>
        new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      key: "items",
      label: "Items",
      render: (item) => (
        <span>{item.items.reduce((s, i) => s + i.quantity, 0)}</span>
      ),
    },
    {
      key: "total_cents",
      label: "Total",
      render: (item) => (
        <span className="font-medium">${(item.total_cents / 100).toFixed(2)}</span>
      ),
    },
    {
      key: "shipping_method",
      label: "Shipping",
      render: (item) => (
        <span className="text-xs text-stone">
          {SHIPPING_LABELS[item.shipping_method] ?? item.shipping_method}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="View and manage customer orders."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminCard icon={ShoppingBag} value={stats.total} label="Total Orders" />
        <AdminCard icon={Clock} value={stats.pending} label="Pending" />
        <AdminCard icon={Loader2} value={stats.processing} label="Processing" />
        <AdminCard
          icon={DollarSign}
          value={`$${(stats.revenue / 100).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`}
          label="Revenue (this month)"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search order # or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-olive-500 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-olive-500"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/orders/${item.id}`)}
        emptyMessage="No orders match this filter."
      />
    </div>
  );
}
