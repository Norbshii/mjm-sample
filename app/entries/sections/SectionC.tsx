"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Globe, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormRadioGroup,
  FormSearchableSelect,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";

export type MigrationMember = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  relationship?: string;
};

type SectionCProps = {
  members?: MigrationMember[];
  member?: MigrationMember;
  onNext?: () => void;
  onPrevious?: () => void;
};

const c01Options = [
  { label: "1 Yes, Filipino citizen", value: "1" },
  { label: "2 Yes, Filipino with dual citizenship", value: "2" },
  { label: "3 No, Foreign citizen", value: "3" },
  { label: "4 No Citizenship", value: "4" },
  { label: "5 Undetermined nationality", value: "5" },
  { label: "8 Don't know", value: "8" },
];

const c02Options = [
  { label: "1 Yes, OFW with contract", value: "1" },
  { label: "2 Yes, Other OFW with no contract", value: "2" },
  { label: "3 Yes, Student abroad", value: "3" },
  { label: "4 Yes, Tourist", value: "4" },
  { label: "5 Yes, Other Overseas Filipino not elsewhere classified", value: "5" },
  { label: "6 No, Resident (Philippines)", value: "6" },
];

const c03Options = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
  { label: "8 Don't Know", value: "8" },
];

const c06Options = [
  { label: "1 No", value: "1" },
  { label: "2 Yes, natural calamities", value: "2" },
  { label: "3 Yes, man-made disaster/event", value: "3" },
  { label: "4 Yes, peace and order", value: "4" },
  { label: "5 Yes, refugee/asylum seeker", value: "5" },
  { label: "6 Yes, relocation due to other reasons", value: "6" },
  { label: "8 Don't know", value: "8" },
];

const monthOptions = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

// TODO: Hook up PSGC API
const provinceOptions = [
  { label: "Bulacan", value: "PH-BUL" },
  { label: "Pampanga", value: "PH-PAM" },
  { label: "Metro Manila", value: "PH-NCR" },
];

const cityOptionsByProvince: Record<string, { label: string; value: string }[]> = {
  "PH-BUL": [
    { label: "Malolos City", value: "PH-BUL-MAL" },
    { label: "San Jose del Monte City", value: "PH-BUL-SJM" },
  ],
  "PH-PAM": [
    { label: "Angeles City", value: "PH-PAM-ANG" },
    { label: "San Fernando City", value: "PH-PAM-SF" },
  ],
  "PH-NCR": [
    { label: "Quezon City", value: "PH-NCR-QC" },
    { label: "Manila City", value: "PH-NCR-MNL" },
  ],
};

const barangayOptionsByCity: Record<string, { label: string; value: string }[]> = {
  "PH-BUL-MAL": [
    { label: "Barangay San Gabriel", value: "BRGY-SG" },
    { label: "Barangay San Vicente", value: "BRGY-SV" },
  ],
  "PH-BUL-SJM": [
    { label: "Barangay Muzon", value: "BRGY-MZ" },
    { label: "Barangay Tungkong Mangga", value: "BRGY-TM" },
  ],
  "PH-PAM-ANG": [
    { label: "Barangay Balibago", value: "BRGY-BAL" },
    { label: "Barangay Cutcut", value: "BRGY-CUT" },
  ],
  "PH-PAM-SF": [
    { label: "Barangay Dolores", value: "BRGY-DOL" },
    { label: "Barangay San Agustin", value: "BRGY-SA" },
  ],
  "PH-NCR-QC": [
    { label: "Barangay Commonwealth", value: "BRGY-CW" },
    { label: "Barangay Batasan Hills", value: "BRGY-BH" },
  ],
  "PH-NCR-MNL": [
    { label: "Barangay Ermita", value: "BRGY-ERM" },
    { label: "Barangay Sampaloc", value: "BRGY-SAM" },
  ],
};

const countryGroups = [
  {
    label: "Common Destinations",
    options: [
      { label: "United States", value: "USA" },
      { label: "Canada", value: "CAN" },
      { label: "Japan", value: "JPN" },
      { label: "Singapore", value: "SGP" },
      { label: "United Arab Emirates", value: "ARE" },
      { label: "Saudi Arabia", value: "SAU" },
    ],
  },
];

const memberSectionCBaseSchema = z.object({
  c01: z.string().min(1, "C01 is required."),
  c02: z.string().optional(),
  c03: z.string().min(1, "C03 is required."),
  c04_type: z.enum(["within_ph", "outside_ph"]).optional(),
  c04_province: z.string().optional(),
  c04_city: z.string().optional(),
  c04_barangay: z.string().optional(),
  c04_country: z.string().optional(),
  c05_month: z.string().optional(),
  c05_year: z.string().optional(),
  c06: z.string().optional(),
});

type MemberSectionCValues = z.infer<typeof memberSectionCBaseSchema>;

type SectionCFormValues = {
  sectionC: Record<string, MemberSectionCValues>;
};

