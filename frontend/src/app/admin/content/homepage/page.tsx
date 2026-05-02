"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

const PRODUCTS = [
  { id: "1", name: "Nocellara Extra Virgin", selected: true },
  { id: "2", name: "Blend Classico", selected: true },
  { id: "3", name: "Olio Nuovo", selected: true },
  { id: "4", name: "Olio al Limone", selected: false },
  { id: "5", name: "Balsamico Tradizionale", selected: false },
  { id: "6", name: "Gift Set La Tavola", selected: true },
];

export default function HomepageEditor() {
  const [hero, setHero] = useState({
    headline: "Dal cuore della Sicilia",
    subtitle: "Three generations of Mazzone family tradition, cold-pressed and shipped from our grove to your table.",
    cta_text: "Shop Our Oils",
  });
  const [featured, setFeatured] = useState(PRODUCTS);

  return (
    <div>
      <PageHeader title="Homepage" description="Edit hero section and featured content" backHref="/admin/content" />

      <div className="max-w-3xl space-y-6">
        <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
          <h2 className="font-serif text-lg text-olive-900">Hero Section</h2>
          <AdminFormField label="Headline" value={hero.headline} onChange={(v) => setHero((h) => ({ ...h, headline: v }))} />
          <AdminFormField label="Subtitle" type="textarea" value={hero.subtitle} onChange={(v) => setHero((h) => ({ ...h, subtitle: v }))} />
          <AdminFormField label="CTA Button Text" value={hero.cta_text} onChange={(v) => setHero((h) => ({ ...h, cta_text: v }))} />
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-6">
          <h2 className="font-serif text-lg text-olive-900 mb-4">Featured Products</h2>
          <p className="text-sm text-stone mb-4">Select products to feature on the homepage.</p>
          <div className="space-y-2">
            {featured.map((p) => (
              <label key={p.id} className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={p.selected}
                  onChange={() =>
                    setFeatured((f) =>
                      f.map((x) => (x.id === p.id ? { ...x, selected: !x.selected } : x))
                    )
                  }
                  className="rounded border-olive-300"
                />
                <span className="text-sm text-olive-800">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => alert("Homepage saved (demo)")}
          className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
