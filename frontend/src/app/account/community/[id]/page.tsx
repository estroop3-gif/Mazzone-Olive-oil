"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_THREADS, MOCK_REPLIES } from "@/data/account-mock";
import { ArrowLeft, MessageSquare } from "lucide-react";
import type { CommunityReply } from "@/types";

export default function ThreadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const thread = MOCK_THREADS.find((t) => t.id === id);
  const initialReplies = MOCK_REPLIES[id ?? ""] ?? [];
  const [replies, setReplies] = useState<CommunityReply[]>(initialReplies);
  const [replyText, setReplyText] = useState("");

  if (!thread) {
    return (
      <div className="max-w-3xl text-center py-20">
        <p className="text-stone">Thread not found.</p>
        <Link href="/account/community" className="text-gold-700 hover:text-gold-800 text-sm mt-2 inline-block">
          Back to Community
        </Link>
      </div>
    );
  }

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    const newReply: CommunityReply = {
      id: `rep-new-${Date.now()}`,
      thread_id: thread.id,
      body: replyText,
      author_name: "You",
      created_at: new Date().toISOString(),
    };
    setReplies((prev) => [...prev, newReply]);
    setReplyText("");
  };

  return (
    <div className="max-w-3xl">
      <Link href="/account/community" className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 mb-6">
        <ArrowLeft size={14} /> Back to Community
      </Link>

      {/* Thread */}
      <div className="bg-white rounded-sm border border-olive-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-olive-50 text-olive-700">
            {thread.category.replace(/_/g, " ")}
          </span>
        </div>
        <h1 className="font-serif text-xl text-olive-900 mb-2">{thread.title}</h1>
        <p className="text-sm text-charcoal leading-relaxed whitespace-pre-wrap">{thread.body}</p>
        <p className="text-xs text-stone mt-4">
          {thread.author_name} · {new Date(thread.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Replies */}
      <div className="mb-6">
        <h2 className="flex items-center gap-2 font-medium text-olive-900 text-sm mb-4">
          <MessageSquare size={14} /> {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>
        <div className="space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-white rounded-sm border border-olive-100 p-4">
              <p className="text-sm text-charcoal leading-relaxed">{reply.body}</p>
              <p className="text-xs text-stone mt-2">
                {reply.author_name} · {new Date(reply.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-sm border border-olive-100 p-5">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="w-full px-3 py-2 border border-olive-200 rounded-sm text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-olive-500 mb-3"
        />
        <button
          onClick={handleSubmitReply}
          disabled={!replyText.trim()}
          className="px-4 py-2 bg-olive-800 text-white rounded-sm text-sm hover:bg-olive-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Reply
        </button>
      </div>
    </div>
  );
}
