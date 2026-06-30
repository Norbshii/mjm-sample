"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  HouseholdRoster,
  type HouseholdRosterMember,
} from "@/components/entries/HouseholdRoster";
import {
  FormCheckboxGroup,
  FormInput,
  FormRadioGroup,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";
import {
  f03FacilityCategories,
  f04ReasonOptions,
  f06Options,
  f09SexOptions,
  yesNoBinaryOptions,
} from "@/constants/health";

type SectionFProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const deceasedEntrySchema = z.object({
  f08: z.string().optional(),
  f09: z.string().optional(),
});

const sectionFSchema = z
  .object({
    f01: z.string().min(1, "F01 is required."),
    f02: z.string().optional(),
    f03: z.array(z.string()),
    f03_z_specify: z.string().optional(),
    f04: z.string().optional(),
    f04_specify: z.string().optional(),
    f05: z.string().optional(),
    f06: z.string().optional(),
    f07: z.string().optional(),
    deceasedEntries: z.array(deceasedEntrySchema),
  })
  .superRefine((data, ctx) => {
    const showIllnessFollowUp = data.f01 === "1";
    const showF03 = showIllnessFollowUp && data.f02 === "1";
    const showF04 = showIllnessFollowUp && data.f02 === "2";

    if (showIllnessFollowUp && !data.f02) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "F02 is required.",
        path: ["f02"],
      });
    }

    if (showF03) {
      if (data.f03.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Select at least one medical facility (F03).",
          path: ["f03"],
        });
      }
      if (data.f03.includes("Z") && !data.f03_z_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify other non-medical facility.",
          path: ["f03_z_specify"],
        });
      }
    }

    if (showF04) {
      if (!data.f04) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "F04 is required.",
          path: ["f04"],
        });
      }
      if (data.f04 === "9" && !data.f04_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify reason.",
          path: ["f04_specify"],
        });
      }
    }

    if (data.f06 === "1") {
      if (!data.f07?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "F07 is required.",
          path: ["f07"],
        });
      }

      const count = Number.parseInt(data.f07 ?? "", 10);
      if (!Number.isFinite(count) || count < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid number of deceased children (F07).",
          path: ["f07"],
        });
      } else {
        data.deceasedEntries.forEach((entry, index) => {
          if (!entry.f08?.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `F08 is required for deceased child ${index + 1}.`,
              path: ["deceasedEntries", index, "f08"],
            });
          }
          if (!entry.f09) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `F09 is required for deceased child ${index + 1}.`,
              path: ["deceasedEntries", index, "f09"],
            });
          }
        });

        if (data.deceasedEntries.length !== count) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Number of deceased child records must match F07.",
            path: ["deceasedEntries"],
          });
        }
      }
    }
  });

export type SectionFFormValues = z.infer<typeof sectionFSchema>;

type HouseholdMemberF = HouseholdRosterMember<Partial<SectionFFormValues>>;

const emptyFormValues: SectionFFormValues = {
  f01: "",
  f02: "",
  f03: [],
  f03_z_specify: "",
  f04: "",
  f04_specify: "",
  f05: "",
  f06: "",
  f07: "",
  deceasedEntries: [],
};

const mockHousehold: HouseholdMemberF[] = [
  {
    id: "f-m1",
    name: "LEO SANTOS",
    relationship: "05 Son",
    age: 2,
    defaultValues: { f01: "2", f05: "1" },
    status: "pending",
  },
  {
    id: "f-m2",
    name: "MARIA SANTOS",
    relationship: "01 Head",
    age: 45,
    defaultValues: {
      f01: "1",
      f02: "1",
      f03: ["A", "E", "J"],
    },
    status: "completed",
  },
  {
    id: "f-m3",
    name: "JUAN SANTOS",
    relationship: "02 Spouse",
    age: 48,
    defaultValues: {
      f01: "2",
      f06: "1",
      f07: "2",
      deceasedEntries: [
        { f08: "3", f09: "1" },
        { f08: "14", f09: "2" },
      ],
    },
    status: "pending",
  },
];

function valuesForMember(member: HouseholdMemberF): SectionFFormValues {
  return {
    ...emptyFormValues,
    ...member.defaultValues,
    f03: member.defaultValues.f03 ?? [],
    deceasedEntries: member.defaultValues.deceasedEntries ?? [],
  };
}

function SectionFBreadcrumbs() {
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
          <span className="font-semibold text-[#101828]">Section F: Health</span>
        </li>
      </ol>
    </nav>
  );
}

