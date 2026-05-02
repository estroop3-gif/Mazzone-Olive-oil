"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function AdminModal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-sm shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-olive-100">
          <h2 className="font-serif text-lg text-olive-900">{title}</h2>
          <button onClick={onClose} className="text-stone hover:text-olive-900">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
