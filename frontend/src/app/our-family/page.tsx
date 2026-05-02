import { FamilyHero } from "@/components/family/FamilyHero";
import { Timeline } from "@/components/family/Timeline";
import { FarmersMarkets } from "@/components/family/FarmersMarkets";

export default function OurFamilyPage() {
  return (
    <div>
      <FamilyHero />

      {/* The Family */}
      <section className="section-padding bg-cream">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-olive-100 rounded-sm overflow-hidden">
              <img
                src="/images/story/olive-tree.jpeg"
                alt="The Mazzone family in their grove"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-300 rounded-sm -z-10" />
          </div>

          <div className="lg:pl-8">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
              La Famiglia
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
              Three Generations at the Table
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
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4">
            La Missione
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-8">
            Why We Do It
          </h2>
          <div className="space-y-6 text-stone leading-relaxed max-w-2xl mx-auto">
            <p>
              We believe the world deserves real olive oil — not the
              mass-produced, diluted product that fills most supermarket
              shelves. Every bottle of Mazzone oil is traceable to a single
              grove, pressed within hours of harvest, and bottled without
              blending or additives.
            </p>
            <p>
              Our mission is simple: bring the honest flavors of Sicily to your
              table, and keep the traditions alive for the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* The Grove */}
      <section className="section-padding bg-olive-900 text-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-gold-400 uppercase tracking-[0.2em] text-sm mb-4">
              L&apos;Uliveto
            </p>
            <h2 className="font-serif text-heading-lg mb-6">
              The Grove
            </h2>
            <div className="space-y-4 text-olive-200 leading-relaxed">
              <p>
                Our groves sit on the western coast of Sicily, between Castelvetrano
                and the ancient ruins of Selinunte. The terroir — mineral-rich
                clay soil, Mediterranean breezes, and 300 days of sun — produces
                olives with unmatched complexity.
              </p>
              <p>
                We cultivate primarily Nocellara del Belice, the prized varietal
                native to this corner of the island. Hand-harvested in October
                and November, cold-pressed within four hours.
              </p>
              <p>
                No chemicals, no irrigation, no shortcuts. The grove has been
                organic since before the word existed.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] bg-olive-800 rounded-sm overflow-hidden">
              <img
                src="/images/story/olive-tree.jpeg"
                alt="Mazzone olive grove in Sicily"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <Timeline />
      <FarmersMarkets />

      {/* The Tradition */}
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
                Hand-harvested at peak ripeness in October and November. Every
                olive is picked by hand to avoid bruising.
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
                Cold-pressed within four hours of harvest. Low temperatures
                preserve the delicate flavors and antioxidants.
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
                Bottled unfiltered or lightly filtered. Dark glass protects the
                oil from light. Sealed with nothing but olive oil inside.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
