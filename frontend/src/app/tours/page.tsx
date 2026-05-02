"use client";

import { Button } from "@/components/ui/Button";
import { Calendar, Users, Clock, MapPin, Star, Check, Plane, Sun, UtensilsCrossed, Wine, Camera } from "lucide-react";

const TOURS = [
  {
    id: "puglia",
    tag: "Signature Tour",
    title: "Puglia: The Mazzone Homeland",
    subtitle: "La Puglia",
    duration: "7 days / 6 nights",
    groupSize: "8–12 guests",
    season: "Olive Harvest · Grape Harvest · Summer",
    price: 4200,
    image: "/images/tours/puglia-grove.jpg",
    description:
      "Become part of the Mazzone family tree on an exclusive tour of Puglia, Italy. Spend a week in Cinzia's hometown of Ruvo di Puglia, positioned near the Adriatic coastline. Meet Giuseppe, our olive oil expert, and Francesco, our winemaker — along with other friends and family in the area. Experience multiple UNESCO World Heritage sites while enjoying local cuisine and culture as a local.",
    highlights: [
      "Stay in Cinzia's hometown of Ruvo di Puglia",
      "Meet Giuseppe (olive oil) and Francesco (winemaker)",
      "Visit UNESCO World Heritage sites",
      "Olive harvest or grape harvest experience (seasonal)",
      "Summer sailing along the Adriatic coast",
      "Local cuisine and culture immersion as family",
    ],
  },
  {
    id: "piemonte",
    tag: null,
    title: "Piemonte: Wine Country & White Truffles",
    subtitle: "Il Piemonte",
    duration: "7 days / 6 nights",
    groupSize: "8–12 guests",
    season: "Fall (Truffle Season) · Spring · Summer",
    price: 4800,
    image: "/images/tours/wines.jpg",
    description:
      "The northern province of Piemonte offers magical rolling hills dancing with vineyards and elusive white truffles. Spend a week in Barolo wine country with winery tours, truffle hunting with guide dogs, and tasting your finds. Visit royal palaces, famous markets, and panoramic views including the Italian Alps — a very special week to remember.",
    highlights: [
      "A week in Barolo wine country",
      "Truffle hunting with expert guides and their dogs",
      "Winery tours and tastings across Piemonte",
      "Visit royal palaces and famous local markets",
      "Panoramic views of the Italian Alps",
      "Taste your truffle finds prepared by local chefs",
    ],
  },
  {
    id: "culinary",
    tag: "Coming Soon",
    title: "Sicilian Culinary Journey",
    subtitle: "Viaggio Culinario",
    duration: "5 days / 4 nights",
    groupSize: "6–10 guests",
    season: "May – September",
    price: 3400,
    image: "/images/tours/pasta-making.jpg",
    description:
      "A five-day deep dive into Sicilian cuisine. From street food markets to multi-course dinners in the countryside, every meal tells a story. Learn to make pasta, arancini, and cannoli with local nonnas — and bring their recipes home.",
    highlights: [
      "Daily hands-on cooking classes with local chefs",
      "Street food walking tours through historic markets",
      "Fish market visit and seafood preparation",
      "Wine and olive oil pairing masterclass",
      "Visit to a historic Marsala winery",
      "Farewell dinner at the Mazzone family table",
    ],
  },
  {
    id: "cultural",
    tag: "Coming Soon",
    title: "Sicily Unveiled",
    subtitle: "Sicilia Svelata",
    duration: "6 days / 5 nights",
    groupSize: "8–12 guests",
    season: "March – November",
    price: 3800,
    image: "/images/tours/vista-sul-mare.jpg",
    description:
      "Sicily isn't just food — it's layers of civilizations. Greek temples, Norman cathedrals, Arab markets, Baroque piazzas. This tour weaves the island's 3,000-year history with its living food culture, ending each day at a table that brings it all together.",
    highlights: [
      "Valley of the Temples in Agrigento (UNESCO)",
      "Baroque towns of the Val di Noto",
      "Historic markets and local artisan workshops",
      "Ceramic traditions of Caltagirone",
      "Private tour of a working olive grove",
      "Farm-to-table meals at family agriturismi",
    ],
  },
];

const INCLUDES = [
  { icon: Plane, label: "Airport transfers" },
  { icon: Sun, label: "All accommodations" },
  { icon: UtensilsCrossed, label: "Most meals included" },
  { icon: Wine, label: "All tastings & classes" },
  { icon: Users, label: "Local expert guides" },
  { icon: Camera, label: "Professional group photo" },
];

const TESTIMONIALS = [
  {
    quote: "Truly the trip of a lifetime. I wasn't Italian when I went, but I am now!",
    name: "Tour Guest",
    location: "Puglia Tour",
    tour: "",
  },
  {
    quote: "The harvest experience changed how I think about food. Watching oil pressed from olives we picked that morning — nothing compares.",
    name: "Sarah & David M.",
    location: "Brooklyn, NY",
    tour: "Puglia Harvest",
  },
  {
    quote: "Small group, incredible food, and the Mazzone family treats you like cousins. Already booked again for next year.",
    name: "James K.",
    location: "Chicago, IL",
    tour: "Piemonte Tour",
  },
];

