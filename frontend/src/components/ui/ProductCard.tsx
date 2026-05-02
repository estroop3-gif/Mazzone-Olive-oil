"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = (product.price_cents / 100).toFixed(2);
  const comparePrice = product.compare_price_cents
    ? (product.compare_price_cents / 100).toFixed(2)
    : null;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group block">
      {/* Image — links to detail */}
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-[3/4] bg-olive-50 rounded-sm overflow-hidden mb-5">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-olive-300 text-lg italic">
                {product.name}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="space-y-1">
        {product.origin && (
          <p className="text-xs uppercase tracking-wider text-stone">
            {product.origin}
          </p>
        )}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg text-olive-900 group-hover:text-olive-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="text-sm text-stone line-clamp-2">
            {product.short_description}
          </p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-olive-800 font-medium">${price}</span>
          {comparePrice && (
            <span className="text-stone line-through text-sm">
              ${comparePrice}
            </span>
          )}
          {product.size_ml && (
            <span className="text-xs text-stone">/ {product.size_ml}ml</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={added}
          className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
            added
              ? "bg-green-700 text-white"
              : "bg-olive-800 text-white hover:bg-olive-700 active:bg-olive-900"
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
