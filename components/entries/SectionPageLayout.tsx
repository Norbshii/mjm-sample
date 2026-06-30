"use client";

import Link from "next/link";

type SectionPageLayoutProps = {
  sectionLabel: string;
  children: React.ReactNode;
};

export function SectionPageLayout({ sectionLabel, children }: SectionPageLayoutProps) {
  return (
    <div className="pb-4">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          <li>
            <Link href="/dashboard" className="font-medium text-[#475467] transition hover:text-[#175CD3]">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#98A2B3]">
            /
          </li>
          <li>
            <Link href="/entries" className="font-medium text-[#475467] transition hover:text-[#175CD3]">
              Household Profile
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#98A2B3]">
            /
          </li>
          <li>
            <span className="font-semibold text-[#101828]">{sectionLabel}</span>
          </li>
        </ol>
      </nav>
      {children}
    </div>
  );
}
