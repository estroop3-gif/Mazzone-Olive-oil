"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminModal } from "@/components/admin/ui/AdminModal";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { Mail, Newspaper, Tag, MapPin, Wine, Truck } from "lucide-react";

const TEMPLATES = [
  { id: "1", name: "Welcome", slug: "welcome", description: "Sent to new subscribers", icon: Mail, subject: "Benvenuto! Welcome to Mazzone Olive Oil", body: "<h1>Welcome to the Mazzone family</h1><p>Thank you for joining us...</p>" },
  { id: "2", name: "Monthly Newsletter", slug: "newsletter", description: "Regular newsletter template", icon: Newspaper, subject: "This Month from Mazzone", body: "<h1>Monthly Update</h1><p>Here's what's new...</p>" },
  { id: "3", name: "Promotion", slug: "promo", description: "Sale and discount announcements", icon: Tag, subject: "Special Offer from Mazzone", body: "<h1>Limited Time Offer</h1><p>Don't miss out...</p>" },
  { id: "4", name: "Tour Reminder", slug: "tour-reminder", description: "Pre-tour information for guests", icon: MapPin, subject: "Your Italian Tour is Approaching!", body: "<h1>Get Ready for Italy</h1><p>Your tour details...</p>" },
  { id: "5", name: "Club Welcome", slug: "club-welcome", description: "Sent when joining Il Club", icon: Wine, subject: "Welcome to Il Club Mazzone!", body: "<h1>Benvenuto al Club</h1><p>Your first bottle ships...</p>" },
  { id: "6", name: "Shipping Notification", slug: "shipping", description: "Order shipped confirmation", icon: Truck, subject: "Your Mazzone Order Has Shipped!", body: "<h1>On Its Way</h1><p>Your order is on its way...</p>" },
];

export default function EmailTemplates() {
  const [editing, setEditing] = useState<(typeof TEMPLATES)[0] | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");

  const openEdit = (t: (typeof TEMPLATES)[0]) => {
    setEditing(t);
    setEditSubject(t.subject);
    setEditBody(t.body);
  };

  return (
    <div>
      <PageHeader title="Email Templates" description="Reusable email templates" backHref="/admin/email" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="bg-white rounded-sm border border-olive-100 p-5 hover:border-olive-300 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-olive-50 rounded-sm">
                <t.icon size={18} className="text-olive-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-olive-900">{t.name}</h3>
                <p className="text-xs text-stone mt-0.5">{t.description}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal truncate mb-3">{t.subject}</p>
            <button
              onClick={() => openEdit(t)}
              className="text-sm text-olive-600 hover:text-olive-800 underline underline-offset-2"
            >
              Edit Template
            </button>
          </div>
        ))}
      </div>

      <AdminModal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `Edit: ${editing.name}` : ""}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <AdminFormField label="Subject Line" value={editSubject} onChange={setEditSubject} />
          <AdminFormField label="Body (HTML)" type="textarea" value={editBody} onChange={setEditBody} />
          <div className="flex gap-3">
            <button
              onClick={() => { alert("Template saved (demo)"); setEditing(null); }}
              className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
            >
              Save Template
            </button>
            <button
              onClick={() => setEditing(null)}
              className="bg-olive-50 text-olive-700 px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
