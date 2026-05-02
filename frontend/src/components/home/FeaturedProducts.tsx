import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/types";

// Mock data — replaced by API call in production
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nocellara Extra Vergine",
    slug: "nocellara-extra-vergine",
    short_description: "Single-origin Nocellara del Belice. Peppery finish with notes of green almond.",
    price_cents: 3400,
    compare_price_cents: null,
    category: "oil",
    size_ml: 500,
    origin: "Val di Mazara, Sicilia",
    harvest_year: 2025,
    tasting_notes: { aroma: "Fresh grass, tomato leaf", flavor: "Green almond, artichoke", finish: "Peppery, lingering warmth" },
    image_url: "/images/products/evoo-500.jpeg",
    gallery_urls: null,
    stock_quantity: 45,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Blend Classico",
    slug: "blend-classico",
    short_description: "Our signature family blend. Balanced, fruity, perfect for everyday cooking.",
    price_cents: 2800,
    compare_price_cents: null,
    category: "oil",
    size_ml: 750,
    origin: "Sicilia",
    harvest_year: 2025,
    tasting_notes: { aroma: "Ripe olive, herbs", flavor: "Buttery, mild pepper", finish: "Clean, smooth" },
    image_url: "/images/products/blend.jpeg",
    gallery_urls: null,
    stock_quantity: 120,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    name: "Olio Nuovo",
    slug: "olio-nuovo",
    short_description: "First press of the season. Vibrant, intense, unfiltered. Limited edition.",
    price_cents: 4200,
    compare_price_cents: null,
    category: "oil",
    size_ml: 500,
    origin: "Castelvetrano, Sicilia",
    harvest_year: 2025,
    tasting_notes: { aroma: "Freshly cut grass, green banana", flavor: "Intense artichoke, bitter greens", finish: "Long peppery kick" },
    image_url: "/images/products/olio-nuovo.jpeg",
    gallery_urls: null,
    stock_quantity: 18,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    name: "Olio al Limone",
    slug: "olio-al-limone",
    short_description: "Sicilian lemons pressed with fresh olives. Bright, citrusy, versatile.",
    price_cents: 2400,
    compare_price_cents: null,
    category: "oil",
    size_ml: 250,
    origin: "Sicilia",
    harvest_year: 2025,
    tasting_notes: { aroma: "Lemon zest, fresh olive", flavor: "Bright citrus, mild olive", finish: "Clean, refreshing" },
    image_url: "/images/products/limone.jpeg",
    gallery_urls: null,
    stock_quantity: 60,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            La Collezione
          </p>
          <h2 className="font-serif text-display text-olive-900">
            Our Olive Oils
          </h2>
          <p className="text-stone mt-4 max-w-xl mx-auto">
            Each bottle tells the story of our Sicilian groves — the soil, the
            sun, and the hands that harvest.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
