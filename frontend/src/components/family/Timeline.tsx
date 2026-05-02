const MILESTONES = [
  {
    year: "Generations",
    title: "The Mazzone Grove",
    description:
      "The Mazzone family has tended olive groves in Ruvo di Puglia, Italy for generations. Giacomo and his son Giuseppe continue the family tradition of producing some of the region's finest extra virgin olive oil.",
  },
  {
    year: "1994",
    title: "A New Home",
    description:
      "Cinzia Testini Forbes, born in Ruvo di Puglia, marries Mike in Italy. They move to the United States together, bringing a deep love for Italian food, culture, and family tradition.",
  },
  {
    year: "1998",
    title: "The Farmers Market",
    description:
      "Cinzia and Mike begin selling their family's extra virgin olive oil at the Sarasota Farmers Market — just one year after relocating to the area. The community responds with enthusiasm.",
  },
  {
    year: "2010",
    title: "The Store Opens",
    description:
      "Community demand for authentic Italian products unavailable in stores leads the Mazzone family to open a retail location at 6300 South Tamiami Trail in Sarasota, Florida.",
  },
  {
    year: "Today",
    title: "La Famiglia Grows",
    description:
      "Events, cooking classes, Italian language lessons, tours of Italy, and a full online shop — the Mazzone family table has never been bigger. But the oil is still stone-milled and first cold-pressed, the same way it's always been.",
  },
];

export function Timeline() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            La Nostra Storia
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            Our Story
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-olive-200 -translate-x-1/2" />

          <div className="space-y-12">
            {MILESTONES.map((milestone, i) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-gold-500 rounded-full -translate-x-1/2 mt-2 ring-4 ring-warm-white z-10" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="text-gold-500 font-serif text-2xl">
                    {milestone.year}
                  </span>
                  <h3 className="font-serif text-xl text-olive-900 mt-1 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-stone leading-relaxed text-sm">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
