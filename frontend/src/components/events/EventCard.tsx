import Link from "next/link";
import { Event } from "@/types";
import { Calendar, MapPin, Clock } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  wine_tasting: "Wine Tasting",
  cooking_class: "Cooking Class",
  language_class: "Language Class",
  private_event: "Private Event",
  market: "Farmer's Market",
  other: "Event",
};

export function EventCard({ event }: EventCardProps) {
  const price = event.price_cents > 0
    ? `$${(event.price_cents / 100).toFixed(0)}`
    : "Free";

  const dateFormatted = new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/events#${event.slug}`} className="group block">
      <div className="bg-white rounded-sm overflow-hidden border border-olive-100 hover:border-olive-300 transition-colors duration-300">
        {/* Image */}
        <div className="aspect-[16/9] bg-olive-50 overflow-hidden">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-olive-100 to-olive-200">
              <Calendar size={40} className="text-olive-300" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs uppercase tracking-wider text-gold-600 mb-2">
            {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
          </p>
          <h3 className="font-serif text-xl text-olive-900 mb-3 group-hover:text-olive-700 transition-colors">
            {event.title}
          </h3>
          {event.short_description && (
            <p className="text-sm text-stone leading-relaxed mb-4 line-clamp-2">
              {event.short_description}
            </p>
          )}
          <div className="space-y-2 text-sm text-olive-600">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{dateFormatted}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{event.time}{event.end_time ? ` – ${event.end_time}` : ""}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-olive-50 flex items-center justify-between">
            <span className="text-olive-800 font-medium">{price}</span>
            {event.capacity && (
              <span className="text-xs text-stone">
                {event.capacity} spots
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
