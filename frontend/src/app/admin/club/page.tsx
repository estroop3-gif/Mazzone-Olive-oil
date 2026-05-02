"use client";

import { AdminCard } from "@/components/admin/ui/AdminCard";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Users, DollarSign, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATS = [
  { icon: Users, value: "42", label: "Active Members", trend: { value: "+3 this month", up: true } },
  { icon: DollarSign, value: "$2,186", label: "Monthly Recurring Revenue", trend: { value: "+8.4%", up: true } },
  { icon: TrendingDown, value: "3.2%", label: "Churn Rate", trend: { value: "-0.5%", up: true } },
  { icon: Clock, value: "14 mo", label: "Avg Member Lifetime", trend: { value: "+2 mo", up: true } },
];

const PLAN_DATA = [
  { name: "Singolo", value: 18 },
  { name: "Duo", value: 16 },
  { name: "Collezione", value: 8 },
];

const PLAN_COLORS = ["#4a7c4a", "#c4963c", "#c4603c"];

const RECENT_ACTIVITY = [
  { text: "Maria C. joined Duo plan", time: "12 min ago" },
  { text: "Paolo R. upgraded to Collezione", time: "1 hr ago" },
  { text: "Francesca L. renewed Singolo", time: "3 hr ago" },
  { text: "Giovanni B. paused Duo subscription", time: "5 hr ago" },
  { text: "Elena M. joined Singolo plan", time: "8 hr ago" },
  { text: "Luca T. cancelled Singolo plan", time: "1 day ago" },
];

const NAV_LINKS = [
  { label: "Subscribers", href: "/admin/club/subscribers" },
  { label: "Monthly Pairings", href: "/admin/club/pairings" },
  { label: "Gift Subscriptions", href: "/admin/club/gifts" },
  { label: "Analytics", href: "/admin/club/analytics" },
];

export default function ClubDashboard() {
  return (
    <div>
      <PageHeader
        title="Il Club Mazzone"
        description="Manage your olive oil subscription club members, pairings, and gifts."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map((s) => (
          <AdminCard key={s.label} {...s} />
        ))}
      </div>

      {/* Club Management — above analytics */}
      <div className="bg-white rounded-sm border border-olive-100 p-5 mb-6">
        <h2 className="font-serif text-lg text-olive-900 mb-4">Club Management</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-center px-4 py-3 bg-olive-50 rounded-sm text-sm font-medium text-olive-800 hover:bg-olive-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h2 className="font-serif text-lg text-olive-900 mb-4">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={PLAN_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {PLAN_DATA.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PLAN_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-olive-100 p-5">
          <h2 className="font-serif text-lg text-olive-900 mb-4">Recent Subscriber Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between py-2 border-b border-olive-50 last:border-0"
              >
                <p className="text-sm text-charcoal">{item.text}</p>
                <span className="text-xs text-stone shrink-0 ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
