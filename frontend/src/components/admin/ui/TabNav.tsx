"use client";

interface TabNavProps {
  tabs: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
}

export function TabNav({ tabs, active, onChange }: TabNavProps) {
  return (
    <div className="flex gap-0 border-b border-olive-100 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            active === tab.value
              ? "border-olive-800 text-olive-900"
              : "border-transparent text-stone hover:text-olive-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
