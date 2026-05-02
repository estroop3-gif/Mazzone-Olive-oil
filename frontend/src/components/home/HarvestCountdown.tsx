"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function HarvestCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const harvest = new Date(now.getFullYear(), 9, 15); // October 15
      if (now > harvest) harvest.setFullYear(harvest.getFullYear() + 1);
      const diff = harvest.getTime() - now.getTime();
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-olive-900">
      <div className="container-narrow text-center">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-3">
          La Raccolta
        </p>
        <h2 className="font-serif text-heading-lg text-white mb-8">
          Harvest Countdown
        </h2>

        <div className="flex justify-center gap-6 md:gap-10 mb-8">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-serif text-display-xl text-gold-400 leading-none">
                {item.value}
              </p>
              <p className="text-olive-300 text-sm mt-2 uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-olive-200 max-w-lg mx-auto mb-6 leading-relaxed">
          Our Nocellara olives are ripening under the Sicilian sun. Be the first
          to taste the new harvest — pre-order your Olio Nuovo today.
        </p>

        <Link
          href="/shop"
          className="inline-block bg-gold-500 text-olive-950 px-8 py-3 rounded-sm font-medium hover:bg-gold-400 transition-colors"
        >
          Pre-order Olio Nuovo
        </Link>
      </div>
    </section>
  );
}
