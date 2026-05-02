"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface OrderItem {
  name: string;
  quantity: number;
  unit_price_cents: number;
}

interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  date: string;
  items: OrderItem[];
  total_cents: number;
  status: string;
}

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ord_001",
    order_number: 1047,
    customer_name: "Elena Bianchi",
    date: "2026-04-30",
    items: [
      { name: "Nocellara Extra Virgin Olive Oil", quantity: 2, unit_price_cents: 3495 },
      { name: "Balsamico Tradizionale di Modena", quantity: 1, unit_price_cents: 3895 },
    ],
    total_cents: 10885,
    status: "shipped",
  },
  {
    id: "ord_002",
    order_number: 1046,
    customer_name: "Marco Castellani",
    date: "2026-04-29",
    items: [
      { name: "The Essentials Gift Set", quantity: 1, unit_price_cents: 7995 },
    ],
    total_cents: 7995,
    status: "delivered",
  },
  {
    id: "ord_003",
    order_number: 1045,
    customer_name: "Sarah Mitchell",
    date: "2026-04-29",
    items: [
      { name: "Olio al Limone", quantity: 3, unit_price_cents: 2895 },
      { name: "White Wine Vinegar — Aged", quantity: 1, unit_price_cents: 1895 },
    ],
    total_cents: 10580,
    status: "processing",
  },
  {
    id: "ord_004",
    order_number: 1044,
    customer_name: "Giulia Ferraro",
    date: "2026-04-28",
    items: [
      { name: "Blend Classico EVOO", quantity: 1, unit_price_cents: 2495 },
    ],
    total_cents: 2495,
    status: "delivered",
  },
  {
    id: "ord_005",
    order_number: 1043,
    customer_name: "David Chen",
    date: "2026-04-27",
    items: [
      { name: "Olio Nuovo — Limited Harvest", quantity: 2, unit_price_cents: 4295 },
      { name: "Nocellara Extra Virgin Olive Oil", quantity: 1, unit_price_cents: 3495 },
    ],
    total_cents: 12085,
    status: "shipped",
  },
  {
    id: "ord_006",
    order_number: 1042,
    customer_name: "Alessandra Moretti",
    date: "2026-04-26",
    items: [
      { name: "Olio al Peperoncino", quantity: 1, unit_price_cents: 2895 },
      { name: "Olio al Limone", quantity: 1, unit_price_cents: 2895 },
      { name: "Blend Classico EVOO", quantity: 2, unit_price_cents: 2495 },
    ],
    total_cents: 10780,
    status: "paid",
  },
  {
    id: "ord_007",
    order_number: 1041,
    customer_name: "James O'Brien",
    date: "2026-04-25",
    items: [
      { name: "The Essentials Gift Set", quantity: 2, unit_price_cents: 7995 },
    ],
    total_cents: 15990,
    status: "pending",
  },
  {
    id: "ord_008",
    order_number: 1040,
    customer_name: "Francesca Lombardi",
    date: "2026-04-24",
    items: [
      { name: "Balsamico Tradizionale di Modena", quantity: 1, unit_price_cents: 3895 },
      { name: "Olive Oil Body Balm", quantity: 2, unit_price_cents: 2295 },
    ],
    total_cents: 8485,
    status: "delivered",
  },
  {
    id: "ord_009",
    order_number: 1039,
    customer_name: "Roberto Santini",
    date: "2026-04-23",
    items: [
      { name: "Nocellara Extra Virgin Olive Oil", quantity: 4, unit_price_cents: 3495 },
    ],
    total_cents: 13980,
    status: "delivered",
  },
  {
    id: "ord_010",
    order_number: 1038,
    customer_name: "Catherine Dupont",
    date: "2026-04-22",
    items: [
      { name: "White Wine Vinegar — Aged", quantity: 2, unit_price_cents: 1895 },
      { name: "Blend Classico EVOO", quantity: 1, unit_price_cents: 2495 },
    ],
    total_cents: 6285,
    status: "shipped",
  },
];

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered =
    statusFilter === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === statusFilter);

  const columns: Column<Order>[] = [
    {
      key: "order_number",
      label: "Order #",
      render: (item) => (
        <span className="font-medium text-olive-900">
          #{item.order_number}
        </span>
      ),
    },
    {
      key: "customer_name",
      label: "Customer",
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
        <span>
          {item.items.reduce((sum, i) => sum + i.quantity, 0)}
        </span>
      ),
    },
    {
      key: "total_cents",
      label: "Total",
      render: (item) => (
        <span className="font-medium">
          ${(item.total_cents / 100).toFixed(2)}
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
        description="View and manage customer orders." backHref="/admin/products"
      />

      <div className="mb-4">
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

      <AdminTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => setSelectedOrder(item)}
        emptyMessage="No orders match this filter."
      />

      <AdminModal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order #${selectedOrder.order_number}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">
                  Customer
                </p>
                <p className="text-olive-900 font-medium">
                  {selectedOrder.customer_name}
                </p>
              </div>
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-olive-900">
                  {new Date(selectedOrder.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">
                  Status
                </p>
                <StatusBadge status={selectedOrder.status} />
              </div>
              <div>
                <p className="text-stone text-xs uppercase tracking-wider mb-1">
                  Total
                </p>
                <p className="text-olive-900 font-medium">
                  ${(selectedOrder.total_cents / 100).toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-stone text-xs uppercase tracking-wider mb-2">
                Items
              </p>
              <div className="border border-olive-100 rounded-sm divide-y divide-olive-50">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="text-olive-900">{item.name}</p>
                      <p className="text-stone text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-olive-900 font-medium">
                      ${((item.unit_price_cents * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
