"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, GraduationCap, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  d03OptionGroups,
  d04Options,
  d06Options,
  yesNoBinaryOptions,
} from "@/constants/education";
import {
  FormCheckboxGroup,
  FormInput,
  FormRadioGroup,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";

export type EducationMember = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  relationship?: string;
};

type SectionDProps = {
  members?: EducationMember[];
  member?: EducationMember;
  onNext?: () => void;
  onPrevious?: () => void;
};

const memberSectionDBaseSchema = z.object({
  d01: z.string().optional(),
  d02: z.string().optional(),
  d03: z.string().optional(),
  d04: z.array(z.string()).optional(),
  d05: z.string().optional(),
  d06: z.string().optional(),
  d06_specify: z.string().optional(),
  d07: z.string().optional(),
  d08: z.string().optional(),
  d09: z.string().optional(),
});

type MemberSectionDValues = z.infer<typeof memberSectionDBaseSchema>;

type SectionDFormValues = {
  sectionD: Record<string, MemberSectionDValues>;
};

function createSectionDSchema(members: EducationMember[]) {
  const ageById = Object.fromEntries(members.map((member) => [member.id, member.age]));

  return z
    .object({
      sectionD: z.record(z.string(), memberSectionDBaseSchema),
    })
    .superRefine((data, ctx) => {
      for (const [memberId, values] of Object.entries(data.sectionD)) {
        const age = ageById[memberId] ?? 0;
        if (age < 3) continue;

        const prefix = ["sectionD", memberId] as const;

        if (!values.d01) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "D01 is required.",
            path: [...prefix, "d01"],
          });
          continue;
        }

        const inSchool = values.d01 === "1";
        const outOfSchool = values.d01 === "2";

        if (inSchool) {
          if (!values.d02) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D02 is required.",
              path: [...prefix, "d02"],
            });
          }
          if (!values.d03) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D03 is required.",
              path: [...prefix, "d03"],
            });
          }
          if (age >= 5 && !values.d05) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D05 is required.",
              path: [...prefix, "d05"],
            });
          }
        }

        if (outOfSchool && age >= 3 && age <= 24) {
          if (!values.d06) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D06 is required.",
              path: [...prefix, "d06"],
            });
          }
          if (values.d06 === "99" && !values.d06_specify?.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please specify the reason.",
              path: [...prefix, "d06_specify"],
            });
          }
        }

        if (age >= 15) {
          if (!values.d07) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D07 is required.",
              path: [...prefix, "d07"],
            });
          }
          if (!values.d08) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D08 is required.",
              path: [...prefix, "d08"],
            });
          }
          const hideD09 = values.d07 === "2" && values.d08 === "2";
          if (!hideD09 && !values.d09) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "D09 is required.",
              path: [...prefix, "d09"],
            });
          }
        }
      }
    });
}

const defaultMember: EducationMember = {
  id: "mock-01",
  firstName: "Maria",
  lastName: "Santos",
  age: 25,
  sex: "Female",
  relationship: "01 Head",
};

type MockPersona = {
  id: string;
  name: string;
  age: number;
  defaultD01: string;
};

const mockPersonas: MockPersona[] = [
  { id: "p1", name: "Baby Leo", age: 2, defaultD01: "2" },
  { id: "p2", name: "Mia the Grader", age: 10, defaultD01: "1" },
  { id: "p3", name: "Kuya Ben (OSY)", age: 17, defaultD01: "2" },
  { id: "p4", name: "Tito Jun", age: 45, defaultD01: "2" },
  { id: "p5", name: "Ate Sarah", age: 21, defaultD01: "1" },
];

function emptyMemberValues(d01 = ""): MemberSectionDValues {
  return {
    d01,
    d02: "",
    d03: "",
    d04: [],
    d05: "",
    d06: "",
    d06_specify: "",
    d07: "",
    d08: "",
    d09: "",
  };
}

function buildDefaultValues(members: EducationMember[]): SectionDFormValues {
  return {
    sectionD: members.reduce<Record<string, MemberSectionDValues>>((accumulator, member) => {
      accumulator[member.id] = {
        d01: "",
        d02: "",
        d03: "",
        d04: [],
        d05: "",
        d06: "",
        d06_specify: "",
        d07: "",
        d08: "",
        d09: "",
      };
      return accumulator;
    }, {}),
  };
}

type MockPersonaSwitcherProps = {
  activePersonaId: string;
  onPersonaChange: (personaId: string) => void;
};

