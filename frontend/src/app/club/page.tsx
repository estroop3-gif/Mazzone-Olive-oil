"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, TreePine, Gift, Star, X } from "lucide-react";

const PLANS = [
  {
    name: "Singolo",
    subtitle: "1 bottle / month",
    price: 35,
    features: [
      "Hand-selected seasonal oil",
      "Tasting notes card",
      "Recipe pairing guide",
      "Free shipping",
    ],
    popular: false,
  },
  {
    name: "Duo",
    subtitle: "2 bottles / month",
    price: 62,
    features: [
      "Two complementary oils",
      "Tasting notes card",
      "Recipe pairing guide",
      "Free shipping",
      "10% shop discount",
      "Early access to Olio Nuovo",
    ],
    popular: true,
  },
  {
    name: "Collezione",
    subtitle: "4 bottles / quarter",
    price: 89,
    features: [
      "Curated seasonal collection",
      "Tasting notes card",
      "Recipe pairing guide",
      "Free shipping",
      "15% shop discount",
      "Early access + exclusives",
      "Annual harvest dinner invite",
    ],
    popular: false,
  },
];

export default function ClubPage() {
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftSubmitted, setGiftSubmitted] = useState(false);

  return (
    <div className="pt-20">
      {/* Gift Modal */}
      {giftOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setGiftOpen(false)} />
          <div className="relative bg-white rounded-sm shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-olive-100">
              <h2 className="font-serif text-lg text-olive-900">Gift Il Club</h2>
              <button onClick={() => setGiftOpen(false)} className="text-stone hover:text-olive-900"><X size={18} /></button>
            </div>
            <div className="p-6">
              {giftSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={20} className="text-green-600" />
                  </div>
                  <p className="font-serif text-lg text-olive-900 mb-2">Gift Sent!</p>
                  <p className="text-sm text-stone">Your recipient will receive a beautiful email with their gift code.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setGiftSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-olive-800 mb-1">Your Name</label>
                    <input type="text" required className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-olive-800 mb-1">Recipient Name</label>
                    <input type="text" required className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-olive-800 mb-1">Recipient Email</label>
                    <input type="email" required className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-olive-800 mb-1">Plan</label>
                    <select required className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm">
                      <option value="">Select plan...</option>
                      <option value="singolo">Singolo — $35/mo</option>
                      <option value="duo">Duo — $62/mo</option>
                      <option value="collezione">Collezione — $89/quarter</option>
                    </select>
                  </div>
                  <Button type="submit" variant="primary" className="w-full">
                    Send Gift
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 olive-gradient" />
        <div className="relative z-10 container-narrow py-section text-center">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
            Il Club Mazzone
          </p>
          <h1 className="font-serif text-display text-white mb-6 text-balance">
            La dolce vita, delivered monthly
          </h1>
          <p className="text-xl text-olive-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Join our olive oil club and receive hand-selected bottles from each
            harvest. Includes tasting notes, pairing suggestions, and recipes
            from Nonna&apos;s kitchen.
          </p>
          <button
            onClick={() => { setGiftOpen(true); setGiftSubmitted(false); }}
            className="inline-flex items-center gap-2 bg-gold-500 text-olive-950 px-6 py-3 rounded-sm font-medium hover:bg-gold-400 transition-colors"
          >
            <Gift size={18} />
            Gift Il Club
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-warm-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-sm p-8 ${
                  plan.popular
                    ? "bg-olive-900 text-white ring-2 ring-gold-500"
                    : "bg-white border border-olive-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-500 text-olive-950 text-xs uppercase tracking-wider px-4 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl mb-1">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? "text-olive-300" : "text-stone"}`}>
                    {plan.subtitle}
                  </p>
                  <p className="mt-4">
                    <span className={`text-4xl font-serif ${plan.popular ? "text-gold-400" : "text-olive-900"}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-olive-400" : "text-stone"}`}>
                      /month
                    </span>
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        size={16}
                        className={`shrink-0 mt-0.5 ${plan.popular ? "text-gold-400" : "text-olive-600"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gold-500 text-olive-950 hover:bg-gold-400"
                      : ""
                  }`}
                  variant={plan.popular ? "primary" : "secondary"}
                >
                  Join {plan.name}
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-stone">
            Free shipping &middot; Cancel anytime &middot; Exclusive member pricing
          </p>
        </div>
      </section>

      {/* Olive Tree Adoption */}
      <section className="section-padding bg-cream">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TreePine size={20} className="text-gold-500" />
              <p className="text-gold-500 uppercase tracking-[0.2em] text-sm">
                Adotta un Albero
              </p>
            </div>
            <h2 className="font-serif text-heading-lg text-olive-900 mb-6">
              Adopt an Olive Tree
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                Adopt one of our Nocellara olive trees in Sicily. You&apos;ll
                receive a certificate with your tree&apos;s name, GPS
                coordinates, and a photo. Each year at harvest, we&apos;ll
                send you bottles pressed from your tree&apos;s olives.
              </p>
              <p>
                It&apos;s the most personal way to connect with the grove and
                support sustainable farming in Sicily.
              </p>
            </div>
            <div className="mt-8">
              <Button className="bg-gold-500 text-olive-950 hover:bg-gold-400">
                Adopt a Tree — $150/year
              </Button>
            </div>
          </div>
          <div className="aspect-square bg-olive-100 rounded-sm overflow-hidden">
            <img
              src="/images/story/olive-tree.jpeg"
              alt="Olive tree in the Mazzone grove"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Monthly Pairings */}
      <section className="section-padding bg-warm-white">
        <div className="container-narrow text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift size={20} className="text-gold-500" />
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm">
              L&apos;Abbinamento del Mese
            </p>
          </div>
          <h2 className="font-serif text-heading-lg text-olive-900 mb-4">
            Monthly Pairings
          </h2>
          <p className="text-stone max-w-xl mx-auto mb-10 leading-relaxed">
            Each month, club members receive a curated pairing — an oil matched
            with a complementary vinegar, pantry item, or recipe kit. Everything
            you need for one unforgettable meal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-olive-50 rounded-sm p-6">
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-2">June</p>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                Summer Caprese
              </h3>
              <p className="text-sm text-stone">
                Nocellara EVOO + White Balsamic + Trapani Sea Salt
              </p>
            </div>
            <div className="bg-olive-50 rounded-sm p-6">
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-2">July</p>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                Grilled Peach & Burrata
              </h3>
              <p className="text-sm text-stone">
                Olio al Limone + Fig Balsamic Reduction
              </p>
            </div>
            <div className="bg-olive-50 rounded-sm p-6">
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-2">August</p>
              <h3 className="font-serif text-lg text-olive-900 mb-2">
                Pasta alla Norma
              </h3>
              <p className="text-sm text-stone">
                Blend Classico + Sugo alla Norma + Semola Pasta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="section-padding bg-olive-900 text-white">
        <div className="container-narrow text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={20} className="text-gold-400" />
            <p className="text-gold-400 uppercase tracking-[0.2em] text-sm">
              I Vantaggi
            </p>
          </div>
          <h2 className="font-serif text-heading-lg mb-10">
            Member Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            {[
              ["Exclusive Oils", "Access to limited-edition and single-grove bottlings unavailable in the shop."],
              ["Shop Discounts", "10–15% off everything in the market, depending on your plan."],
              ["Early Access", "First to order Olio Nuovo and seasonal releases before they sell out."],
              ["Harvest Dinner", "Collezione members receive an annual invite to our fall harvest dinner."],
              ["Free Shipping", "Every club shipment ships free. Always."],
              ["Flexible Plans", "Pause, skip a month, or cancel anytime. No commitments."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <Check size={18} className="text-gold-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-white mb-1">{title}</h3>
                  <p className="text-sm text-olive-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
