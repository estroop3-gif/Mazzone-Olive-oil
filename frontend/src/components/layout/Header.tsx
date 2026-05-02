"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

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
          <Link
            href="/cart"
            className="relative p-2 text-olive-700 hover:text-olive-900 transition-colors"
          >
            <ShoppingBag size={20} />
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
          </ul>
        </div>
      )}
    </header>
  );
}
