"use client";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "oil", label: "Olive Oils" },
  { key: "vinegar", label: "Vinegars" },
  { key: "pantry", label: "Pantry" },
  { key: "wellness", label: "Wellness" },
  { key: "home", label: "Home" },
  { key: "gift_set", label: "Gifts" },
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-5 py-2.5 text-sm uppercase tracking-wide rounded-sm transition-all duration-200 ${
            active === cat.key
              ? "bg-olive-800 text-white"
              : "bg-olive-50 text-olive-700 hover:bg-olive-100"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
