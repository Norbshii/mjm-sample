"use client";

import {
  BarChartSquare02,
  File05,
  FileSearch03,
  LogOut01,
  RefreshCw04,
  User01,
} from "@untitledui/icons";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
  { label: "Open Spreadsheet", href: "/spreadsheet", icon: FileSearch03 },
  { label: "My Entries", href: "/entries", icon: File05 },
  { label: "Pending Sync", href: "/sync", icon: RefreshCw04 },
  { label: "Profile", href: "/profile", icon: User01 },
];

export function SidebarNavigation() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="mb-8 rounded-xl border border-gray-200 bg-[#F8FAFC] px-3 py-4">
        <div
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            isSidebarOpen ? "max-w-60 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold text-[#344054]">Census Encoding System</p>
          <p className="mt-1 text-xs text-[#667085]">Municipal Operations</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#EFF8FF] text-[#175CD3]"
                  : "text-[#344054] hover:bg-[#F2F4F7]"
              } ${isSidebarOpen ? "gap-3 justify-start" : "justify-center"}`}
            >
              <Icon size={18} />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isSidebarOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setIsSidebarOpen((previous) => !previous)}
        className={`mt-auto mb-2 flex h-10 items-center rounded-lg border border-gray-200 text-[#344054] transition hover:bg-[#F2F4F7] ${
          isSidebarOpen ? "justify-start gap-2 px-3" : "justify-center"
        }`}
      >
        {isSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        <span
          className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
            isSidebarOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          Collapse
        </span>
      </button>

      <button
        type="button"
        className={`flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[#344054] transition hover:bg-[#F2F4F7] ${
          isSidebarOpen ? "justify-start gap-3" : "justify-center"
        }`}
      >
        <LogOut01 size={18} />
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            isSidebarOpen ? "max-w-24 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          Logout
        </span>
      </button>
    </aside>
  );
}
