"use client";

import { LayersTwo01, LinkExternal01, XClose } from "@untitledui/icons";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const quickLinks = [
  { label: "Encoder Login", href: "/login/encoder" },
  { label: "Encoder Dashboard", href: "/dashboard/encoder" },
  { label: "Admin Login", href: "/login/admin" },
  { label: "Admin Dashboard", href: "/dashboard/admin" },
  { label: "Super Admin Login", href: "/login/super-admin" },
  { label: "Super Admin Dashboard", href: "/dashboard/super-admin" },
];

export function DevMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalOpen = searchParams.get("modal") === "open";

  const toggleModal = () => {
    const next = new URLSearchParams(searchParams.toString());

    if (modalOpen) {
      next.delete("modal");
    } else {
      next.set("modal", "open");
    }

    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <aside className="fixed bottom-4 left-4 z-80 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">Dev Mode Navigation</p>
        <LayersTwo01 size={16} className="text-gray-500" />
      </div>

      <nav className="space-y-2">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-[#D6BBFB] hover:bg-[#F9F5FF] hover:text-[#6941C6]"
          >
            {item.label}
            <LinkExternal01 size={14} />
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={toggleModal}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#7F56D9] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#6941C6]"
      >
        {modalOpen ? <XClose size={16} /> : <LayersTwo01 size={16} />}
        {modalOpen ? "Close Sample Modal" : "Open Sample Modal"}
      </button>
    </aside>
  );
}
