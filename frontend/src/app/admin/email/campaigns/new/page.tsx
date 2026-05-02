"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

const SEGMENTS = [
  { label: "All Subscribers", value: "all" },
  { label: "Newsletter Only", value: "newsletter" },
  { label: "Club Members", value: "club" },
  { label: "Tour Guests", value: "tour_guests" },
];

export default function NewCampaign() {
  const [form, setForm] = useState({
    subject: "",
    segment: "",
    body_html: "",
    scheduled_at: "",
  });
  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <PageHeader title="New Campaign" backHref="/admin/email/campaigns" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
            <AdminFormField label="Subject" value={form.subject} onChange={(v) => update("subject", v)} required placeholder="Enter email subject..." />
            <AdminFormField label="Segment" type="select" value={form.segment} onChange={(v) => update("segment", v)} options={SEGMENTS} />
            <AdminFormField label="Email Body (HTML)" type="textarea" value={form.body_html} onChange={(v) => update("body_html", v)} placeholder="Write your email content..." />
            <AdminFormField label="Schedule Send" type="datetime-local" value={form.scheduled_at} onChange={(v) => update("scheduled_at", v)} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert("Campaign created (demo)")}
              className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
            >
              Create & Send
            </button>
            <button
              onClick={() => alert("Draft saved (demo)")}
              className="bg-olive-50 text-olive-700 px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-100"
            >
              Save as Draft
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-olive-900 mb-3">Preview</h3>
          <div className="bg-white rounded-sm border border-olive-100 p-6 min-h-[400px]">
            {form.body_html ? (
              <div dangerouslySetInnerHTML={{ __html: form.body_html }} />
            ) : (
              <p className="text-stone text-sm">Email preview will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
