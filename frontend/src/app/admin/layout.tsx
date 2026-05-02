"use client";

import { useState } from "react";
import { RequireAdmin } from "@/components/auth/RequireAdmin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <RequireAdmin>
      <div className="fixed inset-0 z-[100] flex bg-warm-white">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
}
