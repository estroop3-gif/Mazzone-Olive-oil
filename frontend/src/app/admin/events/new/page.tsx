"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

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

export default function NewEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    image_url: "",
  });

  const set = (key: string) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  function handleSave() {
    alert("Demo mode — event would be created.");
    router.push("/admin/events");
  }

  return (
    <div>
      <PageHeader title="Create Event" description="Add a new event, class, or experience" backHref="/admin/events" />

      <div className="bg-white rounded-sm border border-olive-100 p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <AdminFormField label="Title" value={form.title} onChange={set("title")} placeholder="e.g. Sicilian Wine & Oil Pairing" required />
          </div>
          <AdminFormField label="Type" type="select" value={form.type} onChange={set("type")} options={EVENT_TYPE_OPTIONS} required />
          <AdminFormField label="Location" value={form.location} onChange={set("location")} placeholder="e.g. Mazzone Tasting Room, Brooklyn" required />
          <AdminFormField label="Date" type="date" value={form.date} onChange={set("date")} required />
          <AdminFormField label="Time" type="text" value={form.time} onChange={set("time")} placeholder="e.g. 6:00 PM" />
          <AdminFormField label="Capacity" type="number" value={form.capacity} onChange={set("capacity")} placeholder="0 for unlimited" />
          <AdminFormField label="Price ($)" type="number" value={form.price} onChange={set("price")} placeholder="0 for free" />
          <div className="md:col-span-2">
            <AdminFormField label="Description" type="textarea" value={form.description} onChange={set("description")} placeholder="Describe the event experience..." />
          </div>
          <div className="md:col-span-2">
            <AdminFormField label="Image URL" type="url" value={form.image_url} onChange={set("image_url")} placeholder="https://..." />
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-5 border-t border-olive-100">
          <button
            onClick={handleSave}
            className="bg-olive-800 text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors"
          >
            Create Event
          </button>
          <button
            onClick={() => router.push("/admin/events")}
            className="px-5 py-2 rounded-sm text-sm font-medium text-stone hover:text-olive-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
