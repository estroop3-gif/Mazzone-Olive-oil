"use client";

import { useState } from "react";
import { TabNav } from "@/components/admin/ui/TabNav";
import { ALL_PRODUCTS } from "@/data/products";
import {
  WHOLESALE_PRICE_TIERS,
  CASE_SIZE,
  getWholesalePrice,
} from "@/data/wholesale-mock";

const CATEGORY_TABS = [
  { label: "All", value: "all" },
  { label: "Oils", value: "oil" },
  { label: "Vinegars", value: "vinegar" },
  { label: "Pantry", value: "pantry" },
  { label: "Gift Sets", value: "gift_set" },
];

export default function WholesaleCatalogPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [caseQtys, setCaseQtys] = useState<Record<string, number>>({});

  const filtered =
    activeTab === "all"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeTab);

  function getCaseQty(productId: string) {
    return caseQtys[productId] ?? 1;
  }

  function setCaseQty(productId: string, qty: number) {
    setCaseQtys((prev) => ({ ...prev, [productId]: Math.max(1, qty) }));
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">
        Catalog &amp; Pricing
      </h1>

      {/* Tier Banner */}
      <div className="bg-olive-50 rounded-sm p-4 mb-6">
        <p className="text-sm text-olive-800 font-medium mb-2">
          Volume Pricing Tiers
        </p>
        <div className="flex flex-wrap gap-2">
          {WHOLESALE_PRICE_TIERS.map((tier) => {
            const colors =
              tier.label === "Retail"
                ? "bg-stone/10 text-stone"
                : tier.label === "Wholesale"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-green-50 text-green-700";
            return (
              <span
                key={tier.label}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${colors}`}
              >
                {tier.label}
                {tier.discount_pct > 0
                  ? ` (${tier.discount_pct}% off)`
                  : " (list price)"}
                <span className="text-[10px] opacity-70">
                  {tier.min_qty}
                  {tier.max_qty ? `\u2013${tier.max_qty}` : "+"} units
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <TabNav tabs={CATEGORY_TABS} active={activeTab} onChange={setActiveTab} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => {
          const wholesaleUnit = getWholesalePrice(product, 12);
          const casePrice = wholesaleUnit * CASE_SIZE;
          const qty = getCaseQty(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-olive-100 p-5"
            >
              <p className="font-medium text-olive-900">{product.name}</p>
              {product.size_ml && (
                <p className="text-xs text-stone">{product.size_ml} ml</p>
              )}

              <div className="mt-3 space-y-0.5">
                <p className="text-sm text-stone line-through">
                  ${(product.price_cents / 100).toFixed(2)} retail
                </p>
                <p className="text-olive-900 font-medium text-sm">
                  ${(wholesaleUnit / 100).toFixed(2)} / unit wholesale
                </p>
                <p className="text-xs text-stone">
                  ${(casePrice / 100).toFixed(2)} / case of {CASE_SIZE}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <label className="sr-only" htmlFor={`qty-${product.id}`}>
                  Cases
                </label>
                <input
                  id={`qty-${product.id}`}
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setCaseQty(product.id, parseInt(e.target.value) || 1)
                  }
                  className="w-16 border border-olive-200 rounded-sm px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-olive-400"
                />
                <span className="text-xs text-stone">cases</span>
                <button
                  onClick={() =>
                    alert(
                      `Added ${qty} case(s) of ${product.name} to order.`,
                    )
                  }
                  className="ml-auto bg-olive-800 text-white text-xs px-3 py-1.5 rounded-sm hover:bg-olive-900 transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimum Order Notice */}
      <div className="bg-gold-50 rounded-sm p-3 mt-6">
        <p className="text-sm text-gold-800">
          Minimum order: $500.00
        </p>
      </div>
    </div>
  );
}
