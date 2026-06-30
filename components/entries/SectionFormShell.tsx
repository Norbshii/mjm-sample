"use client";

import Link from "next/link";
import { HouseholdRoster, type HouseholdRosterMember } from "@/components/entries/HouseholdRoster";

type SectionFormShellProps = {
  sectionLabel: string;
  members: HouseholdRosterMember[];
  activeMember: HouseholdRosterMember;
  onSelectMember: (member: HouseholdRosterMember) => void;
  children: React.ReactNode;
};

function SectionBreadcrumbs({ sectionLabel }: { sectionLabel: string }) {
  return (
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
  );
}

export function SectionFormShell({
  sectionLabel,
  members,
  activeMember,
  onSelectMember,
  children,
}: SectionFormShellProps) {
  const memberNameId = `section-${sectionLabel.replace(/\s+/g, "-").toLowerCase()}-member-name`;

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1">
          <HouseholdRoster members={members} activeMember={activeMember} onSelectMember={onSelectMember} />
        </aside>

        <div className="min-w-0 lg:col-span-3">
          <SectionBreadcrumbs sectionLabel={sectionLabel} />

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <label htmlFor={memberNameId} className="text-sm font-medium text-[#344054]">
              Member Name
            </label>
            <input
              id={memberNameId}
              type="text"
              readOnly
              value={activeMember.name}
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-[#F9FAFB] px-3 text-sm font-medium text-[#101828]"
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