export function SectionF({ onNext, onPrevious }: SectionFProps) {
  const [activeMember, setActiveMember] = useState<HouseholdMemberF>(mockHousehold[0]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SectionFFormValues>({
    resolver: zodResolver(sectionFSchema),
    defaultValues: valuesForMember(mockHousehold[0]),
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "deceasedEntries",
  });

  const watchF01 = watch("f01");
  const watchF02 = watch("f02");
  const watchF03 = watch("f03");
  const watchF04 = watch("f04");
  const watchF06 = watch("f06");
  const watchF07 = watch("f07");

  const showIllnessFollowUp = watchF01 === "1";
  const showF03 = showIllnessFollowUp && watchF02 === "1";
  const showF04 = showIllnessFollowUp && watchF02 === "2";
  const showF03ZSpecify = showF03 && (watchF03 ?? []).includes("Z");
  const showF04Specify = showF04 && watchF04 === "9";
  const showCard2 = activeMember.age >= 0 && activeMember.age <= 5;
  const showCard3 = activeMember.age > 5;
  const showMortalityFollowUp = showCard3 && watchF06 === "1";
  const hideMortalityDetails = watchF06 === "2" || watchF06 === "8";

  useEffect(() => {
    if (!showMortalityFollowUp) {
      replace([]);
      return;
    }

    const count = Number.parseInt(watchF07 ?? "", 10);
    if (!Number.isFinite(count) || count < 1) {
      replace([]);
      return;
    }

    const current = getValues("deceasedEntries") ?? [];
    const next = Array.from({ length: count }, (_, index) => current[index] ?? { f08: "", f09: "" });
    replace(next);
  }, [showMortalityFollowUp, watchF07, replace, getValues]);

  const handleSelectMember = (member: HouseholdMemberF) => {
    setActiveMember(member);
    reset(valuesForMember(member));
  };

  const onSubmit = (data: SectionFFormValues) => {
    console.log("Section F submission:", data);
    onNext?.();
  };

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
        <aside className="md:col-span-1">
          <HouseholdRoster
            members={mockHousehold}
            activeMember={activeMember}
            onSelectMember={handleSelectMember}
          />
        </aside>

        <div className="md:col-span-3">
          <SectionFBreadcrumbs />

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <label htmlFor="section-f-member-name" className="text-sm font-medium text-[#344054]">
              Member Name
            </label>
            <input
              id="section-f-member-name"
              type="text"
              readOnly
              value={activeMember.name}
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-[#F9FAFB] px-3 text-sm font-medium text-[#101828]"
            />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">Illness / Sickness / Injury</h2>
              <div className="space-y-6">
                <Controller
                  name="f01"
                  control={control}
                  render={({ field }) => (
                    <FormRadioGroup
                      id="f01"
                      label="F01. Did you experience any illness, sickness, or injury in the past 6 months?"
                      required
                      orientation="horizontal"
                      value={field.value ?? ""}
                      options={yesNoBinaryOptions}
                      error={errors.f01?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                {showIllnessFollowUp ? (
                  <Controller
                    name="f02"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        id="f02"
                        label="F02. Did you consult at a health facility for this illness/sickness/injury?"
                        required
                        orientation="horizontal"
                        value={field.value ?? ""}
                        options={yesNoBinaryOptions}
                        error={errors.f02?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                ) : null}

                {showF03 ? (
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-[#344054]">
                      F03. Where did you consult or seek treatment? (Select all that apply) *
                    </p>
                    {f03FacilityCategories.map((category) => (
                      <Controller
                        key={category.id}
                        name="f03"
                        control={control}
                        render={({ field }) => (
                          <FormCheckboxGroup
                            id={`f03-${category.id}`}
                            label={category.title}
                            values={field.value ?? []}
                            options={category.options}
                            columns={4}
                            error={category.id === "public" ? errors.f03?.message : undefined}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ))}
                    {showF03ZSpecify ? (
                      <Controller
                        name="f03_z_specify"
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            id="f03-z-specify"
                            label="Specify other non-medical facility"
                            required
                            value={field.value ?? ""}
                            error={errors.f03_z_specify?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ) : null}
                  </div>
                ) : null}

                {showF04 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Controller
                      name="f04"
                      control={control}
                      render={({ field }) => (
                        <FormSelect
                          id="f04"
                          label="F04. Main reason for not consulting a health facility"
                          required
                          value={field.value ?? ""}
                          options={f04ReasonOptions}
                          error={errors.f04?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {showF04Specify ? (
                      <Controller
                        name="f04_specify"
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            id="f04-specify"
                            label="Specify reason"
                            required
                            value={field.value ?? ""}
                            error={errors.f04_specify?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

            {showCard2 ? (
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">Operation Timbang Plus</h2>
                <Controller
                  name="f05"
                  control={control}
                  render={({ field }) => (
                    <FormRadioGroup
                      id="f05"
                      label="F05. Is the child a beneficiary of Operation Timbang Plus (OTP)?"
                      orientation="horizontal"
                      value={field.value ?? ""}
                      options={yesNoBinaryOptions}
                      error={errors.f05?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
              </article>
            ) : null}

            {showCard3 ? (
              <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">Under-5 Mortality</h2>
                <div className="space-y-6">
                  <Controller
                    name="f06"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        id="f06"
                        label="F06. Did any child under 5 years old in this household die in the last 12 months?"
                        required
                        orientation="horizontal"
                        value={field.value ?? ""}
                        options={f06Options}
                        error={errors.f06?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {showMortalityFollowUp ? (
                    <>
                      <Controller
                        name="f07"
                        control={control}
                        render={({ field }) => (
                          <FormInput
                            id="f07"
                            label="F07. Number of children under 5 who died"
                            required
                            type="number"
                            value={field.value ?? ""}
                            error={errors.f07?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      {fields.map((entry, index) => (
                        <article
                          key={entry.id}
                          className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-5"
                        >
                          <h3 className="mb-4 text-sm font-semibold text-[#344054]">
                            Deceased child {index + 1}
                          </h3>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Controller
                              name={`deceasedEntries.${index}.f08`}
                              control={control}
                              render={({ field }) => (
                                <FormInput
                                  id={`f08-${index}`}
                                  label="F08. Age in months at death"
                                  required
                                  type="number"
                                  value={field.value ?? ""}
                                  error={errors.deceasedEntries?.[index]?.f08?.message}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            <Controller
                              name={`deceasedEntries.${index}.f09`}
                              control={control}
                              render={({ field }) => (
                                <FormRadioGroup
                                  id={`f09-${index}`}
                                  label="F09. Sex of deceased child"
                                  required
                                  orientation="horizontal"
                                  value={field.value ?? ""}
                                  options={f09SexOptions}
                                  error={errors.deceasedEntries?.[index]?.f09?.message}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </article>
                      ))}
                    </>
                  ) : hideMortalityDetails ? null : null}
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
        </div>
      </div>
    </div>
  );
}
