"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_THREADS } from "@/data/account-mock";
import { MessageSquare, Pin, Plus } from "lucide-react";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "recipes", label: "Recipes" },
  { key: "tasting_notes", label: "Tasting Notes" },
  { key: "pairings", label: "Pairings" },
  { key: "general", label: "General" },
];

const CATEGORY_COLORS: Record<string, string> = {
  recipes: "bg-green-50 text-green-700",
  tasting_notes: "bg-purple-50 text-purple-700",
  pairings: "bg-gold-50 text-gold-700",
  general: "bg-olive-50 text-olive-700",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 30) return `${Math.floor(days / 30)}mo ago`;
  if (days > 0) return `${days}d ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `${hours}h ago`;
  return "just now";
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState<string>("general");

  const filtered = activeCategory === "all"
    ? MOCK_THREADS
    : MOCK_THREADS.filter((t) => t.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-olive-900">Community</h1>
        <button
          onClick={() => setShowNewThread(!showNewThread)}
          className="flex items-center gap-1.5 px-3 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors"
        >
          <Plus size={14} /> New Thread
        </button>
      </div>

      {/* New Thread Form */}
      {showNewThread && (
        <div className="bg-white rounded-sm border border-olive-100 p-5 mb-6">
          <h3 className="font-medium text-olive-900 text-sm mb-3">Start a Discussion</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Thread title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
            <textarea
              placeholder="What's on your mind?"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-olive-500"
            />
            <div className="flex items-center gap-3">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 border border-olive-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              >
                {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
              <button
                onClick={() => { setShowNewThread(false); setNewTitle(""); setNewBody(""); }}
                className="px-3 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors"
              >
                Post
              </button>
              <button
                onClick={() => setShowNewThread(false)}
                className="px-3 py-2 text-stone text-sm hover:text-olive-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === cat.key
                ? "bg-olive-800 text-white"
                : "bg-olive-50 text-olive-600 hover:bg-olive-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Thread List */}
      <div className="space-y-2">
        {sorted.map((thread) => (
          <Link
            key={thread.id}
            href={`/account/community/${thread.id}`}
            className="block bg-white rounded-sm border border-olive-100 p-4 hover:border-olive-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {thread.is_pinned && <Pin size={12} className="text-gold-600 shrink-0" />}
                  <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${CATEGORY_COLORS[thread.category] ?? "bg-olive-50 text-olive-700"}`}>
                    {thread.category.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-olive-900 line-clamp-1">{thread.title}</h3>
                <p className="text-xs text-stone mt-1">
                  {thread.author_name} · {timeAgo(thread.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-stone shrink-0">
                <MessageSquare size={14} />
                <span className="text-xs">{thread.reply_count}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
