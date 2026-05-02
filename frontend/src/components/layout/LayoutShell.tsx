"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/account") || pathname.startsWith("/portal/");

  return (
    <>
      <Header />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
