"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SocialProtectionProgramTable } from "@/components/entries/SocialProtectionProgramTable";
import { TristateRadioGroup } from "@/components/entries/TristateRadioGroup";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionFormShell } from "@/components/entries/SectionFormShell";
import { card1Programs, card3Programs } from "@/constants/section-m";
import {
  mockHouseholdSections,
  toRosterMember,
  type MockHouseholdSectionMember,
} from "@/lib/entries/mock-household-sections";
import {
  fillTristateDefaults,
  sectionMMockPersonas,
  sectionMSchema,
  type SectionMFormValues,
} from "@/lib/entries/section-m-schema";

type SectionMProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const rosterMembers = mockHouseholdSections.map(toRosterMember);

function valuesForMember(member: MockHouseholdSectionMember): SectionMFormValues {
  return fillTristateDefaults(member.sectionM ?? {});
}

type MockPersonaSwitcherProps = {
  activePersonaId: string;
  onPersonaChange: (personaId: string) => void;
};

function MockPersonaSwitcher({ activePersonaId, onPersonaChange }: MockPersonaSwitcherProps) {
  return (
    <article className="mb-6 rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 shadow-sm">
      <p className="text-xs font-bold tracking-wider text-yellow-800 uppercase">
        Developer Tool: Mock Persona Switcher
      </p>
      <p className="mt-1 text-sm text-yellow-900">
        Loads preset M01–M06 values to test row-level skip logic, M04 probe, and Z specify field.
      </p>
      <label htmlFor="section-m-persona-select" className="mt-4 block text-sm font-medium text-yellow-900">
        Select test persona
      </label>
      <select
        id="section-m-persona-select"
        value={activePersonaId}
        onChange={(event) => onPersonaChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-yellow-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
      >
        <option value="roster">From household roster</option>
        {sectionMMockPersonas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.name}
          </option>
        ))}
      </select>
    </article>
  );
}

export function SectionM({ onNext, onPrevious }: SectionMProps) {
  const [activeMember, setActiveMember] = useState<MockHouseholdSectionMember>(mockHouseholdSections[0]);
  const [activePersonaId, setActivePersonaId] = useState("roster");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SectionMFormValues>({
    resolver: zodResolver(sectionMSchema),
    defaultValues: valuesForMember(mockHouseholdSections[0]),
  });

  const watchM03 = watch("m03");
  const formValues = watch();

  const handleSelectMember = (member: { id: string }) => {
    const resolved = mockHouseholdSections.find((entry) => entry.id === member.id) ?? mockHouseholdSections[0];
    setActiveMember(resolved);
    setActivePersonaId("roster");
    reset(valuesForMember(resolved));
  };

  const handlePersonaChange = (personaId: string) => {
    const persona = sectionMMockPersonas.find((entry) => entry.id === personaId) ?? sectionMMockPersonas[0];
    setActivePersonaId(persona.id);
    reset(persona.defaultValues);
  };

  const handleM03Change = (value: SectionMFormValues["m03"]) => {
    setValue("m03", value, { shouldValidate: true });
    if (value !== "1") {
      setValue("m04", undefined, { shouldValidate: true });
    }
  };

  const onSubmit = (data: SectionMFormValues) => {
    console.log("Section M submission:", { memberId: activeMember.id, data });
    onNext?.();
  };

  return (
    <SectionFormShell
      sectionLabel="Section M: Social Protection and Assistance Programs"
      members={rosterMembers}
      activeMember={toRosterMember(activeMember)}
      onSelectMember={handleSelectMember}
    >
      <MockPersonaSwitcher activePersonaId={activePersonaId} onPersonaChange={handlePersonaChange} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Social / Health Insurance Programs
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            Now, we would like to ask if any of the household is involved in any social protection and/or
            assistance programs.
          </p>
          <SocialProtectionProgramTable
            programs={card1Programs}
            primaryPrefix="m01"
            secondaryPrefix="m02"
            primaryQuestion="M01. Is any member of your household (including OFW) a dependent/beneficiary/member?"
            secondaryQuestion="M02. In the past 12 months, did any member receive benefits/grants/assistance?"
            values={formValues}
            errors={errors}
            setValue={setValue}
          />
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Workplace Assistance
          </h2>
          <div className="space-y-6">
            <Controller
              name="m03"
              control={control}
              render={({ field }) => (
                <div>
                  <p className="mb-3 text-sm font-medium text-[#344054]">
                    M03. Does the workplace/organization of any employed household member offer health/medical
                    assistance? *
                  </p>
                  <TristateRadioGroup
                    name="m03"
                    value={field.value ?? ""}
                    error={errors.m03?.message}
                    onChange={handleM03Change}
                  />
                </div>
              )}
            />

            {watchM03 === "1" ? (
              <Controller
                name="m04"
                control={control}
                render={({ field }) => (
                  <div>
                    <p className="mb-3 text-sm font-medium text-[#344054]">
                      M04. In the past 12 months, did any member of your household receive benefits or
                      health/medical assistance from their workplace/organization? *
                    </p>
                    <TristateRadioGroup
                      name="m04"
                      value={field.value ?? ""}
                      error={errors.m04?.message}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            ) : null}
          </div>
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Social Assistance Programs
          </h2>
          <SocialProtectionProgramTable
            programs={card3Programs}
            primaryPrefix="m05"
            secondaryPrefix="m06"
            primaryQuestion="M05. In the past 12 months, is any member a beneficiary?"
            secondaryQuestion="M06. In the past 12 months, did any member receive benefits/grants/assistance?"
            values={formValues}
            errors={errors}
            setValue={setValue}
            specifyValue={watch("m05_z_specify")}
            specifyError={errors.m05_z_specify?.message}
            onSpecifyChange={(value) => setValue("m05_z_specify", value, { shouldValidate: true })}
          />
        </article>

        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionFormShell>
  );
}
