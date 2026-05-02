"use client";

import { useState } from "react";
import { MOCK_SUBSCRIPTION, MOCK_OIL_OPTIONS } from "@/data/account-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Wine, Pause, RefreshCw, Check } from "lucide-react";

export default function SubscriptionsPage() {
  const [preferences, setPreferences] = useState<string[]>(MOCK_SUBSCRIPTION.oil_preferences);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Subscription</h1>

      {/* Current Plan */}
      <div className="bg-white rounded-sm border border-olive-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wine size={20} className="text-gold-600" />
              <h2 className="font-serif text-xl text-olive-900">Il Club Duo</h2>
              <StatusBadge status={MOCK_SUBSCRIPTION.status} />
            </div>
            <p className="text-stone text-sm mb-1">
              2 bottles per month · ${(MOCK_SUBSCRIPTION.price_cents / 100).toFixed(2)}/month
            </p>
            <p className="text-sm text-olive-600">
              Next shipment: <span className="font-medium">{new Date(MOCK_SUBSCRIPTION.next_shipment_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </p>
            <p className="text-xs text-stone mt-1">
              Member since {new Date(MOCK_SUBSCRIPTION.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-olive-200 rounded-sm text-sm text-olive-700 hover:bg-olive-50 transition-colors">
              <Pause size={14} /> Pause
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors">
              <RefreshCw size={14} /> Change Plan
            </button>
          </div>
        </div>
      </div>

      {/* Oil Preferences */}
      <div className="bg-white rounded-sm border border-olive-100 p-6 mb-6">
        <h2 className="font-medium text-olive-900 mb-1">Oil Preferences</h2>
        <p className="text-xs text-stone mb-4">Select oils you love. We&apos;ll prioritize these in your shipments.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_OIL_OPTIONS.map((oil) => {
            const selected = preferences.includes(oil.id);
            return (
              <button
                key={oil.id}
                onClick={() => togglePreference(oil.id)}
                className={`text-left p-4 rounded-sm border-2 transition-colors ${
                  selected
                    ? "border-gold-500 bg-gold-50"
                    : "border-olive-100 hover:border-olive-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-olive-900">{oil.name}</p>
                    <p className="text-xs text-stone mt-0.5">{oil.description}</p>
                  </div>
                  {selected && (
                    <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center shrink-0 ml-2">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Shipment History */}
      <div className="bg-white rounded-sm border border-olive-100 p-6">
        <h2 className="font-medium text-olive-900 mb-4">Shipment History</h2>
        <div className="space-y-3">
          {MOCK_SUBSCRIPTION.shipment_history.map((shipment) => (
            <div key={shipment.id} className="flex items-center justify-between py-3 border-b border-olive-50 last:border-0">
              <div>
                <p className="text-sm text-charcoal font-medium">
                  {new Date(shipment.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-xs text-stone mt-0.5">{shipment.items.join(" · ")}</p>
              </div>
              <StatusBadge status={shipment.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
