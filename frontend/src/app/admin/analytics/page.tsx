"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const REVENUE_DATA = [
  { month: "Jan", revenue: 28400 },
  { month: "Feb", revenue: 31200 },
  { month: "Mar", revenue: 34800 },
  { month: "Apr", revenue: 29600 },
  { month: "May", revenue: 38200 },
  { month: "Jun", revenue: 42100 },
  { month: "Jul", revenue: 47230 },
  { month: "Aug", revenue: 44800 },
  { month: "Sep", revenue: 51200 },
  { month: "Oct", revenue: 58400 },
  { month: "Nov", revenue: 52100 },
  { month: "Dec", revenue: 62300 },
];

const ORDERS_DATA = [
  { month: "Jan", orders: 89 },
  { month: "Feb", orders: 102 },
  { month: "Mar", orders: 118 },
  { month: "Apr", orders: 95 },
  { month: "May", orders: 134 },
  { month: "Jun", orders: 142 },
  { month: "Jul", orders: 156 },
  { month: "Aug", orders: 148 },
  { month: "Sep", orders: 167 },
  { month: "Oct", orders: 189 },
  { month: "Nov", orders: 172 },
  { month: "Dec", orders: 201 },
];

const TOP_PRODUCTS = [
  { name: "Nocellara Extra Virgin", orders: 347, revenue: "$12,845" },
  { name: "Gift Set La Tavola", orders: 89, revenue: "$8,010" },
  { name: "Olio al Limone", orders: 234, revenue: "$7,020" },
  { name: "Blend Classico", orders: 198, revenue: "$5,940" },
  { name: "Balsamico Tradizionale", orders: 156, revenue: "$5,460" },
];

const SECTIONS = [
  { label: "Shop", value: "$32,400", icon: ShoppingBag, trend: "+14.2%" },
  { label: "Tours", value: "$18,600", icon: TrendingUp, trend: "+22.8%" },
  { label: "Events", value: "$4,230", icon: Users, trend: "+5.1%" },
  { label: "Club MRR", value: "$2,186", icon: DollarSign, trend: "+8.7%" },
];

const productColumns: Column<(typeof TOP_PRODUCTS)[0]>[] = [
  { key: "name", label: "Product", render: (p) => <span className="font-medium text-olive-900">{p.name}</span> },
  { key: "orders", label: "Orders" },
  { key: "revenue", label: "Revenue" },
];

export default function AnalyticsAdmin() {
  const [range, setRange] = useState("30d");

  return (
    <div>
      <PageHeader title="Analytics" description="Revenue, orders, and performance overview" />

      <div className="flex gap-2 mb-6">
        {["7d", "30d", "90d", "all"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 text-sm rounded-sm ${
              range === r ? "bg-olive-800 text-white" : "bg-olive-50 text-olive-700 hover:bg-olive-100"
            }`}
          >
            {r === "all" ? "All Time" : r}
          </button>
        ))}
      </div>

      {/* Section breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SECTIONS.map((s) => (
          <AdminCard
            key={s.label}
            icon={s.icon}
            value={s.value}
            label={s.label}
            trend={{ value: s.trend, up: true }}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6ede6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#4a7c4a" fill="#4a7c4a" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h3 className="font-serif text-lg text-olive-900 mb-4">Orders Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ORDERS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6ede6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#c4963c" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products + traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-serif text-lg text-olive-900 mb-3">Top Products</h3>
          <AdminTable columns={productColumns} data={TOP_PRODUCTS} />
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-olive-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp size={20} className="text-olive-400" />
            </div>
            <h3 className="font-serif text-lg text-olive-900 mb-2">Traffic Analytics</h3>
            <p className="text-sm text-stone mb-4">
              Connect Google Analytics to see page views, sessions, and traffic sources.
            </p>
            <button className="text-sm text-olive-600 hover:text-olive-800 underline underline-offset-2">
              Connect Google Analytics →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
