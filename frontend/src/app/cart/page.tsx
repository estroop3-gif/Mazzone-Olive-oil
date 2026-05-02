"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  MapPin,
  Truck,
  Package,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, ShippingMethod } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";

const SHIPPING_ICONS: Record<ShippingMethod, typeof MapPin> = {
  pickup: MapPin,
  flat_rate: Truck,
  free: Package,
};

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    addItem,
    subtotal,
    itemCount,
    formatPrice,
    shippingMethod,
    setShippingMethod,
    shippingOptions,
    shippingCost,
    total,
  } = useCart();

  // Suggested items: products not in cart, prefer featured, max 4
  const suggestions = useMemo(() => {
    const inCart = new Set(items.map((i) => i.product.id));
    const available = ALL_PRODUCTS.filter((p) => !inCart.has(p.id));
    const featured = available.filter((p) => p.is_featured);
    const rest = available.filter((p) => !p.is_featured);
    return [...featured, ...rest].slice(0, 4);
  }, [items]);

  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleQuickAdd(product: typeof ALL_PRODUCTS[0]) {
    addItem(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  }

  const hasItems = items.length > 0;
  const bottlesUntilFree = Math.max(0, 5 - itemCount);

  return (
    <div className="pt-20 pb-section">
      <div className="container-wide py-12">
        {/* Header */}
        <div className="mb-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-olive-700 hover:text-olive-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
        <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-2">
          Il Tuo Carrello
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-olive-900 mb-10">
          Your Cart{" "}
          <span className="text-lg text-stone font-sans">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </h1>

        {/* Empty state message */}
        {!hasItems && (
          <div className="text-center py-12 mb-8">
            <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} className="text-olive-600" />
            </div>
            <p className="text-stone max-w-md mx-auto leading-relaxed">
              Your cart is empty. Discover our collection of premium Sicilian
              olive oils, vinegars, and artisan goods — dal cuore della Sicilia.
            </p>
          </div>
        )}

        {/* Cart content */}
        {hasItems && (
          <>
            {/* Free shipping progress */}
            {bottlesUntilFree > 0 && shippingMethod !== "pickup" && (
              <div className="bg-olive-50/80 border border-olive-100 rounded-sm px-5 py-3 mb-8 flex items-center gap-3">
                <Package size={18} className="text-olive-600 shrink-0" />
                <p className="text-sm text-olive-800">
                  Add{" "}
                  <span className="font-medium">
                    {bottlesUntilFree} more item
                    {bottlesUntilFree !== 1 ? "s" : ""}
                  </span>{" "}
                  to unlock <span className="font-medium">free shipping</span>
                </p>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="divide-y divide-olive-100">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 sm:gap-6 py-6 first:pt-0"
                    >
                      <Link
                        href={`/shop/${product.slug}`}
                        className="shrink-0"
                      >
                        <div className="w-20 h-24 sm:w-24 sm:h-32 bg-olive-50 rounded-sm overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="font-serif text-olive-300 text-xs italic">
                                {product.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/shop/${product.slug}`}>
                          <h3 className="font-serif text-lg text-olive-900 hover:text-olive-700 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        {product.short_description && (
                          <p className="text-sm text-stone mt-0.5 line-clamp-1">
                            {product.short_description}
                          </p>
                        )}
                        <p className="text-olive-800 font-medium mt-1">
                          {formatPrice(product.price_cents)}
                          {product.size_ml && (
                            <span className="text-xs text-stone font-normal ml-1">
                              / {product.size_ml}ml
                            </span>
                          )}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-olive-200 rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              className="p-1.5 text-olive-600 hover:text-olive-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm text-olive-900">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              className="p-1.5 text-olive-600 hover:text-olive-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-stone hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                          <span className="ml-auto text-olive-900 font-medium">
                            {formatPrice(product.price_cents * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-olive-50/50 border border-olive-100 rounded-sm p-6 sticky top-28">
                  <h2 className="font-serif text-xl text-olive-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Subtotal */}
                  <div className="flex justify-between text-sm mb-5">
                    <span className="text-stone">Subtotal</span>
                    <span className="text-olive-900 font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Shipping Selection */}
                  <div className="mb-5">
                    <p className="text-sm text-stone mb-3">Shipping</p>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => {
                        const Icon = SHIPPING_ICONS[option.method];
                        const selected = shippingMethod === option.method;
                        const disabled = !option.available;
                        return (
                          <button
                            key={option.method}
                            onClick={() =>
                              !disabled && setShippingMethod(option.method)
                            }
                            disabled={disabled}
                            className={`w-full flex items-center gap-3 p-3 rounded-sm border text-left transition-all ${
                              selected
                                ? "border-olive-700 bg-olive-800/5"
                                : disabled
                                ? "border-olive-100 opacity-50 cursor-not-allowed"
                                : "border-olive-200 hover:border-olive-400"
                            }`}
                          >
                            <Icon
                              size={16}
                              className={
                                selected ? "text-olive-800" : "text-stone"
                              }
                            />
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium ${
                                  selected
                                    ? "text-olive-900"
                                    : "text-olive-800"
                                }`}
                              >
                                {option.label}
                              </p>
                              <p className="text-xs text-stone truncate">
                                {option.description}
                              </p>
                            </div>
                            <span
                              className={`text-sm font-medium shrink-0 ${
                                selected ? "text-olive-900" : "text-stone"
                              }`}
                            >
                              {option.cost === 0 ? (
                                <span
                                  className={
                                    option.available ? "text-green-700" : ""
                                  }
                                >
                                  Free
                                </span>
                              ) : (
                                formatPrice(option.cost)
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-olive-200 pt-4 flex justify-between">
                    <span className="text-olive-900 font-medium">
                      Estimated Total
                    </span>
                    <span className="text-olive-900 font-serif text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Link href="/checkout" className="block mt-6">
                    <Button variant="primary" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/shop"
                    className="block text-center mt-3 text-sm text-olive-700 hover:text-olive-900 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Suggested Items — always visible */}
        {suggestions.length > 0 && (
          <section
            className={`${hasItems ? "mt-16 pt-12 border-t border-olive-100" : "mt-4"}`}
          >
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs text-center mb-2">
              Completa la Tavola
            </p>
            <h2 className="font-serif text-2xl text-olive-900 text-center mb-8">
              {hasItems ? "You Might Also Enjoy" : "From Our Shelves"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {suggestions.map((product) => (
                <SuggestionCard
                  key={product.id}
                  product={product}
                  added={addedIds.has(product.id)}
                  onAdd={() => handleQuickAdd(product)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SuggestionCard({
  product,
  added,
  onAdd,
  formatPrice,
}: {
  product: typeof ALL_PRODUCTS[number];
  added: boolean;
  onAdd: () => void;
  formatPrice: (cents: number) => string;
}) {
  return (
    <div className="group">
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-[3/4] bg-olive-50 rounded-sm overflow-hidden mb-3">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-olive-300 text-sm italic">
                {product.name}
              </span>
            </div>
          )}
        </div>
      </Link>
      <Link href={`/shop/${product.slug}`}>
        <h3 className="font-serif text-sm text-olive-900 group-hover:text-olive-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
      </Link>
      <p className="text-sm text-olive-800 font-medium mt-0.5">
        {formatPrice(product.price_cents)}
      </p>
      <button
        onClick={onAdd}
        disabled={added}
        className={`mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
          added
            ? "bg-green-700 text-white"
            : "border border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
        }`}
      >
        {added ? (
          <>
            <Check size={12} /> Added
          </>
        ) : (
          <>
            <Plus size={12} /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
