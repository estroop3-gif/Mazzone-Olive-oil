"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminTable, Column } from "@/components/admin/ui/AdminTable";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

interface Post {
  id: string;
  title: string;
  category: string;
  status: string;
  date: string;
  author: string;
}

const MOCK_POSTS: Post[] = [
  { id: "1", title: "The Art of Perfect Bruschetta", category: "recipes", status: "published", date: "2024-06-01", author: "Sofia Mazzone" },
  { id: "2", title: "Harvest 2025: A Season of Promise", category: "from_the_grove", status: "published", date: "2024-05-28", author: "Marco Mazzone" },
  { id: "3", title: "Nonna's Sunday Sauce Tradition", category: "recipes", status: "published", date: "2024-05-20", author: "Sofia Mazzone" },
  { id: "4", title: "What 'Extra Virgin' Really Means", category: "italian_culture", status: "published", date: "2024-05-15", author: "Marco Mazzone" },
  { id: "5", title: "Meet Us at Montclair Market", category: "local", status: "published", date: "2024-05-10", author: "Sofia Mazzone" },
  { id: "6", title: "Midnight Spaghetti: Aglio e Olio", category: "recipes", status: "published", date: "2024-05-05", author: "Sofia Mazzone" },
  { id: "7", title: "The Ancient Groves of Nocellara", category: "from_the_grove", status: "draft", date: "2024-06-10", author: "Marco Mazzone" },
  { id: "8", title: "Summer Grilling with EVOO", category: "recipes", status: "draft", date: "2024-06-15", author: "Sofia Mazzone" },
];

const columns: Column<Post>[] = [
  { key: "title", label: "Title", render: (p) => <span className="font-medium text-olive-900">{p.title}</span> },
  { key: "category", label: "Category", render: (p) => <span className="capitalize">{p.category.replace(/_/g, " ")}</span> },
  { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
  { key: "date", label: "Date", render: (p) => new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
  { key: "author", label: "Author" },
];

export default function JournalAdmin() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? MOCK_POSTS : MOCK_POSTS.filter((p) => p.status === filter);

  return (
    <div>
      <PageHeader
        title="Journal"
        description="Manage blog posts and recipes"
        action={{ label: "New Post", onClick: () => router.push("/admin/journal/new") }}
      />

      <div className="flex gap-2 mb-4">
        {["all", "published", "draft"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-sm rounded-sm ${
              filter === s ? "bg-olive-800 text-white" : "bg-olive-50 text-olive-700 hover:bg-olive-100"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <AdminTable columns={columns} data={filtered} onRowClick={(p) => router.push(`/admin/journal/${p.id}`)} />
    </div>
  );
}
