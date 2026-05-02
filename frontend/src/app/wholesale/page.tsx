"use client";

import { useState } from "react";
import { Building2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BUSINESS_TYPES = [
  { label: "Restaurant / Trattoria", value: "restaurant" },
  { label: "Retail / Specialty Shop", value: "retailer" },
  { label: "Distributor", value: "distributor" },
  { label: "Other", value: "other" },
];

export default function WholesalePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    business_type: "",
    message: "",
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (submitted) {
    return (
      <div className="pt-20 pb-section">
        <div className="container-narrow text-center py-section">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="font-serif text-heading text-olive-900 mb-4">
            Inquiry Received
          </h1>
          <p className="text-stone max-w-md mx-auto leading-relaxed">
            Thank you for your interest in Mazzone Olive Oil. Our wholesale team
            will review your inquiry and get back to you within 2 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-section">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 olive-gradient" />
        <div className="relative z-10 container-narrow py-section-sm text-center">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
            Wholesale Partners
          </p>
          <h1 className="font-serif text-display text-white mb-6">
            Bring Mazzone to Your Table
          </h1>
          <p className="text-xl text-olive-200 max-w-2xl mx-auto leading-relaxed">
            Partner with us to offer authentic Sicilian olive oil to your customers.
            Competitive pricing, reliable supply, and the story that sells itself.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-narrow max-w-2xl">
          <div className="bg-white rounded-sm border border-olive-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building2 size={20} className="text-olive-600" />
              <h2 className="font-serif text-heading-sm text-olive-900">
                Wholesale Inquiry
              </h2>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-olive-800 mb-1.5">Company Name *</label>
                  <input type="text" required value={form.company_name} onChange={(e) => update("company_name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive-800 mb-1.5">Contact Name *</label>
                  <input type="text" required value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-olive-800 mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
                    className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-olive-800 mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-olive-800 mb-1.5">Business Type *</label>
                <select required value={form.business_type} onChange={(e) => update("business_type", e.target.value)}
                  className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500">
                  <option value="">Select type...</option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-olive-800 mb-1.5">Message</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)}
                  rows={4} placeholder="Tell us about your business and what you're looking for..."
                  className="w-full px-4 py-2.5 border border-olive-200 rounded-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500" />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
