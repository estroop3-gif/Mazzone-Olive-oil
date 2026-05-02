"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { TabNav } from "@/components/admin/ui/TabNav";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { DollarSign, Users, Star, MapPin } from "lucide-react";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Itinerary", value: "itinerary" },
  { label: "Bookings", value: "bookings" },
  { label: "Waitlist", value: "waitlist" },
  { label: "Communications", value: "communications" },
  { label: "Analytics", value: "analytics" },
];

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  activities: string[];
  accommodation: string;
}

const MOCK_ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival in Bari",
    description: "Welcome to Puglia. Transfer from Bari Airport to our masseria in the Itria Valley. Settle in, enjoy a welcome aperitivo on the terrace overlooking ancient olive groves.",
    meals: "Welcome dinner featuring local antipasti, burrata, and grilled octopus",
    activities: ["Airport transfer", "Masseria check-in", "Welcome aperitivo", "Meet the group dinner"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 2,
    title: "Olive Oil & Trulli of Alberobello",
    description: "Morning visit to the Mazzone family olive grove. Learn the cultivation process from tree to bottle, and taste this season's freshest oils. Afternoon stroll through the UNESCO trulli district of Alberobello.",
    meals: "Farm lunch with bruschetta al olio nuovo, orecchiette alle cime di rapa",
    activities: ["Olive grove tour", "Oil pressing demonstration", "EVOO tasting masterclass", "Alberobello walking tour", "Trullo cooking experience"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 3,
    title: "Ostuni & the White City",
    description: "Explore the winding streets of Ostuni, the stunning Citta Bianca perched above endless olive groves. Visit a local cheesemaker for fresh mozzarella and burrata.",
    meals: "Lunch at a family trattoria in Ostuni; dinner at the masseria",
    activities: ["Ostuni old town tour", "Artisan cheese workshop", "Burrata & mozzarella making", "Free time for shopping", "Sunset from Ostuni walls"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 4,
    title: "Lecce & Baroque Splendour",
    description: "Day trip to Lecce, the Florence of the South. Guided tour of Baroque architecture, followed by a pasticciotto pastry workshop with a local baker.",
    meals: "Rustico leccese for breakfast; seafood lunch in Lecce; light dinner",
    activities: ["Lecce Baroque walking tour", "Basilica di Santa Croce", "Roman amphitheatre", "Pasticciotto baking class", "Evening passeggiata"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 5,
    title: "Coastal Puglia & Polignano a Mare",
    description: "Morning at leisure. Afternoon drive along the dramatic coast to Polignano a Mare. Visit the sea caves by boat, then dinner at a cliffside restaurant overlooking the Adriatic.",
    meals: "Brunch at the masseria; cliffside dinner in Polignano",
    activities: ["Free morning by the pool", "Coastal drive", "Polignano a Mare walking tour", "Sea cave boat excursion", "Cliffside dinner"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 6,
    title: "Wine Country & Primitivo",
    description: "Journey into the Primitivo di Manduria wine region. Tour a historic cantina, taste aged wines, and enjoy a long pranzo among the vines.",
    meals: "Vineyard lunch with Primitivo pairings; farewell dinner at the masseria",
    activities: ["Drive to Manduria", "Cantina tour & barrel tasting", "Primitivo wine tasting flight", "Vineyard lunch", "Farewell dinner with live music"],
    accommodation: "Masseria Torre Coccaro, Savelletri di Fasano",
  },
  {
    day: 7,
    title: "Arrivederci Puglia",
    description: "Final breakfast on the terrace. Pick up your curated box of Puglian oils, wines, and preserves to bring home. Transfer to Bari Airport.",
    meals: "Farewell breakfast with fresh frise and local honey",
    activities: ["Packing & curated gift box", "Group photo at the olive grove", "Airport transfer"],
    accommodation: "Departure",
  },
];

interface TourBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  payment_status: string;
  amount: number;
}

const MOCK_BOOKINGS: TourBooking[] = [
  { id: "tb-1", name: "Sofia & Luca Marchetti", email: "sofia.m@gmail.com", phone: "+1 212-555-0147", guests: 2, payment_status: "paid", amount: 3900 },
  { id: "tb-2", name: "James Calloway", email: "jcalloway@me.com", phone: "+1 917-555-0283", guests: 1, payment_status: "paid", amount: 1950 },
  { id: "tb-3", name: "Elena & Marco Rossi", email: "elena.rossi@outlook.com", phone: "+1 646-555-0391", guests: 2, payment_status: "paid", amount: 3900 },
  { id: "tb-4", name: "Catherine Beaumont", email: "cbeaumont@gmail.com", phone: "+1 310-555-0452", guests: 1, payment_status: "paid", amount: 1950 },
  { id: "tb-5", name: "Thomas & Anne Wright", email: "twright@company.com", phone: "+1 773-555-0518", guests: 2, payment_status: "pending", amount: 3900 },
  { id: "tb-6", name: "Lucia Bianchi", email: "lucia.b@yahoo.com", phone: "+39 333-555-6789", guests: 1, payment_status: "paid", amount: 1950 },
  { id: "tb-7", name: "David Park", email: "dpark@email.com", phone: "+1 415-555-0674", guests: 1, payment_status: "paid", amount: 1050 },
];

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  date_joined: string;
}

const MOCK_WAITLIST: WaitlistEntry[] = [
  { id: "wl-1", name: "Roberto Ferrero", email: "r.ferrero@gmail.com", date_joined: "2026-04-18" },
  { id: "wl-2", name: "Yuki Tanaka", email: "yuki.t@proton.me", date_joined: "2026-04-25" },
  { id: "wl-3", name: "Hannah & Oliver Schmidt", email: "hschmidt@web.de", date_joined: "2026-05-01" },
];

interface SentEmail {
  id: string;
  subject: string;
  date: string;
  recipients: number;
}

const MOCK_SENT_EMAILS: SentEmail[] = [
  { id: "em-1", subject: "Your Puglia Homeland Packing Guide & Travel Tips", date: "2026-04-20", recipients: 10 },
  { id: "em-2", subject: "Welcome to Puglia Homeland — Booking Confirmation & Next Steps", date: "2026-03-15", recipients: 10 },
];

export default function TourDetailPage() {
  const [tab, setTab] = useState("overview");
  const [emailBody, setEmailBody] = useState("");

  const [form, setForm] = useState({
    title: "Puglia Homeland",
    start_date: "2026-08-15",
    end_date: "2026-08-22",
    capacity: "12",
    price: "1950",
    description:
      "A seven-day immersion into the heart of Puglia — the land where the Mazzone family has cultivated olive oil for generations. Wander ancient groves, master orecchiette with local nonnas, taste wines from sun-soaked vines, and discover the baroque beauty of Lecce and the trulli of Alberobello. Limited to 12 guests for an intimate, unforgettable experience.",
    status: "upcoming",
  });

  const set = (key: string) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const bookingColumns: Column<TourBooking>[] = [
    { key: "name", label: "Name", render: (b) => <span className="font-medium text-olive-900">{b.name}</span> },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "guests", label: "Guests" },
    { key: "payment_status", label: "Payment", render: (b) => <StatusBadge status={b.payment_status} /> },
    { key: "amount", label: "Amount", render: (b) => `$${b.amount.toLocaleString()}` },
  ];

  const waitlistColumns: Column<WaitlistEntry>[] = [
    { key: "name", label: "Name", render: (w) => <span className="font-medium text-olive-900">{w.name}</span> },
    { key: "email", label: "Email" },
    {
      key: "date_joined",
      label: "Date Joined",
      render: (w) =>
        new Date(w.date_joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
  ];

  const totalGuests = MOCK_BOOKINGS.reduce((sum, b) => sum + b.guests, 0);

  return (
    <div>
      <PageHeader title={form.title} description="Aug 15 – 22, 2026  |  Puglia, Italy" backHref="/admin/tours" />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* Overview */}
      {tab === "overview" && (
        <div className="bg-white rounded-sm border border-olive-100 p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <AdminFormField label="Tour Name" value={form.title} onChange={set("title")} required />
            </div>
            <AdminFormField label="Start Date" type="date" value={form.start_date} onChange={set("start_date")} required />
            <AdminFormField label="End Date" type="date" value={form.end_date} onChange={set("end_date")} required />
            <AdminFormField label="Capacity" type="number" value={form.capacity} onChange={set("capacity")} required />
            <AdminFormField label="Price per Person ($)" type="number" value={form.price} onChange={set("price")} required />
            <div className="md:col-span-2">
              <AdminFormField label="Description" type="textarea" value={form.description} onChange={set("description")} />
            </div>
            <AdminFormField label="Status" type="select" value={form.status} onChange={set("status")} options={STATUS_OPTIONS} />
          </div>
          <div className="mt-6 pt-5 border-t border-olive-100">
            <button
              onClick={() => alert("Demo mode — changes would be saved.")}
              className="bg-olive-800 text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Itinerary */}
      {tab === "itinerary" && (
        <div className="space-y-4">
          {MOCK_ITINERARY.map((day) => (
            <div key={day.day} className="bg-white rounded-sm border border-olive-100 p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-olive-800 text-white rounded-sm flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase leading-none">Day</span>
                  <span className="font-serif text-lg leading-none">{day.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-olive-900">{day.title}</h3>
                  <p className="text-sm text-charcoal mt-1">{day.description}</p>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-medium text-olive-700 uppercase tracking-wider mb-1">Activities</p>
                      <ul className="text-sm text-charcoal space-y-0.5">
                        {day.activities.map((a, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-olive-400 mt-1">&#8226;</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-olive-700 uppercase tracking-wider mb-1">Meals</p>
                        <p className="text-sm text-charcoal">{day.meals}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-olive-700 uppercase tracking-wider mb-1">Accommodation</p>
                        <p className="text-sm text-charcoal flex items-center gap-1">
                          <MapPin size={12} className="text-olive-400" />
                          {day.accommodation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => alert("Demo mode — would add a new day.")}
            className="w-full border-2 border-dashed border-olive-200 rounded-sm py-4 text-sm text-olive-600 hover:border-olive-400 hover:text-olive-800 transition-colors"
          >
            + Add Day
          </button>
        </div>
      )}

      {/* Bookings */}
      {tab === "bookings" && (
        <div>
          <p className="text-sm text-stone mb-4">
            {MOCK_BOOKINGS.length} bookings &middot; {totalGuests} total guests &middot; {form.capacity} capacity
          </p>
          <AdminTable columns={bookingColumns} data={MOCK_BOOKINGS} emptyMessage="No bookings yet" />
        </div>
      )}

      {/* Waitlist */}
      {tab === "waitlist" && (
        <div>
          <p className="text-sm text-stone mb-4">{MOCK_WAITLIST.length} people on the waitlist</p>
          <AdminTable columns={waitlistColumns} data={MOCK_WAITLIST} emptyMessage="No one on the waitlist" />
        </div>
      )}

      {/* Communications */}
      {tab === "communications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Compose Email to All Guests</h3>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Write your message to all booked guests..."
              className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent min-h-[140px] resize-y"
            />
            <button
              onClick={() => alert("Demo mode — email would be sent to all guests.")}
              className="mt-3 bg-olive-800 text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
            >
              Send to All Guests
            </button>
          </div>

          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Sent Emails</h3>
            <div className="space-y-3">
              {MOCK_SENT_EMAILS.map((em) => (
                <div key={em.id} className="flex items-start justify-between py-3 border-b border-olive-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-olive-900">{em.subject}</p>
                    <p className="text-xs text-stone mt-0.5">Sent to {em.recipients} guests</p>
                  </div>
                  <span className="text-xs text-stone shrink-0 ml-4">
                    {new Date(em.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {tab === "analytics" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AdminCard icon={DollarSign} value="$18,600" label="Revenue" trend={{ value: "+$3,900 pending", up: true }} />
            <AdminCard icon={Users} value="87%" label="Capacity Filled" trend={{ value: "10 of 12 spots", up: true }} />
            <AdminCard icon={Star} value="4.9" label="Avg Rating (prev tours)" trend={{ value: "23 reviews", up: true }} />
          </div>
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Booking Timeline</h3>
            <div className="space-y-2 text-sm text-charcoal">
              <p>First booking received on March 2, 2026 — 5 months before departure.</p>
              <p>Peak booking period: March 10 – April 5 (6 bookings in 4 weeks).</p>
              <p>Most recent booking: April 28, 2026 (David Park, 1 guest).</p>
              <p>3 people are on the waitlist. 2 remaining spots likely to fill by June.</p>
              <p>Average time from inquiry to booking: 4.2 days.</p>
              <p>Repeat guests: 3 of 7 bookings are returning from previous Mazzone tours.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
