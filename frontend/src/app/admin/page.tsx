"use client";

import { AdminCard } from "@/components/admin/ui/AdminCard";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Mail,
  Calendar,
  AlertTriangle,
  Plus,
  BookOpen,
  Send,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  { icon: DollarSign, value: "$47,230", label: "Revenue (30d)", trend: { value: "+12.3%", up: true } },
  { icon: ShoppingBag, value: "156", label: "Orders (30d)", trend: { value: "+8.1%", up: true } },
  { icon: Users, value: "42", label: "Active Subscribers", trend: { value: "+3", up: true } },
  { icon: Mail, value: "1,847", label: "Newsletter List", trend: { value: "+124", up: true } },
  { icon: Calendar, value: "6", label: "Upcoming Events", trend: { value: "2 this week", up: true } },
  { icon: AlertTriangle, value: "3", label: "Low Stock Items", trend: { value: "Action needed", up: false } },
];

const RECENT_ACTIVITY = [
  { type: "order", text: "New order #1047 — Nocellara EVOO × 2", time: "12 min ago" },
  { type: "subscriber", text: "Maria C. joined Il Club Duo", time: "28 min ago" },
  { type: "booking", text: "Tour booking: Puglia Homeland (Aug 15–22)", time: "1 hr ago" },
  { type: "order", text: "New order #1046 — Gift Set La Tavola", time: "2 hr ago" },
  { type: "review", text: "5★ review on Balsamico Tradizionale", time: "3 hr ago" },
  { type: "newsletter", text: "Newsletter signup: james@example.com", time: "4 hr ago" },
  { type: "event", text: "Event booking: Summer Pasta Class (Jun 14)", time: "5 hr ago" },
  { type: "order", text: "New order #1045 — Olio al Limone + Pasta", time: "6 hr ago" },
  { type: "wholesale", text: "Wholesale inquiry from Trattoria Bella", time: "8 hr ago" },
  { type: "subscriber", text: "Anna R. upgraded to Collezione plan", time: "12 hr ago" },
];

const QUICK_ACTIONS = [
  { label: "New Product", href: "/admin/products/new", icon: Plus },
  { label: "New Post", href: "/admin/journal/new", icon: BookOpen },
  { label: "New Event", href: "/admin/events/new", icon: Calendar },
  { label: "Send Email", href: "/admin/email/campaigns/new", icon: Send },
];

function HarvestCountdown() {
  const now = new Date();
  const harvestDate = new Date(now.getFullYear(), 9, 15); // October 15
  if (now > harvestDate) harvestDate.setFullYear(harvestDate.getFullYear() + 1);
  const diff = harvestDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-olive-900 rounded-sm p-5 text-white">
      <p className="text-gold-400 text-xs uppercase tracking-wider mb-2">Harvest Countdown</p>
      <p className="font-serif text-3xl text-gold-400">{days}</p>
      <p className="text-olive-300 text-sm mt-1">days until October harvest</p>
      <button className="mt-3 text-xs text-gold-400 hover:text-gold-300 underline underline-offset-2">
        Pre-order Olio Nuovo →
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back. Here's what's happening." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {STATS.map((s) => (
          <AdminCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-sm border border-olive-100 p-5">
          <h2 className="font-serif text-lg text-olive-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start justify-between py-2 border-b border-olive-50 last:border-0">
                <p className="text-sm text-charcoal">{item.text}</p>
                <span className="text-xs text-stone shrink-0 ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h2 className="font-serif text-lg text-olive-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center gap-2 px-3 py-2.5 bg-olive-50 rounded-sm text-sm text-olive-800 hover:bg-olive-100 transition-colors"
                >
                  <a.icon size={14} />
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <HarvestCountdown />
        </div>
      </div>
    </div>
  );
}
