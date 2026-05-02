import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function StoryTeaser() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/5] bg-olive-100 rounded-sm overflow-hidden">
            <img
              src="/images/story/olive-tree.jpeg"
              alt="Mazzone family olive grove in Sicily"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-300 rounded-sm -z-10" />
        </div>

        {/* Text */}
        <div className="lg:pl-8">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
            La Nostra Famiglia
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
            Tre generazioni di tradizione
          </h2>
          <div className="space-y-4 text-stone leading-relaxed">
            <p>
              In 1952, Nonno Giuseppe planted his first olive grove on the
              sun-drenched hillsides of western Sicily. What began as a family
              tradition has become a lifelong dedication to producing the finest
              extra virgin olive oil.
            </p>
            <p>
              Today, the Mazzone family continues to harvest by hand, press
              within hours, and bottle with the same care that Giuseppe taught
              his children — and they taught theirs.
            </p>
            <p className="font-serif text-olive-700 italic text-lg">
              &ldquo;L&apos;olio buono si fa con le mani e con il cuore.&rdquo;
            </p>
            <p className="text-sm text-stone">
              — Good oil is made with hands and heart.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/our-family">
              <Button variant="secondary">
                Scopri la nostra famiglia
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
