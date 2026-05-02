import Link from "next/link";
import { Button } from "@/components/ui/Button";

const RECENT_POSTS = [
  {
    slug: "perfect-bruschetta",
    category: "Recipes",
    title: "The Perfect Bruschetta Starts with the Oil",
    excerpt:
      "Forget everything you think you know about bruschetta. The secret isn't the tomatoes — it's the olive oil.",
    image: "/images/story/olive-tree.jpeg",
  },
  {
    slug: "harvest-2025",
    category: "From the Grove",
    title: "Harvest 2025: A Season of Abundance",
    excerpt:
      "This year's Nocellara crop exceeded all expectations. Here's what made this season special.",
    image: null,
  },
  {
    slug: "sunday-sauce-tradition",
    category: "Italian Culture",
    title: "The Sunday Sauce: More Than a Recipe",
    excerpt:
      "In every Italian family, Sunday sauce is a ritual. Ours starts at dawn with a drizzle of Blend Classico.",
    image: null,
  },
];

export function JournalTeaser() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Il Giornale
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            From the Journal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {RECENT_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group block"
            >
              <div className="aspect-[3/2] bg-olive-100 rounded-sm overflow-hidden mb-4">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-olive-300 italic">
                      Il Giornale
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-1">
                {post.category}
              </p>
              <h3 className="font-serif text-lg text-olive-900 group-hover:text-olive-700 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-stone line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/journal">
            <Button variant="secondary">Read the Journal</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
