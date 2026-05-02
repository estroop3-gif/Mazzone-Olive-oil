"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { MOCK_ORDERS, MOCK_SUBSCRIPTION, MOCK_EVENT_REGISTRATIONS, MOCK_THREADS } from "@/data/account-mock";
import { MOCK_EPISODES } from "@/data/media-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Package, Wine, Calendar, MessageSquare, Play, ShoppingBag, Settings, ArrowRight } from "lucide-react";

export default function AccountDashboard() {
  const { profile } = useAuth();
  const recentOrders = MOCK_ORDERS.slice(0, 3);
  const upcomingEvents = MOCK_EVENT_REGISTRATIONS.filter((r) => r.status !== "cancelled").slice(0, 2);
  const latestEpisode = MOCK_EPISODES.filter((e) => e.status === "published").sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))[0];
  const topThreads = MOCK_THREADS.filter((t) => t.is_pinned || t.reply_count > 10).slice(0, 3);

  return (
    <div className="max-w-5xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-olive-900">
          Welcome back, {profile?.full_name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-stone text-sm mt-1">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-olive-500" />
              <h2 className="font-medium text-olive-900 text-sm">Recent Orders</h2>
            </div>
            <Link href="/account/orders" className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link key={order.id} href={`/account/orders/${order.id}`} className="flex items-center justify-between py-1.5 hover:bg-olive-50 -mx-2 px-2 rounded-sm transition-colors">
                <div>
                  <p className="text-sm text-charcoal">#{order.id.replace("ord-", "").toUpperCase()}</p>
                  <p className="text-xs text-stone">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal">${(order.total_cents / 100).toFixed(2)}</p>
                  <StatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wine size={16} className="text-olive-500" />
              <h2 className="font-medium text-olive-900 text-sm">Subscription</h2>
            </div>
            <Link href="/account/subscriptions" className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="bg-olive-50 rounded-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-olive-900 text-sm">Il Club Duo</span>
              <StatusBadge status="active" />
            </div>
            <p className="text-xs text-stone mb-1">${(MOCK_SUBSCRIPTION.price_cents / 100).toFixed(2)}/month</p>
            <p className="text-xs text-olive-600">Next shipment: {new Date(MOCK_SUBSCRIPTION.next_shipment_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-olive-500" />
              <h2 className="font-medium text-olive-900 text-sm">Upcoming Events</h2>
            </div>
            <Link href="/account/events" className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
              Browse <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((reg) => (
              <div key={reg.id} className="py-1.5">
                <p className="text-sm text-charcoal font-medium">{reg.event_title}</p>
                <p className="text-xs text-stone">
                  {new Date(reg.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <StatusBadge status={reg.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-olive-500" />
              <h2 className="font-medium text-olive-900 text-sm">Community</h2>
            </div>
            <Link href="/account/community" className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
              Join <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {topThreads.map((thread) => (
              <Link key={thread.id} href={`/account/community/${thread.id}`} className="block py-1.5 hover:bg-olive-50 -mx-2 px-2 rounded-sm transition-colors">
                <p className="text-sm text-charcoal line-clamp-1">{thread.title}</p>
                <p className="text-xs text-stone">{thread.reply_count} replies · {thread.author_name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Episode */}
        {latestEpisode && (
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Play size={16} className="text-olive-500" />
                <h2 className="font-medium text-olive-900 text-sm">Latest Episode</h2>
              </div>
              <Link href="/account/media" className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
                Watch <ArrowRight size={12} />
              </Link>
            </div>
            <div className="aspect-video bg-olive-100 rounded-sm flex items-center justify-center mb-3">
              <Play size={32} className="text-olive-400" />
            </div>
            <p className="text-sm font-medium text-olive-900">{latestEpisode.title}</p>
            <p className="text-xs text-stone mt-1">S{latestEpisode.season} E{latestEpisode.episode_number} · {latestEpisode.duration_minutes} min</p>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-sm border border-olive-100 p-5">
          <h2 className="font-medium text-olive-900 text-sm mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Shop", href: "/account/shop", icon: ShoppingBag },
              { label: "Orders", href: "/account/orders", icon: Package },
              { label: "Subscription", href: "/account/subscriptions", icon: Wine },
              { label: "Settings", href: "/account/settings", icon: Settings },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2.5 bg-olive-50 rounded-sm text-sm text-olive-700 hover:bg-olive-100 transition-colors"
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
