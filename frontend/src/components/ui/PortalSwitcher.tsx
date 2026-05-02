"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getVisiblePortals, getCurrentPortalKey } from "@/lib/portals";
import { ChevronsUpDown } from "lucide-react";

interface PortalSwitcherProps {
  /** "dark" for admin sidebar (olive-900 bg), "light" for account sidebar (cream bg) */
  variant?: "dark" | "light";
  onNavigate?: () => void;
}

export function PortalSwitcher({ variant = "dark", onNavigate }: PortalSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isAdmin, loading } = useAuth();
  const pathname = usePathname();

  const portals = getVisiblePortals(isAdmin);
  const currentKey = getCurrentPortalKey(pathname);
  const current = portals.find((p) => p.key === currentKey);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Don't render until client-side auth has resolved to avoid hydration mismatch
  if (!mounted || loading || portals.length <= 1) return null;

  const isDark = variant === "dark";
  const CurrentIcon = current?.icon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-sm text-sm transition-colors ${
          isDark
            ? "bg-olive-800 text-olive-200 hover:bg-olive-700"
            : "bg-olive-50 text-olive-700 hover:bg-olive-100"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {CurrentIcon && <CurrentIcon size={14} className="shrink-0" />}
          <span className="truncate font-medium">{current?.label ?? "Switch Portal"}</span>
        </div>
        <ChevronsUpDown size={14} className="shrink-0 opacity-60" />
      </button>

      {open && (
        <div
          className={`absolute left-0 right-0 bottom-full mb-1 rounded-sm border shadow-lg z-50 overflow-hidden ${
            isDark
              ? "bg-olive-800 border-olive-700"
              : "bg-white border-olive-100"
          }`}
        >
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isActive = portal.key === currentKey;
            return (
              <Link
                key={portal.key}
                href={portal.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  isDark
                    ? isActive
                      ? "bg-olive-700 text-white"
                      : "text-olive-300 hover:bg-olive-700 hover:text-white"
                    : isActive
                      ? "bg-olive-50 text-olive-900"
                      : "text-olive-600 hover:bg-olive-50 hover:text-olive-900"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{portal.label}</p>
                  <p className={`text-xs truncate ${isDark ? "text-olive-400" : "text-stone"}`}>
                    {portal.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
