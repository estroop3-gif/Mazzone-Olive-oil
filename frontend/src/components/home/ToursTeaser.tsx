import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plane, MapPin } from "lucide-react";

export function ToursTeaser() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image — real Mazzone coast photo */}
      <div className="absolute inset-0">
        <img
          src="/images/tours/vista-coast.jpg"
          alt="Vista sul mare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-950/85 via-olive-950/70 to-olive-950/50" />
      </div>

      <div className="relative z-10 container-wide py-section">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Plane size={16} className="text-gold-400" />
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">
              Viaggi in Italia
            </p>
          </div>
          <h2 className="font-serif text-display text-white mb-6 text-balance">
            Travel to Italy with our family
          </h2>
          <p className="text-lg text-olive-200 leading-relaxed mb-8">
            Become part of the Mazzone family tree. Tour Puglia and Piemonte
            with us — olive harvests, truffle hunting, winery tours, and
            experiences you can&apos;t get from a bottle.
          </p>

          <div className="flex flex-wrap gap-6 mb-10 text-sm text-olive-300">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-400" />
              Puglia &middot; Piemonte &middot; Sicily
            </span>
          </div>

          <Link href="/tours">
            <Button size="lg" className="bg-gold-500 text-olive-950 hover:bg-gold-400">
              Explore Italian Tours
            </Button>
          </Link>

          <p className="mt-4 font-serif text-sm text-olive-400 italic">
            &ldquo;Truly the trip of a lifetime. I wasn&apos;t Italian when I went, but I am now!&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
