import { FamilyHero } from "@/components/family/FamilyHero";
import { Timeline } from "@/components/family/Timeline";
import { FarmersMarkets } from "@/components/family/FarmersMarkets";

export default function OurFamilyPage() {
  return (
    <div>
      <FamilyHero />

      {/* The Family — From Puglia, With Love */}
      <section className="section-padding bg-cream">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-sm overflow-hidden bg-olive-50">
              <img
                src="/images/story/cinzia-boat.jpg"
                alt="Cinzia Mazzone"
                className="w-full h-auto rounded-sm"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-300 rounded-sm -z-10" />
          </div>

          <div className="lg:pl-8">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
              Dalla Puglia, Con Amore
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
              From Puglia, With Love
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                Cinzia Testini Forbes was born in Ruvo di Puglia, Italy. She met
                her husband, Mike, while in Italy. They married and later moved
                to the U.S. in 1994. They have two children, Carroll and Alessandro.
              </p>
              <p>
                In 2010, Cinzia introduced Sarasota, Florida, to her family&apos;s
                extra virgin olive oil. What began at the Sarasota Farmers Market
                in 1998 — one year after relocating — grew into a beloved local
                institution, driven by community demand for authentic Italian
                products unavailable in stores.
              </p>
              <p className="font-serif text-olive-700 italic text-lg">
                &ldquo;We are a company that is first and foremost a family. Our
                company values are established upon our Christian faith and the
                love of people.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giuseppe & Giacomo — Puglia */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-2">
            <div className="rounded-sm overflow-hidden bg-olive-50">
              <img
                src="/images/story/ggmazzone.jpg"
                alt="Giuseppe and Giacomo Mazzone in Puglia"
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="lg:order-1 lg:pr-8">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
              Ruvo di Puglia, Italia
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
              Giuseppe & Giacomo
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                Giuseppe is the owner of Mazzone Extravergine in Ruvo di Puglia.
                He and Giacomo, his father, continue the family practice of caring
                for the Mazzone olive groves and producing some of the region&apos;s
                finest extra virgin olive oil.
              </p>
              <p>
                Their oil is stone-milled and first cold-pressed — the traditional
                method that preserves the full character and nutrition of the fruit.
                No chemicals, no heat, no shortcuts.
              </p>
              <p>
                Every bottle of Mazzone olive oil traces directly back to these
                groves and these hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Olive Oil */}
      <section className="section-padding bg-olive-900 text-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold-400 uppercase tracking-[0.2em] text-sm mb-4">
              Il Nostro Olio
            </p>
            <h2 className="font-serif text-heading-lg mb-6">
              Our Olive Oil
            </h2>
            <div className="space-y-4 text-olive-200 leading-relaxed">
              <p>
                Mazzone extra virgin olive oil is stone-milled and first
                cold-pressed in Puglia, Italy. The Pugliese olive groves
                produce olives with exceptional character — rich, peppery,
                and full of the polyphenols that make real EVOO both
                delicious and healthful.
              </p>
              <p>
                Beyond our signature extra virgin, we offer a full range of
                infused and fused olive oils — basil, lemon, orange, oregano,
                rosemary, garlic, pepper, and white truffle — as well as
                balsamic vinegars, reductions, spices, sauces, and pantry
                staples imported from Italy.
              </p>
              <p>
                Everything we sell, we stand behind. If it&apos;s in our shop,
                it&apos;s because our family uses it at our own table.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-sm overflow-hidden">
              <img
                src="/images/story/stone-milling.jpg"
                alt="Traditional stone milling of Mazzone olive oil"
                className="w-full h-auto rounded-sm opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Grove */}
      <section className="section-padding bg-cream">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="rounded-sm overflow-hidden bg-olive-50">
              <img
                src="/images/story/pugliese-trees.jpg"
                alt="Pugliese olive trees in the Mazzone grove"
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
              L&apos;Uliveto
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
              The Grove
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                The Mazzone olive groves sit in Puglia, the heel of Italy&apos;s
                boot, near the Adriatic coast. This region is home to some of the
                oldest and most productive olive trees in the world — some over
                a thousand years old.
              </p>
              <p>
                Giuseppe and Giacomo tend the groves through every season —
                pruning, harvesting by hand, and pressing within hours to
                capture the freshest flavor possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="bg-warm-white py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
          {[
            { src: "/images/story/olives-hands.jpg", alt: "Olives in hands" },
            { src: "/images/story/carmine-show.jpg", alt: "Carmine at a show" },
            { src: "/images/story/grove-tree.jpg", alt: "Olive tree in the grove" },
            { src: "/images/story/bottle-lineup.jpg", alt: "Mazzone olive oil bottles" },
          ].map((img) => (
            <div key={img.src} className="rounded-sm overflow-hidden bg-olive-50">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      <Timeline />
      <FarmersMarkets />

      {/* The Process */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
            Il Processo
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-12">
            From Grove to Bottle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl text-olive-700">1</span>
              </div>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                La Raccolta
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                Hand-harvested at peak ripeness. Every olive is picked
                carefully to avoid bruising and preserve quality.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl text-olive-700">2</span>
              </div>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                La Spremitura
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                Stone-milled and first cold-pressed. The traditional method
                preserves the full character and nutrition of the fruit.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl text-olive-700">3</span>
              </div>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                L&apos;Imbottigliamento
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                Bottled and shipped directly to our Sarasota store and
                to your door. Nothing added, nothing removed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
