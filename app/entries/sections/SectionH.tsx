"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionFormShell } from "@/components/entries/SectionFormShell";
import { h01Options } from "@/constants/sections-ghi";
import {
  mockHouseholdSections,
  toRosterMember,
  type MockHouseholdSectionMember,
} from "@/lib/entries/mock-household-sections";

type SectionHProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const sectionHSchema = z.object({
  h01: z.string().min(1, "H01 is required."),
});

export type SectionHFormValues = z.infer<typeof sectionHSchema>;

const emptyFormValues: SectionHFormValues = { h01: "" };

const rosterMembers = mockHouseholdSections.map(toRosterMember);

function valuesForMember(member: MockHouseholdSectionMember): SectionHFormValues {
  return { ...emptyFormValues, ...member.sectionH };
}

export function SectionH({ onNext, onPrevious }: SectionHProps) {
  const [activeMember, setActiveMember] = useState<MockHouseholdSectionMember>(mockHouseholdSections[0]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionHFormValues>({
    resolver: zodResolver(sectionHSchema),
    defaultValues: valuesForMember(mockHouseholdSections[0]),
  });

  const handleSelectMember = (member: { id: string }) => {
    const resolved = mockHouseholdSections.find((entry) => entry.id === member.id) ?? mockHouseholdSections[0];
    setActiveMember(resolved);
    reset(valuesForMember(resolved));
  };

  const onSubmit = (data: SectionHFormValues) => {
    console.log("Section H submission:", { memberId: activeMember.id, data });
    onNext?.();
  };

  return (
    <SectionFormShell
      sectionLabel="Section H: Access to Public Transportation"
      members={rosterMembers}
      activeMember={toRosterMember(activeMember)}
      onSelectMember={handleSelectMember}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Section H: Access to Public Transportation
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-[#475467] italic">
            This question will ask about the household&apos;s accessibility to any public transportation vehicle in
            the area.
          </p>
          <Controller
            name="h01"
            control={control}
            render={({ field }) => (
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-[#344054]">
                  H01. Does your household have access to any public transportation vehicle within 500 meters from
                  your housing unit (if within 10–15 minutes walking distance)? *
                </legend>
                <div className="mt-4 flex flex-wrap gap-6">
                  {h01Options.map((option) => (
                    <label
                      key={option.value}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 transition ${
                        field.value === option.value
                          ? "border-[#B2DDFF] bg-[#EFF8FF]"
                          : "border-gray-200 bg-white hover:bg-[#F9FAFB]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="h01"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                        className="h-4 w-4 border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                      />
                      <span className="text-sm font-medium text-[#344054]">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.h01?.message ? (
                  <p className="text-xs text-[#D92D20]">{errors.h01.message}</p>
                ) : null}
              </fieldset>
            )}
          />
        </article>
        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionFormShell>
  );
}
