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

const MOCK_CAMPAIGN = {
  subject: "Summer Sale: 20% Off All Oils",
  segment: "all",
  body_html: `<h1 style="font-family: 'Playfair Display', serif; color: #1f331f;">Summer Sale at Mazzone</h1>
<p>Ciao! We're celebrating summer with <strong>20% off</strong> our entire collection of extra virgin olive oils.</p>
<p>From our flagship Nocellara EVOO to the bright, citrusy Olio al Limone — every bottle is ready for your summer table.</p>
<p><a href="#" style="background: #2d4a2d; color: white; padding: 12px 24px; text-decoration: none; display: inline-block;">Shop the Sale →</a></p>
<p style="color: #6B6B6B; font-size: 14px;">Use code <strong>SUMMER20</strong> at checkout. Valid through July 31.</p>`,
  scheduled_at: "",
};

export default function CampaignEditor() {
  const [form, setForm] = useState(MOCK_CAMPAIGN);
  const [showPreview, setShowPreview] = useState(false);
  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <PageHeader title="Edit Campaign" backHref="/admin/email/campaigns" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
            <AdminFormField label="Subject" value={form.subject} onChange={(v) => update("subject", v)} required />
            <AdminFormField label="Segment" type="select" value={form.segment} onChange={(v) => update("segment", v)} options={SEGMENTS} />
            <AdminFormField label="Email Body (HTML)" type="textarea" value={form.body_html} onChange={(v) => update("body_html", v)} />
            <AdminFormField label="Schedule Send" type="datetime-local" value={form.scheduled_at} onChange={(v) => update("scheduled_at", v)} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert("Campaign sent (demo)")}
              className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
            >
              Send Now
            </button>
            <button
              onClick={() => alert("Campaign scheduled (demo)")}
              className="bg-gold-500 text-olive-950 px-6 py-2 rounded-sm text-sm font-medium hover:bg-gold-400"
            >
              Schedule
            </button>
            <button
              onClick={() => alert("Draft saved (demo)")}
              className="bg-olive-50 text-olive-700 px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-100"
            >
              Save Draft
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-lg text-olive-900">Preview</h3>
          </div>
          <div
            className="bg-white rounded-sm border border-olive-100 p-6 min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: form.body_html }}
          />
        </div>
      </div>
    </div>
  );
}
