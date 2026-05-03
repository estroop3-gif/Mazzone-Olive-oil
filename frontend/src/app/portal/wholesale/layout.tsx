"use client";

import { useState } from "react";
import { RequireAdmin } from "@/components/auth/RequireAdmin";
import { WholesaleSidebar } from "@/components/wholesale/WholesaleSidebar";
import { WholesaleTopBar } from "@/components/wholesale/WholesaleTopBar";

export default function WholesaleLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <RequireAdmin>
      <div className="pt-20 min-h-screen flex bg-warm-white">
        <WholesaleSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <WholesaleTopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
}
