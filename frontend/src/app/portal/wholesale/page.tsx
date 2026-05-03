"use client";

import Link from "next/link";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import {
  MOCK_WHOLESALE_ACCOUNT,
  MOCK_WHOLESALE_ORDERS,
} from "@/data/wholesale-mock";
import { Package, DollarSign, Truck, CheckCircle, Plus, Tag, Download, Phone } from "lucide-react";

export default function WholesaleDashboard() {
  const openOrders = MOCK_WHOLESALE_ORDERS.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled",
  );

  const totalSpentYTD = MOCK_WHOLESALE_ORDERS.reduce(
    (sum, o) => sum + o.total_cents,
    0,
  );

  const shippedOrder = MOCK_WHOLESALE_ORDERS.find((o) => o.status === "shipped");

  const recentOrders = MOCK_WHOLESALE_ORDERS.slice(0, 3);

  return (
    <div className="max-w-5xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-olive-900">
          Welcome back, {MOCK_WHOLESALE_ACCOUNT.contact_name.split(" ")[0]}
        </h1>
        <p className="text-stone text-sm mt-1">
          {MOCK_WHOLESALE_ACCOUNT.business_name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <AdminCard
          icon={Package}
          value={openOrders.length}
          label="Open Orders"
        />
        <AdminCard
          icon={DollarSign}
          value={`$${(totalSpentYTD / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          label="Total Spent YTD"
        />
        <AdminCard
          icon={Truck}
          value={shippedOrder ? "In Transit" : "None"}
          label="Next Shipment"
        />
        <AdminCard
          icon={CheckCircle}
          value={MOCK_WHOLESALE_ACCOUNT.account_status.charAt(0).toUpperCase() + MOCK_WHOLESALE_ACCOUNT.account_status.slice(1)}
          label="Account Status"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-sm border border-olive-100 p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-olive-900 text-sm">Recent Orders</h2>
          <Link
            href="/portal/wholesale/orders"
            className="text-xs text-gold-700 hover:text-gold-800"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/portal/wholesale/orders/${order.id}`}
              className="flex items-center justify-between py-2 hover:bg-olive-50 -mx-2 px-2 rounded-sm transition-colors"
            >
              <div>
                <p className="text-sm text-charcoal font-medium">
                  {order.po_number}
                </p>
                <p className="text-xs text-stone">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-charcoal">
                  ${(order.total_cents / 100).toFixed(2)}
                </span>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-medium text-olive-900 text-sm mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/portal/wholesale/new-order"
            className="flex items-center gap-2 bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-700 hover:bg-olive-100 transition-colors"
          >
            <Plus size={14} />
            New Order
          </Link>
          <Link
            href="/portal/wholesale/catalog"
            className="flex items-center gap-2 bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-700 hover:bg-olive-100 transition-colors"
          >
            <Tag size={14} />
            View Catalog
          </Link>
          <button
            onClick={() => alert("Price list download coming soon.")}
            className="flex items-center gap-2 bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-700 hover:bg-olive-100 transition-colors text-left"
          >
            <Download size={14} />
            Download Price List
          </button>
          <Link
            href="/portal/wholesale/support"
            className="flex items-center gap-2 bg-olive-50 rounded-sm px-3 py-2.5 text-sm text-olive-700 hover:bg-olive-100 transition-colors"
          >
            <Phone size={14} />
            Contact Rep
          </Link>
        </div>
      </div>
    </div>
  );
}
