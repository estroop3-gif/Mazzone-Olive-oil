"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, LogIn, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getVisiblePortals } from "@/lib/portals";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Our Family", href: "/our-family" },
  { name: "Tours", href: "/tours" },
  { name: "Events", href: "/events" },
  { name: "Journal", href: "/journal" },
  { name: "Il Club", href: "/club" },
];

function PortalDropdown() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isAdmin, profile, loading } = useAuth();

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

  // Always render the same initial structure; only show portal-aware content after mount + auth
  if (!mounted || loading) {
    return (
      <span className="flex items-center gap-1.5 text-sm text-olive-700">
        <User size={16} />
      </span>
    );
  }

  const portals = getVisiblePortals(isAdmin);
  const firstName = profile?.full_name?.split(" ")[0] || "Account";

  if (portals.length <= 1) {
    const target = portals[0] ?? { href: "/account", icon: User };
    const SingleIcon = target.icon;
    return (
      <Link
        href={target.href}
        className="flex items-center gap-1.5 text-sm text-olive-700 hover:text-olive-900 transition-colors"
      >
        <SingleIcon size={16} />
        <span className="hidden sm:inline">{firstName}</span>
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-olive-700 hover:text-olive-900 transition-colors"
      >
        <span className="hidden sm:inline">{firstName}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-sm border border-olive-100 shadow-lg z-50 overflow-hidden">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.key}
                href={portal.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-olive-700 hover:bg-olive-50 hover:text-olive-900 transition-colors"
              >
                <Icon size={16} className="shrink-0 text-olive-500" />
                <div>
                  <p className="font-medium">{portal.label}</p>
                  <p className="text-xs text-stone">{portal.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute portals only after mount to avoid hydration mismatch
  const portals = mounted && !loading ? getVisiblePortals(isAdmin) : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-olive-100">
      <nav className="container-wide flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl text-olive-800 tracking-tight">
            Mazzone
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm tracking-wide text-stone hover:text-olive-700 transition-colors duration-200 uppercase"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {mounted && !loading && (
            user ? (
              <PortalDropdown />
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm text-olive-700 hover:text-olive-900 transition-colors"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">Log In</span>
              </Link>
            )
          )}
          <Link
            href="/cart"
            className="relative p-2 text-olive-700 hover:text-olive-900 transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold leading-none px-1">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-olive-700"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-olive-100 py-6 px-6">
          <ul className="space-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-serif text-olive-800"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-olive-100">
              {mounted && !loading && user ? (
                <div className="space-y-3">
                  {portals.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <Link
                        key={portal.key}
                        href={portal.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 text-lg font-serif text-olive-800"
                      >
                        <Icon size={18} />
                        {portal.label}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-serif text-olive-800"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
