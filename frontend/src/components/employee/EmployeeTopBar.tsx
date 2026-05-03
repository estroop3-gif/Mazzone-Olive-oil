"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowLeft } from "lucide-react";

interface EmployeeTopBarProps {
  onMenuClick: () => void;
}

const BREADCRUMB_MAP: Record<string, string> = {
  "/portal/employee": "Dashboard",
  "/portal/employee/time-entry": "Time Entry",
  "/portal/employee/timecards": "Timecards",
  "/portal/employee/schedule": "Schedule",
  "/portal/employee/time-off": "Time Off",
  "/portal/employee/pay-stubs": "Pay Stubs",
  "/portal/employee/directory": "Directory",
  "/portal/employee/settings": "Settings",
};

export function EmployeeTopBar({ onMenuClick }: EmployeeTopBarProps) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    for (const [path, label] of Object.entries(BREADCRUMB_MAP)) {
      if (pathname === path || pathname.startsWith(path + "/")) return label;
    }
    return "Employee";
  };

  return (
    <div className="h-14 border-b border-olive-100 bg-white px-4 lg:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-olive-600 hover:text-olive-900"
        >
          <Menu size={20} />
        </button>
        <span className="text-sm text-stone">{getBreadcrumb()}</span>
      </div>
      <Link
        href="/shop"
        className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </Link>
    </div>
  );
}
