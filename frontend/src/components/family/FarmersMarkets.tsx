import { MapPin, Clock, Phone, Mail } from "lucide-react";

const LOCATIONS = [
  {
    name: "Mazzone Olive Oil Store",
    type: "Retail Store",
    location: "6300 South Tamiami Trail, Sarasota, FL 34231",
    schedule: "Mon–Fri 10am–5pm, Sat 10am–2pm",
    note: null,
  },
  {
    name: "Sarasota Farmers Market",
    type: "Farmers Market",
    location: "Lemon Street, Downtown Sarasota",
    schedule: "Saturdays 7am–1pm",
    note: "Florida's largest year-round farmers market",
  },
  {
    name: "The Market at Lakewood Ranch",
    type: "Farmers Market",
    location: "Lakewood Ranch, FL",
    schedule: "Sundays 10am–2pm",
    note: null,
  },
];

export function FarmersMarkets() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Dove Trovarci
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            Find Us
          </h2>
          <p className="text-stone mt-4 max-w-xl mx-auto">
            Visit our Sarasota store, find us at the farmers market, or
            shop online. Meet the family, taste before you buy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="bg-white border border-olive-100 rounded-sm p-6 hover:border-olive-300 transition-colors"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-2">
                {loc.type}
              </p>
              <h3 className="font-serif text-lg text-olive-900 mb-3">
                {loc.name}
              </h3>
              <div className="space-y-2 text-sm text-olive-600">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5" />
                  <span>{loc.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0" />
                  <span>{loc.schedule}</span>
                </div>
              </div>
              {loc.note && (
                <p className="mt-3 text-xs text-stone italic">
                  {loc.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 text-center space-y-2">
          <div className="flex items-center justify-center gap-6 text-sm text-olive-600">
            <span className="flex items-center gap-2">
              <Phone size={14} />
              941-927-6573
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} />
              info@mazzoneoliveoil.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
