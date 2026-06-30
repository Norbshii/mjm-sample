"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  e01Options,
  e02Options,
  e07Options,
  e08Options,
  e09Options,
  e14Options,
  psicOptionGroups,
  psocOptionGroups,
  yesNoBinaryOptions,
} from "@/constants/economic";
import {
  HouseholdRoster,
  type HouseholdRosterMember,
} from "@/components/entries/HouseholdRoster";
import {
  FormInput,
  FormRadioGroup,
  FormSearchableSelect,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";

type SectionEProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const e08SalaryBasisValues = new Set(["0", "1", "2", "5"]);

const sectionESchema = z
  .object({
    e01: z.string().min(1, "E01 is required."),
    e02: z.string().optional(),
    e03: z.string().optional(),
    e04: z.string().optional(),
    e05: z.string().optional(),
    e06: z.string().optional(),
    e07: z.string().optional(),
    e08: z.string().optional(),
    e09: z.string().optional(),
    e09_specify: z.string().optional(),
    e10: z.string().optional(),
    e11: z.string().optional(),
    e12: z.string().optional(),
    e13: z.string().optional(),
    e14: z.string().optional(),
    e14_specify: z.string().optional(),
    e15: z.string().optional(),
    e16: z.string().optional(),
    e17: z.string().optional(),
    e18: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const showE02 = data.e01 === "2";
    const showCard2 = data.e01 === "1" || (showE02 && data.e02 === "1");
    const showCard3 = showE02 && (data.e02 === "2" || data.e02 === "3");

    if (showE02 && !data.e02) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "E02 is required.",
        path: ["e02"],
      });
    }

    if (showCard2) {
      const card2Required: Array<{ key: keyof typeof data; label: string }> = [
        { key: "e03", label: "E03" },
        { key: "e04", label: "E04" },
        { key: "e05", label: "E05" },
        { key: "e06", label: "E06" },
        { key: "e07", label: "E07" },
        { key: "e08", label: "E08" },
        { key: "e10", label: "E10" },
        { key: "e11", label: "E11" },
        { key: "e12", label: "E12" },
      ];

      card2Required.forEach(({ key, label }) => {
        if (!data[key]?.toString().trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${label} is required.`,
            path: [key],
          });
        }
      });

      const showE09 = data.e08 && e08SalaryBasisValues.has(data.e08);
      if (showE09 && !data.e09) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E09 is required.",
          path: ["e09"],
        });
      }

      if ((data.e09 === "6" || data.e09 === "7") && !data.e09_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify salary/wage.",
          path: ["e09_specify"],
        });
      }
    }

    if (showCard3) {
      if (!data.e13) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E13 is required.",
          path: ["e13"],
        });
      }

      if (data.e13 === "2" && !data.e14) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E14 is required.",
          path: ["e14"],
        });
      }

      if ((data.e14 === "10" || data.e14 === "99") && !data.e14_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify reason.",
          path: ["e14_specify"],
        });
      }

      if (!data.e15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E15 is required.",
          path: ["e15"],
        });
      }

      if (!data.e16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "E16 is required.",
          path: ["e16"],
        });
      }
    }

    if (!data.e17) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "E17 is required.",
        path: ["e17"],
      });
    }

    if (!data.e18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "E18 is required.",
        path: ["e18"],
      });
    }
  });

export type SectionEFormValues = z.infer<typeof sectionESchema>;

type HouseholdMemberE = HouseholdRosterMember<Partial<SectionEFormValues>>;

const emptyFormValues: SectionEFormValues = {
  e01: "",
  e02: "",
  e03: "",
  e04: "",
  e05: "",
  e06: "",
  e07: "",
  e08: "",
  e09: "",
  e09_specify: "",
  e10: "",
  e11: "",
  e12: "",
  e13: "",
  e14: "",
  e14_specify: "",
  e15: "",
  e16: "",
  e17: "",
  e18: "",
};

const mockHousehold: HouseholdMemberE[] = [
  {
    id: "m1",
    name: "MARIA SANTOS",
    relationship: "01 Head",
    age: 45,
    defaultValues: { e01: "1" },
    status: "completed",
  },
  {
    id: "m2",
    name: "JUAN SANTOS",
    relationship: "02 Spouse",
    age: 48,
    defaultValues: { e01: "2", e02: "2", e13: "1" },
    status: "pending",
  },
  {
    id: "m3",
    name: "LIZA SANTOS",
    relationship: "03 Daughter",
    age: 21,
    defaultValues: { e01: "2", e02: "2", e13: "2", e14: "09" },
    status: "pending",
  },
  {
    id: "m4",
    name: "BEN SANTOS",
    relationship: "04 Son",
    age: 17,
    defaultValues: { e01: "1", e08: "6" },
    status: "pending",
  },
  {
    id: "m5",
    name: "LEO SANTOS",
    relationship: "05 Son",
    age: 2,
    defaultValues: {},
    status: "pending",
  },
];

function valuesForMember(member: HouseholdMemberE): SectionEFormValues {
  return { ...emptyFormValues, ...member.defaultValues };
}

function SectionEBreadcrumbs() {
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
          <span className="font-semibold text-[#101828]">Section E: Economic</span>
        </li>
      </ol>
    </nav>
  );
}

export function SectionE({ onNext, onPrevious }: SectionEProps) {
  const [activeMember, setActiveMember] = useState<HouseholdMemberE>(mockHousehold[0]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SectionEFormValues>({
    resolver: zodResolver(sectionESchema),
    defaultValues: valuesForMember(mockHousehold[0]),
  });

  const watchE01 = watch("e01");
  const watchE02 = watch("e02");
  const watchE08 = watch("e08");
  const watchE09 = watch("e09");
  const watchE13 = watch("e13");
  const watchE14 = watch("e14");

  const showE02 = watchE01 === "2";
  const showCard2 = watchE01 === "1" || (showE02 && watchE02 === "1");
  const showCard3 = showE02 && (watchE02 === "2" || watchE02 === "3");
  const showE09 = Boolean(watchE08 && e08SalaryBasisValues.has(watchE08));
  const showE09Specify = watchE09 === "6" || watchE09 === "7";
  const showE14 = watchE13 === "2";
  const showE14Specify = watchE14 === "10" || watchE14 === "99";

  const sectionApplicable = activeMember.age >= 15;

  const handleSelectMember = (member: HouseholdMemberE) => {
    setActiveMember(member);
    reset(valuesForMember(member));
  };

  const onSubmit = (data: SectionEFormValues) => {
    console.log("Section E submission:", data);
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
          <SectionEBreadcrumbs />

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <label htmlFor="section-e-member-name" className="text-sm font-medium text-[#344054]">
              Member Name
            </label>
            <input
              id="section-e-member-name"
              type="text"
              readOnly
              value={activeMember.name}
              className="mt-2 h-11 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-[#F9FAFB] px-3 text-sm font-medium text-[#101828]"
            />
          </div>

          {!sectionApplicable ? (
            <article className="mb-6 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7] text-[#667085]">
                <Briefcase size={24} />
              </div>
              <h2 className="text-lg font-semibold text-[#101828]">Section E not applicable</h2>
              <p className="mt-2 text-sm text-[#475467]">
                {activeMember.name} is under 15 years old. Economic characteristics are not collected
                for this household member.
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
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Work Status</h2>
          <div className="space-y-6">
            <Controller
              name="e01"
              control={control}
              render={({ field }) => (
                <FormRadioGroup
                  id="e01"
                  label="E01. Did you work for pay, profit, or family gain during the past week?"
                  required
                  orientation="horizontal"
                  value={field.value ?? ""}
                  options={e01Options}
                  error={errors.e01?.message}
                  onChange={field.onChange}
                />
              )}
            />

            {showE02 ? (
              <Controller
                name="e02"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="e02"
                    label="E02. Did you have a job or business during the past week?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={e02Options}
                    error={errors.e02?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}
          </div>
        </article>

        {showCard2 ? (
          <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Job Details</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="e03"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="e03"
                    label="E03. Name of establishment / employer"
                    required
                    value={field.value ?? ""}
                    error={errors.e03?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e04"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="e04"
                    label="E04. Kind of business / industry (description)"
                    required
                    value={field.value ?? ""}
                    error={errors.e04?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e05"
                control={control}
                render={({ field }) => (
                  <FormSearchableSelect
                    id="e05"
                    label="E05. PSOC — Occupation code"
                    required
                    value={field.value ?? ""}
                    placeholder="Search PSOC code..."
                    groups={psocOptionGroups}
                    error={errors.e05?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e06"
                control={control}
                render={({ field }) => (
                  <FormSearchableSelect
                    id="e06"
                    label="E06. PSIC — Industry code"
                    required
                    value={field.value ?? ""}
                    placeholder="Search PSIC code..."
                    groups={psicOptionGroups}
                    error={errors.e06?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e07"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    id="e07"
                    label="E07. Nature of employment"
                    required
                    value={field.value ?? ""}
                    placeholder="Select nature..."
                    options={e07Options}
                    error={errors.e07?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e08"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    id="e08"
                    label="E08. Class of worker"
                    required
                    value={field.value ?? ""}
                    placeholder="Select class..."
                    options={e08Options}
                    error={errors.e08?.message}
                    onChange={field.onChange}
                  />
                )}
              />

              {showE09 ? (
                <div className="md:col-span-2 space-y-4">
                  <Controller
                    name="e09"
                    control={control}
                    render={({ field }) => (
                      <FormSelect
                        id="e09"
                        label="E09. Basis of payment / compensation"
                        required
                        value={field.value ?? ""}
                        placeholder="Select basis..."
                        options={e09Options}
                        error={errors.e09?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {showE09Specify ? (
                    <Controller
                      name="e09_specify"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          id="e09-specify"
                          label="Please specify salary/wage"
                          required
                          value={field.value ?? ""}
                          error={errors.e09_specify?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              ) : null}

              <Controller
                name="e10"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="e10"
                    label="E10. Member of workers' association / union?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.e10?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e11"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="e11"
                    type="number"
                    label="E11. Total hours worked per week"
                    required
                    value={field.value ?? ""}
                    placeholder="e.g. 40"
                    error={errors.e11?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="md:col-span-2">
                <Controller
                  name="e12"
                  control={control}
                  render={({ field }) => (
                    <FormRadioGroup
                      id="e12"
                      label="E12. Want more hours of work than currently worked?"
                      required
                      orientation="horizontal"
                      value={field.value ?? ""}
                      options={yesNoBinaryOptions}
                      error={errors.e12?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </article>
        ) : null}

        {showCard3 ? (
          <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Looking for Work</h2>
            <div className="space-y-6">
              <Controller
                name="e13"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="e13"
                    label="E13. Currently looking for work?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.e13?.message}
                    onChange={field.onChange}
                  />
                )}
              />

              {showE14 ? (
                <div className="space-y-4">
                  <Controller
                    name="e14"
                    control={control}
                    render={({ field }) => (
                      <FormSelect
                        id="e14"
                        label="E14. Main reason not looking for work"
                        required
                        value={field.value ?? ""}
                        placeholder="Select reason..."
                        options={e14Options}
                        error={errors.e14?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {showE14Specify ? (
                    <Controller
                      name="e14_specify"
                      control={control}
                      render={({ field }) => (
                        <FormInput
                          id="e14-specify"
                          label="Please specify reason"
                          required
                          value={field.value ?? ""}
                          error={errors.e14_specify?.message}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              ) : null}

              <Controller
                name="e15"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="e15"
                    label="E15. Available to start work within two weeks?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.e15?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="e16"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="e16"
                    label="E16. Willing to take a job away from usual residence?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.e16?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </article>
        ) : null}

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Agricultural Sectors</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Controller
              name="e17"
              control={control}
              render={({ field }) => (
                <FormRadioGroup
                  id="e17"
                  label="E17. Engaged in crop farming?"
                  required
                  orientation="horizontal"
                  value={field.value ?? ""}
                  options={yesNoBinaryOptions}
                  error={errors.e17?.message}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="e18"
              control={control}
              render={({ field }) => (
                <FormRadioGroup
                  id="e18"
                  label="E18. Engaged in livestock/poultry raising?"
                  required
                  orientation="horizontal"
                  value={field.value ?? ""}
                  options={yesNoBinaryOptions}
                  error={errors.e18?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </article>

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
