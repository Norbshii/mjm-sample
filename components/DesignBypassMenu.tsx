"use client";

import { Suspense } from "react";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { bypassScreenLinks } from "@/lib/prototype-navigation";

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
              {bypassScreenLinks.map((item) => (
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
