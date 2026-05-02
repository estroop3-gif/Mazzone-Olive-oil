"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    store_hours: "Tuesday–Saturday: 10am–6pm\nSunday: 11am–4pm\nMonday: Closed",
    phone: "(973) 555-0142",
    email: "ciao@mazzoneolive.com",
    address: "42 Bloomfield Avenue\nMontclair, NJ 07042",
    instagram: "https://instagram.com/mazzoneoliveoil",
    facebook: "https://facebook.com/mazzoneoliveoil",
    tiktok: "",
    youtube: "",
  });

  const update = (key: string, value: string) => setSettings((s) => ({ ...s, [key]: value }));

  return (
    <div>
      <PageHeader title="Site Settings" description="Store information and social links" backHref="/admin/content" />

      <div className="max-w-3xl space-y-6">
        <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
          <h2 className="font-serif text-lg text-olive-900">Contact & Hours</h2>
          <AdminFormField label="Store Hours" type="textarea" value={settings.store_hours} onChange={(v) => update("store_hours", v)} />
          <AdminFormField label="Phone" value={settings.phone} onChange={(v) => update("phone", v)} />
          <AdminFormField label="Email" type="email" value={settings.email} onChange={(v) => update("email", v)} />
          <AdminFormField label="Address" type="textarea" value={settings.address} onChange={(v) => update("address", v)} />
        </div>

        <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
          <h2 className="font-serif text-lg text-olive-900">Social Media</h2>
          <AdminFormField label="Instagram" type="url" value={settings.instagram} onChange={(v) => update("instagram", v)} placeholder="https://instagram.com/..." />
          <AdminFormField label="Facebook" type="url" value={settings.facebook} onChange={(v) => update("facebook", v)} placeholder="https://facebook.com/..." />
          <AdminFormField label="TikTok" type="url" value={settings.tiktok} onChange={(v) => update("tiktok", v)} placeholder="https://tiktok.com/@..." />
          <AdminFormField label="YouTube" type="url" value={settings.youtube} onChange={(v) => update("youtube", v)} placeholder="https://youtube.com/..." />
        </div>

        <button
          onClick={() => alert("Settings saved (demo)")}
          className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
