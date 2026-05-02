import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = (product.price_cents / 100).toFixed(2);
  const comparePrice = product.compare_price_cents
    ? (product.compare_price_cents / 100).toFixed(2)
    : null;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image */}
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

      {/* Details */}
      <div className="space-y-1">
        {product.origin && (
          <p className="text-xs uppercase tracking-wider text-stone">
            {product.origin}
          </p>
        )}
        <h3 className="font-serif text-lg text-olive-900 group-hover:text-olive-700 transition-colors">
          {product.name}
        </h3>
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
      </div>
    </Link>
  );
}
