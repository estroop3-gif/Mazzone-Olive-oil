"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PortalSwitcher } from "@/components/ui/PortalSwitcher";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  BookOpen,
  Calendar,
  Map,
  Wine,
  Mail,
  Play,
  FileEdit,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Products & Shop", href: "/admin/products", icon: Package },
  { label: "Journal", href: "/admin/journal", icon: BookOpen },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Tours", href: "/admin/tours", icon: Map },
  { label: "Il Club", href: "/admin/club", icon: Wine },
  { label: "Email", href: "/admin/email", icon: Mail },
  { label: "Media", href: "/admin/media", icon: Play },
  { label: "Content", href: "/admin/content", icon: FileEdit },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[101] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-olive-900 z-[102] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:relative lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-gold-400">Mazzone</h1>
            <p className="text-olive-400 text-xs uppercase tracking-[0.15em] mt-0.5">
              Admin
            </p>
          </div>
          <button onClick={onClose} className="lg:hidden text-olive-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
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
                    ? "bg-olive-800 text-white border-l-2 border-gold-500 pl-[10px]"
                    : "text-olive-300 hover:text-white hover:bg-olive-800"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Portal Switcher + User section */}
        <div className="px-3 py-3 border-t border-olive-800 space-y-3">
          <PortalSwitcher variant="dark" onNavigate={onClose} />
          <div className="px-1">
            <p className="text-olive-300 text-xs truncate mb-2">
              {profile?.email ?? "admin@mazzone.com"}
            </p>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-olive-400 hover:text-white text-sm transition-colors"
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
