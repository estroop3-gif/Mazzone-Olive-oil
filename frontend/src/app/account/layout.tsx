"use client";

import { useState } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AccountTopBar } from "@/components/account/AccountTopBar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <RequireAuth>
      <div className="pt-20 min-h-screen flex bg-warm-white">
        <AccountSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <AccountTopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
