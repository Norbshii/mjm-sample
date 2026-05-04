"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarNavigation } from "@/components/SidebarNavigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith("/login");

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarNavigation />
      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}
