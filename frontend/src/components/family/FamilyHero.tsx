export function FamilyHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 olive-gradient" />
      <div className="absolute inset-0 bg-[url('/images/story/olive-tree.jpeg')] bg-cover bg-center opacity-25 mix-blend-overlay" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">
          La Nostra Famiglia
        </p>
        <h1 className="font-serif text-display-xl text-white mb-8 animate-slide-up text-balance">
          Our Family
        </h1>
        <p className="text-xl text-olive-200 max-w-2xl mx-auto animate-slide-up animate-delay-100 leading-relaxed">
          Three generations of Mazzone passion, rooted in the sun-drenched
          hillsides of western Sicily. This is our story — told through the
          oil we press and the table we share.
        </p>
      </div>
    </section>
  );
}
