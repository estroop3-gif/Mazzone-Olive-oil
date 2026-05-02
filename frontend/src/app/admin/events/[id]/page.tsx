"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { TabNav } from "@/components/admin/ui/TabNav";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Users, DollarSign, BarChart3 } from "lucide-react";

const EVENT_TYPE_OPTIONS = [
  { label: "Wine Tasting", value: "wine_tasting" },
  { label: "Cooking Class", value: "cooking_class" },
  { label: "Language Class", value: "language_class" },
  { label: "Workshop", value: "workshop" },
  { label: "Dinner", value: "dinner" },
  { label: "Market", value: "market" },
  { label: "Series", value: "series" },
  { label: "Private Tasting", value: "private" },
];

const TABS = [
  { label: "Details", value: "details" },
  { label: "Bookings", value: "bookings" },
  { label: "Analytics", value: "analytics" },
];

interface Booking {
  id: string;
  name: string;
  email: string;
  guests: number;
  status: string;
  payment: string;
}

const MOCK_BOOKINGS: Booking[] = [
  { id: "bk-1", name: "Sofia Marchetti", email: "sofia.m@gmail.com", guests: 2, status: "confirmed", payment: "paid" },
  { id: "bk-2", name: "James Calloway", email: "jcalloway@me.com", guests: 1, status: "confirmed", payment: "paid" },
  { id: "bk-3", name: "Elena Rossi", email: "elena.rossi@outlook.com", guests: 2, status: "confirmed", payment: "paid" },
  { id: "bk-4", name: "Marcus Chen", email: "mchen@proton.me", guests: 2, status: "confirmed", payment: "paid" },
  { id: "bk-5", name: "Isabella Fontana", email: "isabella.f@gmail.com", guests: 1, status: "pending", payment: "pending" },
  { id: "bk-6", name: "Thomas Wright", email: "twright@company.com", guests: 2, status: "confirmed", payment: "paid" },
  { id: "bk-7", name: "Lucia Bianchi", email: "lucia.b@yahoo.com", guests: 1, status: "confirmed", payment: "paid" },
  { id: "bk-8", name: "David Park", email: "dpark@email.com", guests: 1, status: "confirmed", payment: "paid" },
];

export default function EventDetailPage() {
  const [tab, setTab] = useState("details");
  const [showAddBooking, setShowAddBooking] = useState(false);

  const [form, setForm] = useState({
    title: "Summer Pasta Class",
    type: "cooking_class",
    date: "2026-06-14",
    time: "11:00",
    location: "Mazzone Kitchen Studio, Brooklyn",
    capacity: "16",
    price: "120",
    description:
      "Learn to make fresh pasta from scratch with Chef Marco Mazzone. This hands-on class covers three classic shapes — orecchiette, cavatelli, and tagliatelle — paired with seasonal sauces using our Nocellara EVOO. Includes a sit-down lunch with wine pairings and a bottle of olive oil to take home.",
    image_url: "https://images.unsplash.com/photo-1556761223-4c4282c73f77",
  });

  const [newBooking, setNewBooking] = useState({ name: "", email: "", guests: "1" });

  const set = (key: string) => (value: string) => setForm((f) => ({ ...f, [key]: value }));
  const setBookingField = (key: string) => (value: string) => setNewBooking((f) => ({ ...f, [key]: value }));

  const bookingColumns: Column<Booking>[] = [
    { key: "name", label: "Name", render: (b) => <span className="font-medium text-olive-900">{b.name}</span> },
    { key: "email", label: "Email" },
    { key: "guests", label: "Guests" },
    { key: "status", label: "Status", render: (b) => <StatusBadge status={b.status} /> },
    { key: "payment", label: "Payment", render: (b) => <StatusBadge status={b.payment} /> },
  ];

  const totalGuests = MOCK_BOOKINGS.reduce((sum, b) => sum + b.guests, 0);
  const paidCount = MOCK_BOOKINGS.filter((b) => b.payment === "paid").length;
  const revenue = paidCount * 120;

  return (
    <div>
      <PageHeader title={form.title} description="Cooking Class — June 14, 2026" backHref="/admin/events" />
      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* Details Tab */}
      {tab === "details" && (
        <div className="bg-white rounded-sm border border-olive-100 p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <AdminFormField label="Title" value={form.title} onChange={set("title")} required />
            </div>
            <AdminFormField label="Type" type="select" value={form.type} onChange={set("type")} options={EVENT_TYPE_OPTIONS} required />
            <AdminFormField label="Location" value={form.location} onChange={set("location")} required />
            <AdminFormField label="Date" type="date" value={form.date} onChange={set("date")} required />
            <AdminFormField label="Time" type="text" value={form.time} onChange={set("time")} placeholder="e.g. 11:00 AM" />
            <AdminFormField label="Capacity" type="number" value={form.capacity} onChange={set("capacity")} />
            <AdminFormField label="Price ($)" type="number" value={form.price} onChange={set("price")} />
            <div className="md:col-span-2">
              <AdminFormField label="Description" type="textarea" value={form.description} onChange={set("description")} />
            </div>
            <div className="md:col-span-2">
              <AdminFormField label="Image URL" type="url" value={form.image_url} onChange={set("image_url")} />
            </div>
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

      {/* Bookings Tab */}
      {tab === "bookings" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-stone">
              {MOCK_BOOKINGS.length} bookings &middot; {totalGuests} total guests &middot; {form.capacity} capacity
            </p>
            <button
              onClick={() => setShowAddBooking(true)}
              className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
            >
              Add Booking
            </button>
          </div>
          <AdminTable columns={bookingColumns} data={MOCK_BOOKINGS} emptyMessage="No bookings yet" />

          <AdminModal open={showAddBooking} onClose={() => setShowAddBooking(false)} title="Add Booking">
            <div className="space-y-4">
              <AdminFormField label="Name" value={newBooking.name} onChange={setBookingField("name")} required />
              <AdminFormField label="Email" type="email" value={newBooking.email} onChange={setBookingField("email")} required />
              <AdminFormField label="Guests" type="number" value={newBooking.guests} onChange={setBookingField("guests")} />
              <div className="flex gap-3 pt-4 border-t border-olive-100">
                <button
                  onClick={() => {
                    alert("Demo mode — booking would be added.");
                    setShowAddBooking(false);
                  }}
                  className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
                >
                  Add Booking
                </button>
                <button
                  onClick={() => setShowAddBooking(false)}
                  className="px-4 py-2 rounded-sm text-sm text-stone hover:text-olive-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </AdminModal>
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "analytics" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AdminCard icon={Users} value={`${Math.round((totalGuests / parseInt(form.capacity)) * 100)}%`} label="Attendance Rate" trend={{ value: "87.5%", up: true }} />
            <AdminCard icon={DollarSign} value={`$${revenue.toLocaleString()}`} label="Revenue" trend={{ value: `${paidCount} paid`, up: true }} />
            <AdminCard icon={BarChart3} value={MOCK_BOOKINGS.length} label="Total Bookings" />
          </div>
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <h3 className="font-serif text-lg text-olive-900 mb-3">Summary</h3>
            <div className="space-y-2 text-sm text-charcoal">
              <p>{totalGuests} of {form.capacity} spots filled ({Math.round((totalGuests / parseInt(form.capacity)) * 100)}% capacity).</p>
              <p>{paidCount} of {MOCK_BOOKINGS.length} bookings are fully paid. 1 payment pending.</p>
              <p>Average party size: {(totalGuests / MOCK_BOOKINGS.length).toFixed(1)} guests per booking.</p>
              <p>This event is on track to sell out. Consider opening a waitlist or adding a second session.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
