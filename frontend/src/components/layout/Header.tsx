"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Our Family", href: "/our-family" },
  { name: "Tours", href: "/tours" },
  { name: "Events", href: "/events" },
  { name: "Journal", href: "/journal" },
  { name: "Il Club", href: "/club" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const { itemCount } = useCart();

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
          {!loading && (
            user ? (
              isAdmin ? (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 text-sm text-olive-700 hover:text-olive-900 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="text-sm text-olive-700 hover:text-olive-900 transition-colors"
                >
                  Account
                </Link>
              )
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
              {user ? (
                <Link
                  href={isAdmin ? "/admin" : "/account"}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-serif text-olive-800"
                >
                  {isAdmin ? "Admin Dashboard" : "Account"}
                </Link>
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
