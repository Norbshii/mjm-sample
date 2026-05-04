"use client";

import { Suspense } from "react";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const screenLinks = [
  { label: "Screen 01 - Login", href: "/login" },
  { label: "Screen 02 - Dashboard", href: "/dashboard" },
  { label: "Screen 03 - Spreadsheet", href: "/spreadsheet" },
  { label: "Screen 04 - Entries", href: "/entries" },
  { label: "Screen 05 - Pending Sync", href: "/sync" },
  { label: "Screen 06 - Profile", href: "/profile" },
  { label: "Screen 07 - Encoder Login", href: "/login/encoder" },
  { label: "Screen 08 - Admin Login", href: "/login/admin" },
  { label: "Screen 09 - Super Admin Login", href: "/login/super-admin" },
  { label: "Screen 10 - Encoder Dashboard", href: "/dashboard/encoder" },
  { label: "Screen 11 - Admin Dashboard", href: "/dashboard/admin" },
  { label: "Screen 12 - Super Admin Dashboard", href: "/dashboard/super-admin" },
  { label: "Screen 13 - Encoder Loading", href: "/login/encoder?state=loading" },
  { label: "Screen 14 - Encoder Error", href: "/login/encoder?state=error" },
  { label: "Screen 15 - Encoder Success", href: "/login/encoder?state=success" },
  { label: "Screen 16 - Admin Loading", href: "/login/admin?state=loading" },
  { label: "Screen 17 - Admin Error", href: "/login/admin?state=error" },
  { label: "Screen 18 - Super Admin Loading", href: "/login/super-admin?state=loading" },
  { label: "Screen 19 - Super Admin Error", href: "/login/super-admin?state=error" },
];

function MenuContent() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const unlockAll = searchParams.get("unlockAll") === "true";

  const toggleFormUnlock = () => {
    const next = new URLSearchParams(searchParams.toString());
    if (unlockAll) {
      next.delete("unlockAll");
    } else {
      next.set("unlockAll", "true");
    }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="fixed bottom-4 right-4 z-9999 font-[Inter,ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Helvetica,Arial,sans-serif]">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open design bypass menu"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition hover:bg-gray-50"
        >
          <Settings size={18} />
        </button>
      ) : (
        <aside className="w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Design Bypass Menu</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close design bypass menu"
              className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Screen Navigator (19)
            </p>
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {screenLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-[#D6BBFB] hover:bg-[#F9F5FF] hover:text-[#6941C6]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Section D: Form Dev Tools
            </p>
            <button
              type="button"
              onClick={toggleFormUnlock}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:border-[#D6BBFB] hover:bg-[#F9F5FF] hover:text-[#6941C6]"
            >
              Toggle Form Unlock {unlockAll ? "(On)" : "(Off)"}
            </button>
          </section>
        </aside>
      )}
    </div>
  );
}

export default function DesignBypassMenu() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  );
}
