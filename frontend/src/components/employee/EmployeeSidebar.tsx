"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PortalSwitcher } from "@/components/ui/PortalSwitcher";
import { MOCK_CURRENT_EMPLOYEE } from "@/data/employee-mock";
import {
  LayoutDashboard,
  Clock,
  ClipboardList,
  CalendarDays,
  Palmtree,
  DollarSign,
  Users,
  Settings,
  ArrowLeft,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/employee", icon: LayoutDashboard },
  { label: "Time Entry", href: "/portal/employee/time-entry", icon: Clock },
  { label: "Timecards", href: "/portal/employee/timecards", icon: ClipboardList },
  { label: "Schedule", href: "/portal/employee/schedule", icon: CalendarDays },
  { label: "Time Off", href: "/portal/employee/time-off", icon: Palmtree },
  { label: "Pay Stubs", href: "/portal/employee/pay-stubs", icon: DollarSign },
  { label: "Directory", href: "/portal/employee/directory", icon: Users },
  { label: "Settings", href: "/portal/employee/settings", icon: Settings },
];

interface EmployeeSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function EmployeeSidebar({ open, onClose }: EmployeeSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/portal/employee") return pathname === "/portal/employee";
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
            <h1 className="font-serif text-xl text-olive-900">Employee</h1>
            <p className="text-stone text-xs mt-0.5 truncate">
              {MOCK_CURRENT_EMPLOYEE.full_name}
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
