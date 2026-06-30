"use client";

import { CheckCircle2, User } from "lucide-react";

export type HouseholdRosterStatus = "completed" | "pending";

export type HouseholdRosterMember<TDefaults = Record<string, unknown>> = {
  id: string;
  name: string;
  relationship: string;
  age: number;
  defaultValues: TDefaults;
  status: HouseholdRosterStatus;
};

type HouseholdRosterProps<TDefaults = Record<string, unknown>> = {
  members: HouseholdRosterMember<TDefaults>[];
  activeMember: HouseholdRosterMember<TDefaults>;
  onSelectMember: (member: HouseholdRosterMember<TDefaults>) => void;
};

export function HouseholdRoster<TDefaults = Record<string, unknown>>({
  members,
  activeMember,
  onSelectMember,
}: HouseholdRosterProps<TDefaults>) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        Household Roster
      </h3>

      {members.map((member) => {
        const isActive = activeMember.id === member.id;
        const showStatusIcon = isActive || member.status === "completed";

        return (
          <button
            key={member.id}
            type="button"
            onClick={() => onSelectMember(member)}
            className={`relative flex w-full items-center gap-4 p-4 text-left transition-all ${
              isActive
                ? "rounded-r-xl rounded-l-none bg-blue-50"
                : "rounded-xl bg-transparent hover:bg-gray-50"
            }`}
          >
            {isActive ? (
              <div className="absolute top-0 bottom-0 left-0 w-1 rounded-r-md bg-blue-600" />
            ) : null}

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              <User size={20} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <span
                className={`truncate text-sm uppercase ${
                  isActive ? "font-semibold text-blue-700" : "font-medium text-gray-900"
                }`}
              >
                {member.name}
              </span>
              <span className="truncate text-xs text-gray-500">{member.relationship}</span>
            </div>

            {showStatusIcon ? (
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-blue-600" : "text-[#067647]"
                }`}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
