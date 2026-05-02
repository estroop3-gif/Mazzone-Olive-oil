import Link from "next/link";
import { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

const CATEGORY_LABELS: Record<string, string> = {
  recipes: "Recipes",
  italian_culture: "Italian Culture",
  from_the_grove: "From the Grove",
  local: "Local",
};

export function PostCard({ post }: PostCardProps) {
  const dateFormatted = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      {/* Image */}
      <div className="aspect-[3/2] bg-olive-50 rounded-sm overflow-hidden mb-5">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-olive-300 text-lg italic">
              Il Giornale
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
          {post.category && (
            <span className="text-gold-600">
              {CATEGORY_LABELS[post.category] || post.category}
            </span>
          )}
          {dateFormatted && (
            <span className="text-stone">{dateFormatted}</span>
          )}
        </div>
        <h3 className="font-serif text-xl text-olive-900 group-hover:text-olive-700 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-stone leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <p className="text-sm text-olive-600 font-medium pt-1">
          Read more &rarr;
        </p>
      </div>
    </Link>
  );
}
