import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Wine, ChefHat, Languages } from "lucide-react";

const UPCOMING = [
  {
    icon: Wine,
    type: "Wine Tasting",
    title: "Sicilian Wines & Olive Oil Pairing",
    date: "June 14, 2026",
    location: "Mazzone Tasting Room",
  },
  {
    icon: ChefHat,
    type: "Cooking Class",
    title: "Summer Pasta: From Flour to Fork",
    date: "June 21, 2026",
    location: "Mazzone Kitchen Studio",
  },
  {
    icon: Languages,
    type: "Language Class",
    title: "Italian for the Table",
    date: "July 5, 2026",
    location: "Online + In-Person",
  },
];

export function EventsTeaser() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Eventi
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900">
            Upcoming Events
          </h2>
          <p className="text-stone mt-4 max-w-xl mx-auto">
            Join the Mazzone family for tastings, cooking classes, and Italian
            culture experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {UPCOMING.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.title}
                className="bg-white border border-olive-100 rounded-sm p-6 hover:border-olive-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={16} className="text-gold-500" />
                  <span className="text-xs uppercase tracking-wider text-gold-600">
                    {event.type}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-olive-900 mb-3">
                  {event.title}
                </h3>
                <div className="space-y-1 text-sm text-olive-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} />
                    <span>{event.date}</span>
                  </div>
                  <p className="text-stone text-xs">{event.location}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/events">
            <Button variant="secondary">View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
