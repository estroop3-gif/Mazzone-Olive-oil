const MILESTONES = [
  {
    year: "1952",
    title: "The First Grove",
    description:
      "Nonno Giuseppe plants his first olive grove on the hillsides of western Sicily, beginning what would become a family legacy.",
  },
  {
    year: "1970s",
    title: "The Craft Deepens",
    description:
      "The second generation inherits the grove and the knowledge. Traditional cold-press methods are refined, and the family begins supplying local markets.",
  },
  {
    year: "1990s",
    title: "Beyond Sicily",
    description:
      "The Mazzone name reaches beyond the island. Word spreads through Italian-American communities, and the first exports begin.",
  },
  {
    year: "2010",
    title: "A New Chapter",
    description:
      "The third generation brings Mazzone online, introducing the family's oils, vinegars, and pantry staples to a national audience.",
  },
  {
    year: "Today",
    title: "La Famiglia Grows",
    description:
      "Events, classes, farmer's markets, and Il Club Mazzone — the family table has never been bigger. But the oil is still pressed the same way Giuseppe taught.",
  },
];

export function Timeline() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            La Nostra Tradizione
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            A Family Timeline
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
