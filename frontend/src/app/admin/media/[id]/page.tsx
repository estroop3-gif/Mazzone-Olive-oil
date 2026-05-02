"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOCK_EPISODES } from "@/data/media-mock";
import { MOCK_MEDIA_CATEGORIES } from "@/data/media-mock";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminFormField } from "@/components/admin/ui/AdminFormField";
import { Upload, Trash2 } from "lucide-react";

export default function AdminMediaEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const episode = MOCK_EPISODES.find((e) => e.id === id);

  const [form, setForm] = useState({
    title: episode?.title ?? "",
    description: episode?.description ?? "",
    season: String(episode?.season ?? 1),
    episode_number: String(episode?.episode_number ?? 1),
    duration_minutes: String(episode?.duration_minutes ?? 0),
    category: episode?.category ?? "",
    status: episode?.status ?? "draft",
    is_featured: episode?.is_featured ?? false,
  });

  if (!episode) {
    return (
      <div className="text-center py-20">
        <p className="text-stone">Episode not found.</p>
      </div>
    );
  }

  const update = (key: string) => (value: string) => setForm({ ...form, [key]: value });

  return (
    <div className="max-w-3xl">
      <PageHeader title={episode.title} backHref="/admin/media" />

      <div className="bg-white rounded-sm border border-olive-100 p-6 space-y-5">
        <AdminFormField label="Title" value={form.title} onChange={update("title")} required />
        <AdminFormField label="Description" type="textarea" value={form.description} onChange={update("description")} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AdminFormField label="Season" type="number" value={form.season} onChange={update("season")} />
          <AdminFormField label="Episode #" type="number" value={form.episode_number} onChange={update("episode_number")} />
          <AdminFormField label="Duration (min)" type="number" value={form.duration_minutes} onChange={update("duration_minutes")} />
          <AdminFormField
            label="Category"
            type="select"
            value={form.category}
            onChange={update("category")}
            options={MOCK_MEDIA_CATEGORIES.filter((c) => c.key !== "all").map((c) => ({ label: c.label, value: c.key }))}
          />
        </div>

        <AdminFormField
          label="Status"
          type="select"
          value={form.status}
          onChange={update("status")}
          options={[
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Scheduled", value: "scheduled" },
          ]}
        />

        {/* Featured Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            className="w-4 h-4 rounded border-olive-300 text-olive-700 focus:ring-olive-500"
          />
          <label htmlFor="featured" className="text-sm text-olive-800">Featured Episode</label>
        </div>

        {/* Upload Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-olive-800 mb-1.5">Thumbnail</label>
            <div className="border-2 border-dashed border-olive-200 rounded-sm p-6 text-center hover:border-olive-300 transition-colors cursor-pointer">
              <Upload size={20} className="text-olive-400 mx-auto mb-2" />
              <p className="text-xs text-stone">Drag & drop or click to upload</p>
              <p className="text-xs text-olive-400 mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-olive-800 mb-1.5">Video</label>
            <div className="border-2 border-dashed border-olive-200 rounded-sm p-6 text-center hover:border-olive-300 transition-colors cursor-pointer">
              <Upload size={20} className="text-olive-400 mx-auto mb-2" />
              <p className="text-xs text-stone">Upload MP4/MOV</p>
              <p className="text-xs text-olive-400 mt-1">Up to 2GB</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-olive-100">
          <button className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:text-red-700 text-sm transition-colors">
            <Trash2 size={14} /> Delete Episode
          </button>
          <button className="px-5 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
