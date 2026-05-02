"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 olive-gradient" />
      <div className="absolute inset-0 bg-[url('/images/hero/hero-grove.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">
          Sicilia &middot; Dal 1952
        </p>

        <h1 className="font-serif text-display-xl text-white mb-8 animate-slide-up text-balance">
          Dal cuore della Sicilia, alla tua tavola
        </h1>

        <p className="text-xl text-olive-200 max-w-2xl mx-auto mb-12 animate-slide-up animate-delay-100 leading-relaxed">
          Three generations of Mazzone family tradition. Single-origin extra
          virgin olive oil, cold-pressed within hours of harvest.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
          <Link href="/shop">
            <Button size="lg" className="bg-gold-500 text-olive-950 hover:bg-gold-400">
              Shop Collection
            </Button>
          </Link>
          <Link href="/our-family">
            <Button variant="secondary" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white">
              Our Family
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/50" />
      </div>
    </section>
  );
}