export default function ToursPage() {
  return (
    <div>
      {/* Hero — full bleed with their actual coast photo */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/tours/vista-coast.jpg"
            alt="Vista sul mare — Italian coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-olive-950/70 via-olive-950/50 to-olive-950/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">
            Viaggi in Italia
          </p>
          <h1 className="font-serif text-display-xl text-white mb-6 animate-slide-up text-balance">
            Italian Tours
          </h1>
          <p className="text-xl text-olive-100 max-w-2xl mx-auto mb-4 animate-slide-up animate-delay-100 leading-relaxed">
            Travel to Italy with the Mazzone family. Become part of the family
            tree — walk our groves, cook with our people, and experience Italy
            the way locals do.
          </p>
          <p className="font-serif text-lg text-gold-300 italic mb-10 animate-slide-up animate-delay-200">
            &ldquo;Truly the trip of a lifetime. I wasn&apos;t Italian when I went, but I am now!&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
            <Button size="lg" className="bg-gold-500 text-olive-950 hover:bg-gold-400">
              View Tours
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              Request Custom Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-olive-900 py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["4", "Tour Experiences"],
              ["2", "Regions of Italy"],
              ["7+", "Years of Tours"],
              ["100%", "Would Return"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl text-gold-400">{stat}</p>
                <p className="text-sm text-olive-300 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Cards */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
              I Nostri Viaggi
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900">
              Our Italian Tours
            </h2>
            <p className="text-stone mt-4 max-w-xl mx-auto">
              Small-group, family-led experiences across Italy.
              Every tour is personal, intimate, and led by the Mazzone family
              and their trusted local friends.
            </p>
          </div>

          <div className="space-y-20">
            {TOURS.map((tour, i) => (
              <div
                key={tour.id}
                id={tour.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div className={`${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    {tour.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold-500 text-olive-950 text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-medium">
                          {tour.tag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-2">
                    {tour.subtitle}
                  </p>
                  <h3 className="font-serif text-heading text-olive-900 mb-4">
                    {tour.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-olive-600">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} /> {tour.groupSize}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {tour.season}
                    </span>
                  </div>

                  <p className="text-stone leading-relaxed mb-6">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h4 className="text-sm uppercase tracking-wider text-olive-700 mb-3">
                      Tour Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tour.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-stone">
                          <Check size={14} className="text-gold-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-6">
                    {tour.price && (
                      <div>
                        <span className="text-3xl font-serif text-olive-900">
                          ${tour.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-stone ml-1">/ person</span>
                      </div>
                    )}
                    <Button className="bg-gold-500 text-olive-950 hover:bg-gold-400">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-cream">
        <div className="container-narrow text-center">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
            Cosa è Incluso
          </p>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-12">
            Every Tour Includes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {INCLUDES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-olive-100 flex items-center justify-center">
                  <Icon size={22} className="text-olive-700" />
                </div>
                <p className="text-sm text-olive-800 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid — all real Mazzone photos */}
      <section className="bg-warm-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { src: "/images/tours/olive-harvest.jpg", alt: "Olive harvest" },
            { src: "/images/tours/wine-wall.jpg", alt: "Wine wall" },
            { src: "/images/tours/sip-group.jpg", alt: "Tasting group event" },
            { src: "/images/tours/lemons.jpg", alt: "Sicilian lemons" },
          ].map((img) => (
            <div key={img.src} className="aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-olive-900 text-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-gold-400 uppercase tracking-[0.2em] text-sm mb-3">
              Dai Nostri Ospiti
            </p>
            <h2 className="font-serif text-heading-lg">
              What Our Guests Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-olive-100 leading-relaxed mb-6 italic font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-olive-400 text-xs">{t.location}</p>
                  {t.tour && (
                    <p className="text-gold-500 text-xs mt-1">{t.tour}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-3">
              Domande Frequenti
            </p>
            <h2 className="font-serif text-heading-lg text-olive-900">
              Common Questions
            </h2>
          </div>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              [
                "What tour options are available?",
                "We currently offer tours in Puglia (olive harvest, grape harvest, and summer sailing) and Piemonte (wine country and truffle hunting). Additional tours in Sicily are coming soon.",
              ],
              [
                "Do I need to speak Italian?",
                "Not at all. All tours are conducted in English. You'll pick up plenty of Italian along the way — especially the food words.",
              ],
              [
                "What's the fitness level required?",
                "Moderate. Tours involve walking on uneven terrain (groves, cobblestone streets) and some stairs. We'll always accommodate individual needs.",
              ],
              [
                "Can I bring my family / children?",
                "Absolutely. Our tours are family-friendly experiences. We've hosted guests of all ages.",
              ],
              [
                "What about dietary restrictions?",
                "Italy is incredibly accommodating — gluten-free, vegetarian, and pescatarian options are naturally abundant. Let us know in advance and we'll handle the rest.",
              ],
              [
                "How do I book?",
                "Click 'Book Now' on any tour to reserve your spot with a $500 deposit. For custom tours or private groups, use the 'Request Custom Tour' button and we'll design a trip just for you.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="border-b border-olive-100 pb-6">
                <h3 className="font-serif text-lg text-olive-900 mb-2">{q}</h3>
                <p className="text-sm text-stone leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/tours/grove-tree.jpg"
            alt="Mazzone olive grove"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-olive-950/75" />
        </div>
        <div className="relative z-10 container-narrow py-section text-center">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
            Ci Vediamo in Italia
          </p>
          <h2 className="font-serif text-display text-white mb-6 text-balance">
            Ready to become part of the family?
          </h2>
          <p className="text-xl text-olive-200 max-w-xl mx-auto mb-10 leading-relaxed">
            Tours are intimate by design — small groups, real connections,
            and experiences you can&apos;t get any other way. Email us to start planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 text-olive-950 hover:bg-gold-400">
              Book a Tour
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              Request Custom Tour
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
