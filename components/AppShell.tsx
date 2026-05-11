"use client";

import { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Suspense } from "react";

type AppShellProps = {
  children: ReactNode;
};

function AppShellContent({ children }: AppShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hideSidebar = pathname.startsWith("/login") || searchParams.get("mode") === "view";

  if (hideSidebar) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <main className="min-w-0 flex-1 p-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarNavigation />
      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <Suspense fallback={null}>
      <AppShellContent>{children}</AppShellContent>
    </Suspense>
  );
}
