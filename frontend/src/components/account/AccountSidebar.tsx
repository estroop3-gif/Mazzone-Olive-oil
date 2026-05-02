"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PortalSwitcher } from "@/components/ui/PortalSwitcher";
import {
  LayoutDashboard,
  Package,
  Wine,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Play,
  Settings,
  ArrowLeft,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Subscriptions", href: "/account/subscriptions", icon: Wine },
  { label: "Events & Tours", href: "/account/events", icon: Calendar },
  { label: "Community", href: "/account/community", icon: MessageSquare },
  { label: "Shop", href: "/account/shop", icon: ShoppingBag },
  { label: "Media", href: "/account/media", icon: Play },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

interface AccountSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AccountSidebar({ open, onClose }: AccountSidebarProps) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[101] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-cream z-[102] flex flex-col border-r border-olive-100 transition-transform duration-300 lg:translate-x-0 lg:relative lg:z-auto lg:h-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-olive-100">
          <div>
            <h1 className="font-serif text-xl text-olive-900">My Account</h1>
            <p className="text-stone text-xs mt-0.5 truncate">
              {profile?.full_name || profile?.email || "Welcome back"}
            </p>
          </div>
          <button onClick={onClose} className="lg:hidden text-olive-400 hover:text-olive-900">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                  active
                    ? "bg-olive-100 text-olive-900 border-l-2 border-gold-500 pl-[10px]"
                    : "text-olive-600 hover:text-olive-900 hover:bg-olive-50"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-olive-100 space-y-3">
          <PortalSwitcher variant="light" onNavigate={onClose} />
          <div className="px-1 space-y-2">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-olive-600 hover:text-olive-900 text-sm transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Shop
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-olive-400 hover:text-olive-900 text-sm transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
