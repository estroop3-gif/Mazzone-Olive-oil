"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ALL_PRODUCTS } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Filter + Grid */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="mb-12">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>
          <ProductGrid products={filtered} />
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-olive-900 py-20 text-center">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-3">
          La Bottega
        </p>
        <h1 className="font-serif text-display text-white mb-4">
          The Market
        </h1>
        <p className="text-olive-300 max-w-xl mx-auto">
          Olive oils, vinegars, pantry staples, and more — everything you need
          to bring Sicily to your table.
        </p>
      </section>

      <Suspense>
        <ShopContent />
      </Suspense>
    </div>
  );
}
