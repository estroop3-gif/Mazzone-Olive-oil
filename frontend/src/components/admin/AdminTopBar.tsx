"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink } from "lucide-react";

interface AdminTopBarProps {
  onMenuClick: () => void;
}

const BREADCRUMB_MAP: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products & Shop",
  "/admin/journal": "Journal",
  "/admin/events": "Events",
  "/admin/tours": "Tours",
  "/admin/club": "Il Club",
  "/admin/email": "Email",
  "/admin/content": "Content",
  "/admin/analytics": "Analytics",
};

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    for (const [path, label] of Object.entries(BREADCRUMB_MAP)) {
      if (pathname === path || pathname.startsWith(path + "/")) return label;
    }
    return "Admin";
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
        href="/"
        className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 transition-colors"
      >
        <ExternalLink size={14} />
        Back to Site
      </Link>
    </div>
  );
}
