"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { Home, Users, ShoppingBag, Image } from "lucide-react";

const SECTIONS = [
  {
    title: "Homepage",
    description: "Hero text, featured products, and section ordering",
    icon: Home,
    href: "/admin/content/homepage",
  },
  {
    title: "Our Family",
    description: "Family story, timeline, and grove information",
    icon: Users,
    href: "/admin/content/homepage",
  },
  {
    title: "Store Info",
    description: "Hours, contact, shipping policies",
    icon: ShoppingBag,
    href: "/admin/content/settings",
  },
  {
    title: "Photos & Media",
    description: "Gallery images and marketing assets",
    icon: Image,
    href: "/admin/content/homepage",
  },
];

export default function ContentAdmin() {
  return (
    <div>
      <PageHeader title="Content" description="Manage site content and settings" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="bg-white rounded-sm border border-olive-100 p-6 hover:border-olive-300 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-olive-50 rounded-sm group-hover:bg-olive-100 transition-colors">
                <s.icon size={20} className="text-olive-600" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-olive-900">{s.title}</h3>
                <p className="text-sm text-stone mt-1">{s.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
