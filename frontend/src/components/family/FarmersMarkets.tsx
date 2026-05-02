import { MapPin, Clock } from "lucide-react";

const MARKETS = [
  {
    name: "Union Square Greenmarket",
    location: "Union Square, New York, NY",
    schedule: "Saturdays, 8am – 5pm",
    season: "Year-round",
  },
  {
    name: "Montclair Farmers Market",
    location: "Walnut Street, Montclair, NJ",
    schedule: "Saturdays, 8am – 2pm",
    season: "June – November",
  },
  {
    name: "Hoboken Farmers Market",
    location: "Sinatra Park, Hoboken, NJ",
    schedule: "Tuesdays, 4pm – 8pm",
    season: "June – October",
  },
  {
    name: "Summit Farmers Market",
    location: "DeForest Avenue, Summit, NJ",
    schedule: "Sundays, 8am – 1pm",
    season: "May – November",
  },
];

export function FarmersMarkets() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Il Mercato
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            Find Us Locally
          </h2>
          <p className="text-stone mt-4 max-w-xl mx-auto">
            Meet the family in person. Taste before you buy, and hear the
            stories behind each bottle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {MARKETS.map((market) => (
            <div
              key={market.name}
              className="bg-white border border-olive-100 rounded-sm p-6 hover:border-olive-300 transition-colors"
            >
              <h3 className="font-serif text-lg text-olive-900 mb-3">
                {market.name}
              </h3>
              <div className="space-y-2 text-sm text-olive-600">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  <span>{market.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0" />
                  <span>{market.schedule}</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-stone uppercase tracking-wide">
                {market.season}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
