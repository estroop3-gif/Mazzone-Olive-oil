import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-20">
      <article className="section-padding bg-warm-white">
        <div className="container-narrow">
          <div className="mb-8">
            <Link
              href="/journal"
              className="text-sm text-olive-600 hover:text-olive-800 transition-colors"
            >
              &larr; Back to Journal
            </Link>
          </div>

          <header className="text-center mb-12">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
              Il Giornale
            </p>
            <h1 className="font-serif text-display text-olive-900 mb-4 text-balance">
              {params.slug
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </h1>
            <p className="text-stone text-sm">
              By the Mazzone Family
            </p>
          </header>

          <div className="prose prose-olive max-w-none text-stone leading-relaxed space-y-6">
            <p>
              This is a placeholder for the full article content. In production,
              this page will fetch the blog post by slug from the API and render
              the full content with rich formatting.
            </p>
            <p>
              The journal is where we share recipes from Nonna&apos;s kitchen,
              stories from the grove, and the traditions that keep our family
              connected across generations and oceans.
            </p>
            <p className="font-serif text-olive-700 italic text-xl text-center py-4">
              &ldquo;La buona cucina comincia con il buon olio.&rdquo;
            </p>
            <p className="text-sm text-center text-stone">
              — Good cooking begins with good oil.
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link href="/journal">
              <Button variant="secondary">More from the Journal</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
