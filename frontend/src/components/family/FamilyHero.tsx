export function FamilyHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/story/family.jpeg"
          alt="The Mazzone family"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-950/60 via-olive-950/40 to-olive-950/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">
          La Nostra Famiglia
        </p>
        <h1 className="font-serif text-display-xl text-white mb-8 animate-slide-up text-balance">
          Our Family
        </h1>
        <p className="text-xl text-olive-200 max-w-2xl mx-auto animate-slide-up animate-delay-100 leading-relaxed">
          From Puglia, with love. A family rooted in the olive groves of
          southern Italy, bringing authentic Italian products to Sarasota
          and beyond since 1998.
        </p>
      </div>
    </section>
  );
}
