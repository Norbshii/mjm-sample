"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { FinanceAccountGrid } from "@/components/entries/FinanceAccountGrid";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionFormShell } from "@/components/entries/SectionFormShell";
import {
  mockHouseholdSections,
  toRosterMember,
  type MockHouseholdSectionMember,
} from "@/lib/entries/mock-household-sections";

type SectionIProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const sectionISchema = z
  .object({
    i01: z.array(z.string()).min(1, "Select at least one financial account option (I01)."),
    i01_z_specify: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.i01.includes("Z") && !data.i01_z_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other financial account (I01).",
        path: ["i01_z_specify"],
      });
    }
  });

export type SectionIFormValues = z.infer<typeof sectionISchema>;

const emptyFormValues: SectionIFormValues = {
  i01: [],
  i01_z_specify: "",
};

const rosterMembers = mockHouseholdSections.map(toRosterMember);

function valuesForMember(member: MockHouseholdSectionMember): SectionIFormValues {
  return {
    ...emptyFormValues,
    i01: member.sectionI.i01 ?? [],
    i01_z_specify: member.sectionI.i01_z_specify ?? "",
  };
}

export function SectionI({ onNext, onPrevious }: SectionIProps) {
  const [activeMember, setActiveMember] = useState<MockHouseholdSectionMember>(mockHouseholdSections[0]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SectionIFormValues>({
    resolver: zodResolver(sectionISchema),
    defaultValues: valuesForMember(mockHouseholdSections[0]),
  });

  const watchI01Specify = watch("i01_z_specify");

  const handleSelectMember = (member: { id: string }) => {
    const resolved = mockHouseholdSections.find((entry) => entry.id === member.id) ?? mockHouseholdSections[0];
    setActiveMember(resolved);
    reset(valuesForMember(resolved));
  };

  const onSubmit = (data: SectionIFormValues) => {
    console.log("Section I submission:", { memberId: activeMember.id, data });
    onNext?.();
  };

  return (
    <SectionFormShell
      sectionLabel="Section I: Formal Financial Account"
      members={rosterMembers}
      activeMember={toRosterMember(activeMember)}
      onSelectMember={handleSelectMember}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Section I: Formal Financial Account
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            Government is also interested in assessing access and use of financial services for economic opportunity
            and supporting household decision. Now, we will ask about any formal financial account owned by you or
            any of your household members.
          </p>
          <Controller
            name="i01"
            control={control}
            render={({ field }) => (
              <FinanceAccountGrid
                values={field.value ?? []}
                specify={watchI01Specify ?? ""}
                error={errors.i01?.message}
                specifyError={errors.i01_z_specify?.message}
                onChange={(values) => {
                  field.onChange(values);
                  if (!values.includes("Z")) {
                    setValue("i01_z_specify", "", { shouldValidate: true });
                  }
                }}
                onSpecifyChange={(value) => setValue("i01_z_specify", value, { shouldValidate: true })}
              />
            )}
          />
        </article>
        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionFormShell>
  );
}