function createSectionCSchema(members: MigrationMember[]) {
  const ageById = Object.fromEntries(members.map((member) => [member.id, member.age]));

  return z
    .object({
      sectionC: z.record(z.string(), memberSectionCBaseSchema),
    })
    .superRefine((data, ctx) => {
      for (const [memberId, values] of Object.entries(data.sectionC)) {
        const age = ageById[memberId] ?? 0;
        const prefix = ["sectionC", memberId] as const;

        if (age >= 15 && !values.c02?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "C02 is required for members aged 15 and above.",
            path: [...prefix, "c02"],
          });
        }

        if (values.c03 !== "1") {
          continue;
        }

        if (!values.c04_type) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Select where the member resided 5 years ago.",
            path: [...prefix, "c04_type"],
          });
        }

        if (values.c04_type === "within_ph") {
          if (!values.c04_province) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Province is required.",
              path: [...prefix, "c04_province"],
            });
          }
          if (!values.c04_city) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "City/Municipality is required.",
              path: [...prefix, "c04_city"],
            });
          }
          if (!values.c04_barangay) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Barangay is required.",
              path: [...prefix, "c04_barangay"],
            });
          }
        }

        if (values.c04_type === "outside_ph" && !values.c04_country) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Country of residence is required.",
            path: [...prefix, "c04_country"],
          });
        }

        if (!values.c05_month) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Month is required.",
            path: [...prefix, "c05_month"],
          });
        }

        if (!values.c05_year?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Year is required.",
            path: [...prefix, "c05_year"],
          });
        }

        if (!values.c06) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "C06 is required.",
            path: [...prefix, "c06"],
          });
        }
      }
    });
}

const defaultMember: MigrationMember = {
  id: "mock-01",
  firstName: "Maria",
  lastName: "Santos",
  age: 25,
  sex: "Female",
  relationship: "01 Head",
};

function buildDefaultValues(members: MigrationMember[]): SectionCFormValues {
  return {
    sectionC: members.reduce<Record<string, MemberSectionCValues>>((accumulator, member) => {
      accumulator[member.id] = {
        c01: "",
        c02: "",
        c03: "",
        c04_type: "within_ph",
        c04_province: "",
        c04_city: "",
        c04_barangay: "",
        c04_country: "",
        c05_month: "",
        c05_year: "",
        c06: "",
      };
      return accumulator;
    }, {}),
  };
}

function SectionCBreadcrumbs() {
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
          <span className="font-semibold text-[#101828]">Section C: Migration</span>
        </li>
      </ol>
    </nav>
  );
}

