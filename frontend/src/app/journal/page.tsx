"use client";

import { useState } from "react";
import { PostCard } from "@/components/journal/PostCard";
import { BlogPost } from "@/types";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "recipes", label: "Recipes" },
  { key: "italian_culture", label: "Italian Culture" },
  { key: "from_the_grove", label: "From the Grove" },
  { key: "local", label: "Local" },
];

// Mock data — replaced by API call in production
const MOCK_POSTS: BlogPost[] = [
  {
    id: "p1", title: "The Perfect Bruschetta Starts with the Oil", slug: "perfect-bruschetta",
    excerpt: "Forget everything you think you know about bruschetta. The secret isn't the tomatoes — it's the olive oil. Here's how we make it at the Mazzone table.",
    content: null, image_url: "/images/story/olive-tree.jpeg",
    category: "recipes", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-04-28T10:00:00Z",
    created_at: "", updated_at: "",
  },
  {
    id: "p2", title: "Harvest 2025: A Season of Abundance", slug: "harvest-2025",
    excerpt: "This year's Nocellara crop exceeded all expectations. Warm days, cool nights, and just enough rain — here's what made this season special.",
    content: null, image_url: null,
    category: "from_the_grove", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-04-15T10:00:00Z",
    created_at: "", updated_at: "",
  },
  {
    id: "p3", title: "The Sunday Sauce: More Than a Recipe", slug: "sunday-sauce-tradition",
    excerpt: "In every Italian family, Sunday sauce is a ritual. Ours starts at dawn with a drizzle of Blend Classico and a prayer to Nonna.",
    content: null, image_url: null,
    category: "italian_culture", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-04-01T10:00:00Z",
    created_at: "", updated_at: "",
  },
  {
    id: "p4", title: "What 'Extra Virgin' Actually Means", slug: "what-extra-virgin-means",
    excerpt: "Most olive oil labeled 'extra virgin' isn't. Here's the truth about grading, fraud, and how to buy real EVOO.",
    content: null, image_url: null,
    category: "italian_culture", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-03-20T10:00:00Z",
    created_at: "", updated_at: "",
  },
  {
    id: "p5", title: "Montclair Farmers Market: Season Opener", slug: "montclair-market-opener",
    excerpt: "We're back at the Montclair market for 2026. New products, same family, same Sicilian sunshine in a bottle.",
    content: null, image_url: null,
    category: "local", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-03-10T10:00:00Z",
    created_at: "", updated_at: "",
  },
  {
    id: "p6", title: "Aglio e Olio: The 5-Ingredient Masterpiece", slug: "aglio-e-olio",
    excerpt: "When the pantry is nearly bare but the olive oil is good, you make aglio e olio. Our family's version uses Olio Nuovo for maximum impact.",
    content: null, image_url: null,
    category: "recipes", author_name: "Mazzone Family",
    is_published: true, published_at: "2026-02-25T10:00:00Z",
    created_at: "", updated_at: "",
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? MOCK_POSTS
    : MOCK_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-olive-900 py-20 text-center">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-3">
          Il Giornale
        </p>
        <h1 className="font-serif text-display text-white mb-4">
          The Journal
        </h1>
        <p className="text-olive-300 max-w-xl mx-auto">
          Recipes, harvest stories, Italian traditions, and news from our
          corner of the world.
        </p>
      </section>

      {/* Filter */}
      <section className="bg-warm-white pt-12">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-sm uppercase tracking-wide rounded-sm transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-olive-800 text-white"
                    : "bg-olive-50 text-olive-700 hover:bg-olive-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-olive-400 italic">
                No posts in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
