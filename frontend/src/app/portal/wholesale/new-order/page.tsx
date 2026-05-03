"use client";

import { useState, useMemo } from "react";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { ALL_PRODUCTS } from "@/data/products";
import {
  WHOLESALE_PRICE_TIERS,
  CASE_SIZE,
  WHOLESALE_MIN_ORDER_CENTS,
  getWholesalePrice,
} from "@/data/wholesale-mock";

export default function NewOrderPage() {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [poNumber, setPoNumber] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = useMemo(
    () =>
      ALL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const lineItems = useMemo(
    () =>
      ALL_PRODUCTS.filter((p) => (quantities[p.id] ?? 0) > 0).map((p) => {
        const cases = quantities[p.id];
        const units = cases * CASE_SIZE;
        const unitPrice = getWholesalePrice(p, units);
        return {
          product: p,
          cases,
          units,
          unitPrice,
          lineTotal: unitPrice * units,
        };
      }),
    [quantities],
  );

  const subtotalCents = lineItems.reduce((s, li) => s + li.lineTotal, 0);
  const totalUnits = lineItems.reduce((s, li) => s + li.units, 0);
  const minPct = Math.min(
    100,
    Math.round((subtotalCents / WHOLESALE_MIN_ORDER_CENTS) * 100),
  );
  const meetsMinimum = subtotalCents >= WHOLESALE_MIN_ORDER_CENTS;

  const activeTier = WHOLESALE_PRICE_TIERS.find(
    (t) =>
      totalUnits >= t.min_qty &&
      (t.max_qty === null || totalUnits <= t.max_qty),
  );

  function setQty(productId: string, qty: number) {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, qty) }));
  }

  function resetForm() {
    setQuantities({});
    setPoNumber("");
    setDeliveryNotes("");
    setShowSuccess(false);
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-6">New Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Product List ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
          />

          {filtered.map((product) => {
            const wsPrice = getWholesalePrice(product, CASE_SIZE);
            return (
              <div
                key={product.id}
                className="bg-white border border-olive-100 rounded-sm p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-olive-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-stone">
                    {product.size_ml ? `${product.size_ml}ml` : "Standard"} &middot; Wholesale{" "}
                    ${(wsPrice / 100).toFixed(2)}/unit (12+)
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <label className="text-xs text-stone">Cases</label>
                  <input
                    type="number"
                    min={0}
                    value={quantities[product.id] ?? 0}
                    onChange={(e) =>
                      setQty(product.id, parseInt(e.target.value) || 0)
                    }
                    className="w-20 px-2 py-1.5 border border-olive-200 rounded-sm text-sm text-center text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Order Summary ─────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white border border-olive-100 rounded-sm p-5 space-y-4">
            <h2 className="font-serif text-lg text-olive-900">
              Order Summary
            </h2>

            <div>
              <label className="block text-sm font-medium text-olive-800 mb-1">
                PO Number
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="PO-2026-..."
                className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-olive-800 mb-1">
                Delivery Notes
              </label>
              <textarea
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Special instructions..."
                className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent min-h-[80px] resize-y"
              />
            </div>

            {/* Line items */}
            {lineItems.length > 0 && (
              <div className="border-t border-olive-100 pt-3 space-y-2">
                {lineItems.map((li) => (
                  <div
                    key={li.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-olive-800 truncate mr-2">
                      {li.product.name}{" "}
                      <span className="text-stone">
                        &times; {li.cases} case{li.cases !== 1 ? "s" : ""}
                      </span>
                    </span>
                    <span className="text-charcoal font-medium shrink-0">
                      ${(li.lineTotal / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between border-t border-olive-100 pt-3 text-sm font-medium">
              <span className="text-olive-900">Subtotal</span>
              <span className="text-charcoal">
                ${(subtotalCents / 100).toFixed(2)}
              </span>
            </div>

            {/* Tier indicator */}
            {totalUnits > 0 && activeTier && (
              <p className="text-xs text-stone">
                Pricing tier:{" "}
                <span className="font-medium text-olive-700">
                  {activeTier.label}
                </span>{" "}
                ({totalUnits} unit{totalUnits !== 1 ? "s" : ""})
                {activeTier.discount_pct > 0 &&
                  ` \u2014 ${activeTier.discount_pct}% off retail`}
              </p>
            )}

            {/* Minimum order progress */}
            <div>
              <div className="bg-olive-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-olive-600 h-2 rounded-full transition-all"
                  style={{ width: `${minPct}%` }}
                />
              </div>
              <p className="text-xs text-stone mt-1">
                {minPct}% of $500 minimum
              </p>
            </div>

            {/* Submit */}
            <button
              disabled={!meetsMinimum}
              onClick={() => setShowSuccess(true)}
              className={`bg-olive-800 text-white w-full py-2.5 rounded-sm text-sm font-medium transition-colors ${
                meetsMinimum
                  ? "hover:bg-olive-900"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>

      {/* ── Success Modal ───────────────────────────── */}
      <AdminModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Order Submitted"
      >
        <p className="text-sm text-stone mb-4">
          Your order{poNumber ? ` (${poNumber})` : ""} has been submitted
          successfully. You will receive a confirmation email shortly.
        </p>
        <button
          onClick={resetForm}
          className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm"
        >
          Close
        </button>
      </AdminModal>
    </div>
  );
}
