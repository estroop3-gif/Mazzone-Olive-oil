"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

const MOCK_POST = {
  title: "The Art of Perfect Bruschetta",
  slug: "the-art-of-perfect-bruschetta",
  excerpt: "Learn how to make authentic Sicilian bruschetta with our Nocellara extra virgin olive oil.",
  category: "recipes",
  image_url: "/images/journal/bruschetta.jpg",
  content: `There's a simplicity to bruschetta that belies its depth. The bread must be right — a rustic pane di casa, grilled over embers until the edges char and the center stays pillowy. The tomatoes must be at their peak, warm from the sun.\n\nBut the olive oil — that's where the magic lives. A generous pour of our Nocellara EVOO, with its grassy notes and peppery finish, transforms simple ingredients into something transcendent.\n\nRub the warm bread with a halved garlic clove. Pile on diced tomatoes dressed with oil, a pinch of Trapani sea salt, and torn basil leaves. That's it. That's perfection.`,
  published: true,
  scheduled_date: "",
};

const CATEGORIES = [
  { label: "Recipes", value: "recipes" },
  { label: "Italian Culture", value: "italian_culture" },
  { label: "From the Grove", value: "from_the_grove" },
  { label: "Local", value: "local" },
];

export default function JournalEdit() {
  const [form, setForm] = useState(MOCK_POST);
  const update = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <PageHeader title="Edit Post" backHref="/admin/journal" />

      <div className="max-w-3xl space-y-5">
        <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
          <AdminFormField label="Title" value={form.title} onChange={(v) => update("title", v)} required />
          <AdminFormField label="Slug" value={form.slug} onChange={(v) => update("slug", v)} />
          <AdminFormField label="Excerpt" type="textarea" value={form.excerpt} onChange={(v) => update("excerpt", v)} />
          <AdminFormField label="Category" type="select" value={form.category} onChange={(v) => update("category", v)} options={CATEGORIES} />
          <AdminFormField label="Image URL" value={form.image_url} onChange={(v) => update("image_url", v)} />
          <AdminFormField label="Content" type="textarea" value={form.content} onChange={(v) => update("content", v)} />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="rounded border-olive-300"
            />
            <label htmlFor="published" className="text-sm text-olive-800">Published</label>
          </div>

          {!form.published && (
            <AdminFormField label="Schedule Date" type="datetime-local" value={form.scheduled_date} onChange={(v) => update("scheduled_date", v)} />
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => alert("Post saved (demo)")}
            className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
          >
            Save Post
          </button>
          <button
            onClick={() => alert("Post deleted (demo)")}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-sm text-sm font-medium hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
