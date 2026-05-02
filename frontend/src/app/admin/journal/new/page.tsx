"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";

const CATEGORIES = [
  { label: "Recipes", value: "recipes" },
  { label: "Italian Culture", value: "italian_culture" },
  { label: "From the Grove", value: "from_the_grove" },
  { label: "Local", value: "local" },
];

export default function JournalNew() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    image_url: "",
    content: "",
    published: false,
    scheduled_date: "",
  });
  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value, ...(key === "title" ? { slug: (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") } : {}) }));

  return (
    <div>
      <PageHeader title="New Post" backHref="/admin/journal" />

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

        <button
          onClick={() => alert("Post created (demo)")}
          className="bg-olive-800 text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-olive-700"
        >
          Create Post
        </button>
      </div>
    </div>
  );
}
