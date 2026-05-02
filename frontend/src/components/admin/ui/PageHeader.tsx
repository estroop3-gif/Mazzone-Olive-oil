"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  backHref?: string;
}

export function PageHeader({ title, description, action, backHref }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      {backHref && (
        <button
          onClick={() => router.push(backHref)}
          className="flex items-center gap-1.5 text-sm text-olive-600 hover:text-olive-900 mb-3 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-heading-sm text-olive-900">{title}</h1>
          {description && <p className="text-stone text-sm mt-1">{description}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="bg-olive-800 text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-olive-700 transition-colors shrink-0"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