function MockPersonaSwitcher({ activePersonaId, onPersonaChange }: MockPersonaSwitcherProps) {
  return (
    <article className="mb-6 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 p-4 shadow-sm">
      <p className="text-xs font-bold tracking-wider text-amber-800 uppercase">
        Developer Tool — Mock Persona Switcher
      </p>
      <p className="mt-1 text-sm text-amber-900">
        Temporarily overrides member age and D01 for Section D skip-logic testing.
      </p>
      <label htmlFor="mock-persona-select" className="mt-4 block text-sm font-medium text-amber-900">
        Select test persona
      </label>
      <select
        id="mock-persona-select"
        value={activePersonaId}
        onChange={(event) => onPersonaChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-amber-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
      >
        {mockPersonas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.name} (Age {persona.age}, D01 default: {persona.defaultD01 === "1" ? "Yes" : "No"})
          </option>
        ))}
      </select>
    </article>
  );
}

function SectionDBreadcrumbs() {
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
          <span className="font-semibold text-[#101828]">Section D: Education</span>
        </li>
      </ol>
    </nav>
  );
}

type EducationGradeSelectProps = {
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function EducationGradeSelect({ id, value, error, onChange }: EducationGradeSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[#344054]">
        D03. Current Grade / Year Level *
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 ${
          error
            ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
            : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
        }`}
      >
        <option value="">Select grade / year level...</option>
        {d03OptionGroups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {error ? <p className="text-xs text-[#D92D20]">{error}</p> : null}
    </div>
  );
}

export function SectionD({ members, member, onNext, onPrevious }: SectionDProps) {
  const roster = members?.length ? members : member ? [member] : [defaultMember];
  const [selectedMemberId, setSelectedMemberId] = useState(roster[0]?.id ?? defaultMember.id);
  const [activePersona, setActivePersona] = useState<MockPersona>(mockPersonas[1]);

  const rosterForValidation = useMemo(
    () =>
      roster.map((rosterMember) =>
        rosterMember.id === selectedMemberId
          ? { ...rosterMember, age: activePersona.age }
          : rosterMember,
      ),
    [roster, selectedMemberId, activePersona.age],
  );

  const schema = useMemo(() => createSectionDSchema(rosterForValidation), [rosterForValidation]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SectionDFormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(roster),
  });

  const activeMember = roster.find((item) => item.id === selectedMemberId) ?? roster[0];
  const memberPrefix = `sectionD.${selectedMemberId}` as const;
  const memberErrors = errors.sectionD?.[selectedMemberId];

  const watchD01 = watch(`${memberPrefix}.d01`);
  const watchD06 = watch(`${memberPrefix}.d06`);
  const watchD07 = watch(`${memberPrefix}.d07`);
  const watchD08 = watch(`${memberPrefix}.d08`);

  const age = activePersona.age;
  const displayName = activePersona.name;
  const sectionApplicable = age >= 3;
  const inSchool = watchD01 === "1";
  const outOfSchool = watchD01 === "2";

  const showD02D03 = inSchool;
  const showD04 = inSchool && age >= 5 && age <= 24;
  const showD05 = inSchool && age >= 5;
  const showCard2 = showD04 || showD05;
  const showOutOfSchoolCard = outOfSchool && age >= 3 && age <= 24;
  const showTvetsCard = age >= 15;
  const showD09 = showTvetsCard && !(watchD07 === "2" && watchD08 === "2");

  const handlePersonaChange = (personaId: string) => {
    const persona = mockPersonas.find((item) => item.id === personaId) ?? mockPersonas[1];
    setActivePersona(persona);

    const currentValues = getValues();
    reset({
      sectionD: {
        ...currentValues.sectionD,
        [selectedMemberId]: emptyMemberValues(persona.defaultD01),
      },
    });
  };

  const onSubmit = (data: SectionDFormValues) => {
    console.log("Section D submission:", data);
    onNext?.();
  };

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
        <aside className="md:col-span-1">
          <p className="mb-4 px-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Household Roster
          </p>
          <div className="space-y-2">
            {roster.map((rosterMember) => {
              const isActive = selectedMemberId === rosterMember.id;
              const rosterName =
                [rosterMember.firstName, rosterMember.lastName].filter(Boolean).join(" ").trim() ||
                "Household Member";

              return (
                <button
                  key={rosterMember.id}
                  type="button"
                  onClick={() => setSelectedMemberId(rosterMember.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border-l-[3px] p-4 text-left transition-all ${
                    isActive
                      ? "border-[#175CD3] bg-[#EFF8FF] shadow-sm"
                      : "border-transparent bg-white hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isActive ? "bg-[#175CD3] text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <User size={20} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-semibold ${
                        isActive ? "text-[#175CD3]" : "text-gray-900"
                      }`}
                    >
                      {rosterName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {rosterMember.relationship ?? "Member"} • Age {rosterMember.age}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="md:col-span-3">
          <SectionDBreadcrumbs />
          <MockPersonaSwitcher
            activePersonaId={activePersona.id}
            onPersonaChange={handlePersonaChange}
          />

          {!sectionApplicable ? (
            <article className="mb-6 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7] text-[#667085]">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-lg font-semibold text-[#101828]">Education section not applicable</h2>
              <p className="mt-2 text-sm text-[#475467]">
                Member is under 3 years old. Education section is not applicable for {displayName}.
              </p>
              <footer className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-6 text-sm font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9]"
                >
                  Next Section
                  <ChevronRight size={16} />
                </button>
              </footer>
            </article>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">Current Education</h2>
                <div className="space-y-6">
                  <Controller
                    name={`${memberPrefix}.d01`}
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        id={`${selectedMemberId}-d01`}
                        label={`D01. Is ${displayName} currently attending school?`}
                        required
                        orientation="horizontal"
                        value={field.value ?? ""}
                        options={yesNoBinaryOptions}
                        error={memberErrors?.d01?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {showD02D03 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Controller
                        name={`${memberPrefix}.d02`}
                        control={control}
                        render={({ field }) => (
                          <FormRadioGroup
                            id={`${selectedMemberId}-d02`}
                            label="D02. Currently enrolled in formal school?"
                            required
                            orientation="horizontal"
                            value={field.value ?? ""}
                            options={yesNoBinaryOptions}
                            error={memberErrors?.d02?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <Controller
                        name={`${memberPrefix}.d03`}
                        control={control}
                        render={({ field }) => (
                          <EducationGradeSelect
                            id={`${selectedMemberId}-d03`}
                            value={field.value ?? ""}
                            error={memberErrors?.d03?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  ) : null}
                </div>
              </article>

              {showCard2 ? (
                <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">
                    Alternative &amp; Special Learning
                  </h2>
                  <div className="space-y-6">
                    {showD04 ? (
                      <Controller
                        name={`${memberPrefix}.d04`}
                        control={control}
                        render={({ field }) => (
                          <FormCheckboxGroup
                            id={`${selectedMemberId}-d04`}
                            label="D04. Alternative learning program (select all that apply)"
                            values={field.value ?? []}
                            options={d04Options}
                            columns={2}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ) : null}

                    {showD05 ? (
                      <Controller
                        name={`${memberPrefix}.d05`}
                        control={control}
                        render={({ field }) => (
                          <FormRadioGroup
                            id={`${selectedMemberId}-d05`}
                            label="D05. Attending ALS or non-formal education?"
                            required
                            orientation="horizontal"
                            value={field.value ?? ""}
                            options={yesNoBinaryOptions}
                            error={memberErrors?.d05?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ) : null}
                  </div>
                </article>
              ) : null}

              {showOutOfSchoolCard ? (
                <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">Out of School</h2>
                  <div className="space-y-4">
                    <Controller
                      name={`${memberPrefix}.d06`}
                      control={control}
                      render={({ field }) => (
                        <FormSelect
                          id={`${selectedMemberId}-d06`}
                          label="D06. Main reason for not attending school"
                          required
                          value={field.value ?? ""}
                          placeholder="Select reason..."
                          options={d06Options}
                          error={memberErrors?.d06?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {watchD06 === "99" ? (
                      <Controller
                        name={`${memberPrefix}.d06_specify`}
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            id={`${selectedMemberId}-d06-specify`}
                            label="Specify other reason"
                            required
                            value={field.value ?? ""}
                            placeholder="Enter reason..."
                            error={memberErrors?.d06_specify?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ) : null}
                  </div>
                </article>
              ) : null}

              {showTvetsCard ? (
                <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-gray-900">Technical / Vocational</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Controller
                      name={`${memberPrefix}.d07`}
                      control={control}
                      render={({ field }) => (
                        <FormRadioGroup
                          id={`${selectedMemberId}-d07`}
                          label="D07. Completed TVET / technical-vocational course?"
                          required
                          orientation="horizontal"
                          value={field.value ?? ""}
                          options={yesNoBinaryOptions}
                          error={memberErrors?.d07?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      name={`${memberPrefix}.d08`}
                      control={control}
                      render={({ field }) => (
                        <FormRadioGroup
                          id={`${selectedMemberId}-d08`}
                          label="D08. Currently enrolled in TVET?"
                          required
                          orientation="horizontal"
                          value={field.value ?? ""}
                          options={yesNoBinaryOptions}
                          error={memberErrors?.d08?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {showD09 ? (
                      <div className="md:col-span-2">
                        <Controller
                          name={`${memberPrefix}.d09`}
                          control={control}
                          render={({ field }) => (
                            <FormRadioGroup
                              id={`${selectedMemberId}-d09`}
                              label="D09. Has National Certificate (NC) or Certificate of Competency (COC)?"
                              required
                              orientation="horizontal"
                              value={field.value ?? ""}
                              options={yesNoBinaryOptions}
                              error={memberErrors?.d09?.message}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                </article>
              ) : null}

              <footer className="flex items-center justify-between border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-6 text-sm font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9]"
                >
                  Next Section
                  <ChevronRight size={16} />
                </button>
              </footer>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
