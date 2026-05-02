"use client";

import { useState } from "react";
import { MOCK_EVENT_REGISTRATIONS, MOCK_BROWSE_EVENTS } from "@/data/account-mock";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { TabNav } from "@/components/admin/ui/TabNav";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const TABS = [
  { label: "My Registrations", value: "registrations" },
  { label: "Browse Events", value: "browse" },
];

export default function EventsPage() {
  const [tab, setTab] = useState("registrations");
  const [notifyEvents, setNotifyEvents] = useState(true);

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-2xl text-olive-900 mb-6">Events & Tours</h1>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === "registrations" && (
        <div className="space-y-4">
          {MOCK_EVENT_REGISTRATIONS.map((reg) => (
            <div key={reg.id} className="bg-white rounded-sm border border-olive-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="font-medium text-olive-900">{reg.event_title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-stone">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(reg.event_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(reg.event_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </span>
                    {reg.event_location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {reg.event_location}
                      </span>
                    )}
                  </div>
                </div>
                <StatusBadge status={reg.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "browse" && (
        <div className="space-y-4">
          {MOCK_BROWSE_EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-sm border border-olive-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="font-medium text-olive-900">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-stone">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {event.spots_left} spots left
                    </span>
                  </div>
                  <p className="text-sm text-olive-700 font-medium mt-2">
                    ${(event.price_cents / 100).toFixed(2)}
                  </p>
                </div>
                <button className="px-4 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors shrink-0">
                  Register
                </button>
              </div>
            </div>
          ))}

          {/* Tours Section */}
          <div className="bg-cream rounded-sm border border-olive-100 p-6 mt-6">
            <h3 className="font-serif text-lg text-olive-900 mb-2">Sicily Harvest Tours</h3>
            <p className="text-sm text-stone mb-4">
              Visit our family groves in Castelvetrano. Walk the orchards, taste fresh-pressed oil, and experience the harvest firsthand.
            </p>
            <button className="px-4 py-2 border border-olive-300 rounded-sm text-sm text-olive-700 hover:bg-olive-50 transition-colors">
              Inquire About Tours
            </button>
          </div>
        </div>
      )}

      {/* Notification Toggle */}
      <div className="mt-8 bg-white rounded-sm border border-olive-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-olive-900">Event Notifications</p>
            <p className="text-xs text-stone mt-0.5">Get reminders before your registered events</p>
          </div>
          <button
            onClick={() => setNotifyEvents(!notifyEvents)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              notifyEvents ? "bg-olive-700" : "bg-olive-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                notifyEvents ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
