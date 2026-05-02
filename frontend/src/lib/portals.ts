import {
  LayoutDashboard,
  User,
  Warehouse,
  Clock,
  type LucideIcon,
} from "lucide-react";

export interface Portal {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Who can access: "all" = any logged-in user, "admin" = admin only */
  access: "all" | "admin";
}

export const PORTALS: Portal[] = [
  {
    key: "admin",
    label: "Admin",
    description: "Site management",
    href: "/admin",
    icon: LayoutDashboard,
    access: "admin",
  },
  {
    key: "account",
    label: "Customer",
    description: "Orders & subscriptions",
    href: "/account",
    icon: User,
    access: "all",
  },
  {
    key: "wholesale",
    label: "Wholesale",
    description: "B2B ordering",
    href: "/portal/wholesale",
    icon: Warehouse,
    access: "admin",
  },
  {
    key: "employee",
    label: "Employee",
    description: "Timecards & HR",
    href: "/portal/employee",
    icon: Clock,
    access: "admin",
  },
];

/** Returns portals visible to the current user */
export function getVisiblePortals(isAdmin: boolean): Portal[] {
  if (isAdmin) return PORTALS;
  return PORTALS.filter((p) => p.access === "all");
}

/** Detect which portal we're currently in based on pathname */
export function getCurrentPortalKey(pathname: string): string | null {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/account")) return "account";
  if (pathname.startsWith("/portal/wholesale")) return "wholesale";
  if (pathname.startsWith("/portal/employee")) return "employee";
  return null;
}
