"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ALL_PRODUCTS } from "@/data/products";

export default function AccountShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Shop</h1>
      <div className="mb-8">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