export function SectionC({ members, member, onNext, onPrevious }: SectionCProps) {
  const roster = members?.length ? members : member ? [member] : [defaultMember];
  const [selectedMemberId, setSelectedMemberId] = useState(roster[0]?.id ?? defaultMember.id);

  const schema = useMemo(() => createSectionCSchema(roster), [roster]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SectionCFormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(roster),
  });

  const activeMember = roster.find((item) => item.id === selectedMemberId) ?? roster[0];
  const memberPrefix = `sectionC.${selectedMemberId}` as const;
  const memberErrors = errors.sectionC?.[selectedMemberId];

  const watchC03 = watch(`${memberPrefix}.c03`);
  const watchC04Type = watch(`${memberPrefix}.c04_type`);
  const watchProvince = watch(`${memberPrefix}.c04_province`);
  const watchCity = watch(`${memberPrefix}.c04_city`);

  const showC02 = activeMember.age >= 15;
  const showMigrationDetails = watchC03 === "1";

  const cityOptions = watchProvince ? cityOptionsByProvince[watchProvince] ?? [] : [];
  const barangayOptions = watchCity ? barangayOptionsByCity[watchCity] ?? [] : [];

  const onSubmit = (data: SectionCFormValues) => {
    console.log("Section C submission:", data);
    onNext?.();
  };

  const displayName =
    [activeMember.firstName, activeMember.lastName].filter(Boolean).join(" ").trim() || "Member";

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
          <SectionCBreadcrumbs />

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">Citizenship Status</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name={`${memberPrefix}.c01`}
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      id={`${selectedMemberId}-c01`}
                      label="C01. Citizenship"
                      required
                      value={field.value ?? ""}
                      placeholder="Select citizenship..."
                      options={c01Options}
                      error={memberErrors?.c01?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                {showC02 ? (
                  <Controller
                    name={`${memberPrefix}.c02`}
                    control={control}
                    render={({ field }) => (
                      <FormSelect
                        id={`${selectedMemberId}-c02`}
                        label="C02. Overseas Filipino Status"
                        required
                        value={field.value ?? ""}
                        placeholder="Select status..."
                        options={c02Options}
                        error={memberErrors?.c02?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                ) : null}
              </div>
            </article>

            <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">Migration History</h2>
              <div className="space-y-8">
                <Controller
                  name={`${memberPrefix}.c03`}
                  control={control}
                  render={({ field }) => (
                    <FormRadioGroup
                      id={`${selectedMemberId}-c03`}
                      label={`C03. Was residence 5 years ago the same as current for ${displayName}?`}
                      required
                      orientation="horizontal"
                      value={field.value ?? ""}
                      options={c03Options}
                      error={memberErrors?.c03?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                {showMigrationDetails ? (
                  <div className="space-y-8 border-t border-gray-100 pt-6">
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-[#344054]">
                        C04. Where did {displayName} reside 5 years ago?
                      </p>

                      <div className="flex w-fit rounded-lg bg-gray-100 p-1">
                        <button
                          type="button"
                          onClick={() => setValue(`${memberPrefix}.c04_type`, "within_ph")}
                          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            watchC04Type === "within_ph"
                              ? "bg-white text-[#175CD3] shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <MapPin size={16} />
                          Within Philippines
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue(`${memberPrefix}.c04_type`, "outside_ph")}
                          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            watchC04Type === "outside_ph"
                              ? "bg-white text-[#175CD3] shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Globe size={16} />
                          Outside Philippines
                        </button>
                      </div>

                      {memberErrors?.c04_type?.message ? (
                        <p className="text-xs text-[#D92D20]">{memberErrors.c04_type.message}</p>
                      ) : null}

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                        {watchC04Type === "outside_ph" ? (
                          <Controller
                            name={`${memberPrefix}.c04_country`}
                            control={control}
                            render={({ field }) => (
                              <FormSearchableSelect
                                id={`${selectedMemberId}-c04-country`}
                                label="Country of Residence"
                                required
                                value={field.value ?? ""}
                                placeholder="Search country..."
                                groups={countryGroups}
                                error={memberErrors?.c04_country?.message}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        ) : (
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <Controller
                              name={`${memberPrefix}.c04_province`}
                              control={control}
                              render={({ field }) => (
                                <FormSelect
                                  id={`${selectedMemberId}-c04-province`}
                                  label="Province"
                                  required
                                  value={field.value ?? ""}
                                  placeholder="Select province..."
                                  options={provinceOptions}
                                  error={memberErrors?.c04_province?.message}
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue(`${memberPrefix}.c04_city`, "");
                                    setValue(`${memberPrefix}.c04_barangay`, "");
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name={`${memberPrefix}.c04_city`}
                              control={control}
                              render={({ field }) => (
                                <FormSelect
                                  id={`${selectedMemberId}-c04-city`}
                                  label="City / Municipality"
                                  required
                                  value={field.value ?? ""}
                                  placeholder="Select city..."
                                  options={cityOptions}
                                  disabled={!watchProvince}
                                  error={memberErrors?.c04_city?.message}
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue(`${memberPrefix}.c04_barangay`, "");
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name={`${memberPrefix}.c04_barangay`}
                              control={control}
                              render={({ field }) => (
                                <FormSelect
                                  id={`${selectedMemberId}-c04-barangay`}
                                  label="Barangay"
                                  required
                                  value={field.value ?? ""}
                                  placeholder="Select barangay..."
                                  options={barangayOptions}
                                  disabled={!watchCity}
                                  error={memberErrors?.c04_barangay?.message}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        )}
                      </div>
                      {/* TODO: Hook up PSGC API */}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#344054]">
                          C05. When did {displayName} move to the current city/municipality?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <Controller
                            name={`${memberPrefix}.c05_month`}
                            control={control}
                            render={({ field }) => (
                              <FormSelect
                                id={`${selectedMemberId}-c05-month`}
                                label="Month"
                                required
                                value={field.value ?? ""}
                                placeholder="Month"
                                options={monthOptions}
                                error={memberErrors?.c05_month?.message}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <Controller
                            name={`${memberPrefix}.c05_year`}
                            control={control}
                            render={({ field }) => (
                              <div className="space-y-2">
                                <label htmlFor={`${selectedMemberId}-c05-year`} className="text-sm font-medium text-[#344054]">
                                  Year *
                                </label>
                                <input
                                  id={`${selectedMemberId}-c05-year`}
                                  type="number"
                                  min={1900}
                                  max={new Date().getFullYear()}
                                  placeholder="YYYY"
                                  value={field.value ?? ""}
                                  onChange={field.onChange}
                                  className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 ${
                                    memberErrors?.c05_year
                                      ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
                                      : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
                                  }`}
                                />
                                {memberErrors?.c05_year?.message ? (
                                  <p className="text-xs text-[#D92D20]">{memberErrors.c05_year.message}</p>
                                ) : null}
                              </div>
                            )}
                          />
                        </div>
                      </div>

                      <Controller
                        name={`${memberPrefix}.c06`}
                        control={control}
                        render={({ field }) => (
                          <FormSelect
                            id={`${selectedMemberId}-c06`}
                            label="C06. Was relocation due to disaster/displacement?"
                            required
                            value={field.value ?? ""}
                            placeholder="Select response..."
                            options={c06Options}
                            error={memberErrors?.c06?.message}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                ) : null}
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
        </div>
      </div>
    </div>
  );
}
