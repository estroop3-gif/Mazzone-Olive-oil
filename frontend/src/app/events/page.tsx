"use client";

import { useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";
import { Event } from "@/types";

const EVENT_TYPES = [
  { key: "all", label: "All Events" },
  { key: "wine_tasting", label: "Wine Tastings" },
  { key: "cooking_class", label: "Cooking Classes" },
  { key: "language_class", label: "Language Classes" },
  { key: "market", label: "Markets" },
];

// Mock data — replaced by API call in production
const MOCK_EVENTS: Event[] = [
  {
    id: "e1", title: "Sicilian Wines & Olive Oil Pairing", slug: "sicilian-wines-pairing",
    short_description: "Discover how the flavors of Sicily's finest wines complement our single-origin olive oils. Guided by a certified sommelier.",
    description: "", date: "2026-06-14", time: "18:00", end_time: "20:30",
    location: "Mazzone Tasting Room, Montclair NJ", event_type: "wine_tasting",
    image_url: null, capacity: 24, price_cents: 6500, is_active: true, is_featured: true,
    created_at: "", updated_at: "",
  },
  {
    id: "e2", title: "Summer Pasta: From Flour to Fork", slug: "summer-pasta-class",
    short_description: "Learn to make fresh pasta by hand — orecchiette, cavatelli, and busiate. Includes dinner and wine.",
    description: "", date: "2026-06-21", time: "14:00", end_time: "17:00",
    location: "Mazzone Kitchen Studio, Montclair NJ", event_type: "cooking_class",
    image_url: null, capacity: 16, price_cents: 8500, is_active: true, is_featured: true,
    created_at: "", updated_at: "",
  },
  {
    id: "e3", title: "Italian for the Table", slug: "italian-for-the-table",
    short_description: "A conversational Italian class focused on food, wine, and the phrases you need at an Italian table.",
    description: "", date: "2026-07-05", time: "11:00", end_time: "12:30",
    location: "Online + In-Person", event_type: "language_class",
    image_url: null, capacity: 30, price_cents: 3500, is_active: true, is_featured: false,
    created_at: "", updated_at: "",
  },
  {
    id: "e4", title: "Limoncello Making Workshop", slug: "limoncello-workshop",
    short_description: "Make your own limoncello from scratch using Sicilian lemons. Take home a bottle.",
    description: "", date: "2026-07-12", time: "15:00", end_time: "17:30",
    location: "Mazzone Kitchen Studio, Montclair NJ", event_type: "cooking_class",
    image_url: null, capacity: 20, price_cents: 7500, is_active: true, is_featured: false,
    created_at: "", updated_at: "",
  },
  {
    id: "e5", title: "Harvest Dinner Under the Stars", slug: "harvest-dinner",
    short_description: "A multi-course Italian dinner celebrating the new harvest. Live music, family-style seating.",
    description: "", date: "2026-10-18", time: "18:30", end_time: "22:00",
    location: "Mazzone Family Garden, Montclair NJ", event_type: "wine_tasting",
    image_url: null, capacity: 50, price_cents: 12000, is_active: true, is_featured: true,
    created_at: "", updated_at: "",
  },
  {
    id: "e6", title: "Union Square Greenmarket", slug: "union-square-market-june",
    short_description: "Find us at Union Square every Saturday. Taste our oils, meet the family, shop the full collection.",
    description: "", date: "2026-06-07", time: "08:00", end_time: "17:00",
    location: "Union Square, New York, NY", event_type: "market",
    image_url: null, capacity: null, price_cents: 0, is_active: true, is_featured: false,
    created_at: "", updated_at: "",
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter((e) => e.event_type === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-olive-900 py-20 text-center">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-3">
          Eventi
        </p>
        <h1 className="font-serif text-display text-white mb-4">
          Events & Classes
        </h1>
        <p className="text-olive-300 max-w-xl mx-auto">
          Wine tastings, cooking classes, Italian language lessons, and seasonal
          celebrations. Join the Mazzone family at the table.
        </p>
      </section>

      {/* Filter */}
      <section className="bg-warm-white pt-12">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {EVENT_TYPES.map((type) => (
              <button
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`px-5 py-2.5 text-sm uppercase tracking-wide rounded-sm transition-all duration-200 ${
                  filter === type.key
                    ? "bg-olive-800 text-white"
                    : "bg-olive-50 text-olive-700 hover:bg-olive-100"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-olive-400 italic">
                No upcoming events in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Private Events CTA */}
      <section className="section-padding bg-cream">
        <div className="container-narrow text-center">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Eventi Privati
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-4">
            Host a Private Event
          </h2>
          <p className="text-stone max-w-xl mx-auto mb-8 leading-relaxed">
            Book a private olive oil tasting, cooking class, or Italian dinner
            for your group. Corporate events, birthdays, date nights — we bring
            Sicily to you.
          </p>
          <Button variant="secondary">Inquire About Private Events</Button>
        </div>
      </section>
    </div>
  );
}
