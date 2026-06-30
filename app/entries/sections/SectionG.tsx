"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FoodSecurityMatrix, gFieldKeys, type GFieldKey } from "@/components/entries/FoodSecurityMatrix";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionFormShell } from "@/components/entries/SectionFormShell";
import {
  mockHouseholdSections,
  toRosterMember,
  type MockHouseholdSectionMember,
} from "@/lib/entries/mock-household-sections";

type SectionGProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const sectionGSchema = z.object({
  g01: z.string().min(1, "G01 is required."),
  g02: z.string().min(1, "G02 is required."),
  g03: z.string().min(1, "G03 is required."),
  g04: z.string().min(1, "G04 is required."),
  g05: z.string().min(1, "G05 is required."),
  g06: z.string().min(1, "G06 is required."),
  g07: z.string().min(1, "G07 is required."),
  g08: z.string().min(1, "G08 is required."),
});

export type SectionGFormValues = z.infer<typeof sectionGSchema>;

const emptyFormValues: SectionGFormValues = {
  g01: "",
  g02: "",
  g03: "",
  g04: "",
  g05: "",
  g06: "",
  g07: "",
  g08: "",
};

const rosterMembers = mockHouseholdSections.map(toRosterMember);

function valuesForMember(member: MockHouseholdSectionMember): SectionGFormValues {
  return { ...emptyFormValues, ...member.sectionG };
}

export function SectionG({ onNext, onPrevious }: SectionGProps) {
  const [activeMember, setActiveMember] = useState<MockHouseholdSectionMember>(mockHouseholdSections[0]);

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SectionGFormValues>({
    resolver: zodResolver(sectionGSchema),
    defaultValues: valuesForMember(mockHouseholdSections[0]),
  });

  const gValues = Object.fromEntries(gFieldKeys.map((key) => [key, watch(key)])) as Record<GFieldKey, string>;

  const handleSelectMember = (member: { id: string }) => {
    const resolved = mockHouseholdSections.find((entry) => entry.id === member.id) ?? mockHouseholdSections[0];
    setActiveMember(resolved);
    reset(valuesForMember(resolved));
  };

  const onSubmit = (data: SectionGFormValues) => {
    console.log("Section G submission:", { memberId: activeMember.id, data });
    onNext?.();
  };

  return (
    <SectionFormShell
      sectionLabel="Section G: Food Security"
      members={rosterMembers}
      activeMember={toRosterMember(activeMember)}
      onSelectMember={handleSelectMember}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Section G: Food Security
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            Now we would like to ask about your household&apos;s experience in food security in the past 12
            months. We will give several statements and you are requested to answer whether you or any other adult
            in the household experienced this or not. Timeframe: During the past 12 months.
          </p>
          <FoodSecurityMatrix
            values={gValues}
            errors={errors}
            onChange={(field, value) => setValue(field, value, { shouldValidate: true })}
          />
        </article>
        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionFormShell>
  );
}
