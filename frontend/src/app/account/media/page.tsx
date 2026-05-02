"use client";

import { useState } from "react";
import { MOCK_EPISODES, MOCK_MEDIA_SUBSCRIPTION, MOCK_MEDIA_CATEGORIES } from "@/data/media-mock";
import { Play, Lock, Crown } from "lucide-react";

export default function AccountMediaPage() {
  // Toggle this to see subscribed vs unsubscribed states
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const publishedEpisodes = MOCK_EPISODES.filter((e) => e.status === "published");
  const featuredEpisode = publishedEpisodes.find((e) => e.is_featured) ?? publishedEpisodes[publishedEpisodes.length - 1];
  const seasons = [...new Set(publishedEpisodes.map((e) => e.season))].sort();

  const filteredEpisodes = activeCategory === "all"
    ? publishedEpisodes
    : publishedEpisodes.filter((e) => e.category === activeCategory);

  if (!isSubscribed) {
    return (
      <div className="max-w-4xl">
        {/* Subscribe CTA Hero */}
        <div className="bg-olive-900 rounded-sm p-8 md:p-12 text-center mb-8">
          <Crown size={32} className="text-gold-400 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-white mb-3">The Mazzone Olive Oil Show</h1>
          <p className="text-olive-300 max-w-lg mx-auto mb-6">
            Exclusive episodes on cooking, tasting, harvest stories, and the art of olive oil. From our groves to your screen.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-gold-400 font-serif text-2xl">$5</span>
            <span className="text-olive-400 text-sm">/month</span>
          </div>
          <button
            onClick={() => setIsSubscribed(true)}
            className="px-6 py-3 bg-gold-500 text-olive-900 rounded-sm font-medium hover:bg-gold-400 transition-colors"
          >
            Subscribe Now
          </button>
        </div>

        {/* Free Preview + Locked Grid */}
        <div className="mb-6">
          <h2 className="font-medium text-olive-900 mb-4">Free Preview</h2>
          <div className="bg-white rounded-sm border border-olive-100 p-5">
            <div className="aspect-video bg-olive-100 rounded-sm flex items-center justify-center mb-3 cursor-pointer hover:bg-olive-200 transition-colors">
              <Play size={40} className="text-olive-500" />
            </div>
            <h3 className="font-medium text-olive-900">{publishedEpisodes[0]?.title}</h3>
            <p className="text-xs text-stone mt-1">{publishedEpisodes[0]?.description}</p>
          </div>
        </div>

        <h2 className="font-medium text-olive-900 mb-4">All Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedEpisodes.slice(1).map((ep) => (
            <div key={ep.id} className="bg-white rounded-sm border border-olive-100 p-4 opacity-60">
              <div className="aspect-video bg-olive-100 rounded-sm flex items-center justify-center mb-3 relative">
                <Lock size={20} className="text-olive-400" />
              </div>
              <h3 className="text-sm font-medium text-olive-900 line-clamp-1">{ep.title}</h3>
              <p className="text-xs text-stone mt-1">S{ep.season} E{ep.episode_number} · {ep.duration_minutes} min</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-olive-900">The Olive Oil Show</h1>
        <span className="flex items-center gap-1.5 text-xs text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
          <Crown size={12} /> Subscriber
        </span>
      </div>

      {/* Featured Episode */}
      {featuredEpisode && (
        <div className="bg-white rounded-sm border border-olive-100 p-5 mb-8">
          <div className="aspect-video bg-olive-100 rounded-sm flex items-center justify-center mb-4 cursor-pointer hover:bg-olive-200 transition-colors group">
            <div className="w-16 h-16 bg-olive-800/80 group-hover:bg-olive-800 rounded-full flex items-center justify-center transition-colors">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gold-600 font-medium mb-1">Featured Episode</p>
              <h2 className="font-serif text-lg text-olive-900">{featuredEpisode.title}</h2>
              <p className="text-sm text-stone mt-1">{featuredEpisode.description}</p>
              <p className="text-xs text-stone mt-2">
                Season {featuredEpisode.season} · Episode {featuredEpisode.episode_number} · {featuredEpisode.duration_minutes} min
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {MOCK_MEDIA_CATEGORIES.map((cat) => (
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

      {/* Episodes by Season */}
      {seasons.map((season) => {
        const seasonEps = filteredEpisodes.filter((e) => e.season === season);
        if (seasonEps.length === 0) return null;
        return (
          <div key={season} className="mb-8">
            <h3 className="font-medium text-olive-900 text-sm mb-3">Season {season}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasonEps.map((ep) => (
                <div key={ep.id} className="bg-white rounded-sm border border-olive-100 p-4 cursor-pointer hover:border-olive-200 transition-colors">
                  <div className="aspect-video bg-olive-100 rounded-sm flex items-center justify-center mb-3 group">
                    <Play size={24} className="text-olive-400 group-hover:text-olive-600 transition-colors" />
                  </div>
                  <h4 className="text-sm font-medium text-olive-900 line-clamp-1">{ep.title}</h4>
                  <p className="text-xs text-stone mt-1 line-clamp-2">{ep.description}</p>
                  <p className="text-xs text-stone mt-2">
                    E{ep.episode_number} · {ep.duration_minutes} min
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
