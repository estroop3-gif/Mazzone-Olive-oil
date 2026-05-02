import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ClubCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 olive-gradient" />
      <div className="absolute inset-0 opacity-10">
        {/* Decorative olive branch pattern could go here */}
        <svg
          className="absolute top-10 right-10 w-64 h-64 text-olive-600 opacity-20"
          viewBox="0 0 100 100"
          fill="none"
        >
          <ellipse cx="50" cy="45" rx="12" ry="20" fill="currentColor" />
          <ellipse cx="35" cy="55" rx="10" ry="17" fill="currentColor" transform="rotate(-20 35 55)" />
          <ellipse cx="65" cy="55" rx="10" ry="17" fill="currentColor" transform="rotate(20 65 55)" />
          <path d="M50 65 Q50 80 50 95" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 container-narrow py-section text-center">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
          Il Club Mazzone
        </p>

        <h2 className="font-serif text-display text-white mb-6 text-balance">
          La dolce vita, delivered monthly
        </h2>

        <p className="text-xl text-olive-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          Join our olive oil club and receive hand-selected bottles from each
          harvest. Includes tasting notes, pairing suggestions, and recipes from
          Nonna&apos;s kitchen.
        </p>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
            <h3 className="font-serif text-white text-lg mb-1">Singolo</h3>
            <p className="text-olive-300 text-sm mb-3">1 bottle / month</p>
            <p className="text-gold-400 text-2xl font-serif">$35</p>
          </div>
          <div className="bg-white/10 border border-gold-500/30 rounded-sm p-6 backdrop-blur-sm ring-1 ring-gold-500/20">
            <p className="text-gold-400 text-xs uppercase tracking-wider mb-2">Most Popular</p>
            <h3 className="font-serif text-white text-lg mb-1">Duo</h3>
            <p className="text-olive-300 text-sm mb-3">2 bottles / month</p>
            <p className="text-gold-400 text-2xl font-serif">$62</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
            <h3 className="font-serif text-white text-lg mb-1">Collezione</h3>
            <p className="text-olive-300 text-sm mb-3">4 bottles / quarter</p>
            <p className="text-gold-400 text-2xl font-serif">$89</p>
          </div>
        </div>

        <Link href="/club">
          <Button size="lg" className="bg-gold-500 text-olive-950 hover:bg-gold-400">
            Join Il Club
          </Button>
        </Link>

        <p className="mt-4 text-sm text-olive-400">
          Free shipping &middot; Cancel anytime &middot; Exclusive member pricing
        </p>
      </div>
    </section>
  );
}
