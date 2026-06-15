"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ChevronRight, HelpCircle, Info, MapPin, Globe, Calendar } from "lucide-react";

// Mock member prop
interface SectionCProps {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
  };
}

// Data Dictionary Options
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

// Zod Schema
const sectionCSchema = z.object({
  c01: z.string().min(1, "Required"),
  c02: z.string().optional(),
  c03: z.string().min(1, "Required"),
  c04_type: z.enum(["within_ph", "outside_ph"]).optional(),
  c04_province: z.string().optional(),
  c04_city: z.string().optional(),
  c04_barangay: z.string().optional(),
  c04_country: z.string().optional(),
  c05_month: z.string().optional(),
  c05_year: z.string().optional(),
  c06: z.string().optional(),
}).superRefine((data, ctx) => {
  // Logic for C03 skip
  if (data.c03 === "1") {
    if (!data.c04_type) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["c04_type"] });
    }
    if (!data.c05_year) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["c05_year"] });
    }
    if (!data.c06) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["c06"] });
    }
  }
});

type SectionCFormValues = z.infer<typeof sectionCSchema>;

export function SectionC({ member }: SectionCProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SectionCFormValues>({
    resolver: zodResolver(sectionCSchema),
    defaultValues: {
      c04_type: "within_ph",
    },
  });

  const watchC03 = watch("c03");
  const watchC04Type = watch("c04_type");

  const showC02 = member.age >= 15;
  const showMigrationDetails = watchC03 === "1";

  const onSubmit = (data: SectionCFormValues) => {
    console.log("Section C Submission:", data);
  };

  return (
    <div className="mx-auto max-w-5xl pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Section C: Migration</h1>
          <p className="text-sm text-gray-500 mt-1">Citizenship and migration history for {member.firstName} {member.lastName}.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
          <span className="text-xs font-bold text-blue-700 uppercase">Age: {member.age}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card 1: Citizenship Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">1</span>
            Citizenship Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">C01. Citizenship</label>
              <select
                {...register("c01")}
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm ${errors.c01 ? "border-red-500" : ""}`}
              >
                <option value="">Select citizenship...</option>
                {c01Options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.c01 && <p className="text-xs text-red-500 mt-1">{errors.c01.message}</p>}
            </div>

            {showC02 && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                <label className="text-sm font-medium text-gray-700">C02. Overseas Filipino Status</label>
                <select
                  {...register("c02")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select status...</option>
                  {c02Options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Migration History */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">2</span>
            Migration History
          </h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                C03. Ever lived in another city/municipality or country for at least 6 months since birth?
              </label>
              <div className="flex gap-6">
                {c03Options.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("c03")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.c03 && <p className="text-xs text-red-500 mt-1">{errors.c03.message}</p>}
            </div>

            {showMigrationDetails && (
              <div className="space-y-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* C04: Location Data */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 block">C04. Previous Residence (Location)</label>
                  
                  {/* Location Toggle */}
                  <div className="flex p-1 bg-gray-100 rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => register("c04_type").onChange({ target: { value: "within_ph", name: "c04_type" } })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        watchC04Type === "within_ph" 
                          ? "bg-white text-blue-700 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <MapPin size={16} />
                      Within Philippines
                    </button>
                    <button
                      type="button"
                      onClick={() => register("c04_type").onChange({ target: { value: "outside_ph", name: "c04_type" } })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        watchC04Type === "outside_ph" 
                          ? "bg-white text-blue-700 shadow-sm" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Globe size={16} />
                      Outside Philippines
                    </button>
                  </div>

                  {/* Cascading Selects or Country */}
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    {watchC04Type === "within_ph" ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Province</label>
                          <select {...register("c04_province")} className="w-full rounded-lg border-gray-200 text-sm">
                            <option value="">Select Province...</option>
                            <option value="PH-BUL">Bulacan</option>
                            <option value="PH-PAM">Pampanga</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">City / Municipality</label>
                          <select {...register("c04_city")} className="w-full rounded-lg border-gray-200 text-sm">
                            <option value="">Select City...</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Barangay</label>
                          <select {...register("c04_barangay")} className="w-full rounded-lg border-gray-200 text-sm">
                            <option value="">Select Barangay...</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Country</label>
                        <select {...register("c04_country")} className="w-full rounded-lg border-gray-200 text-sm">
                          <option value="">Search/Select Country...</option>
                          <option value="USA">United States</option>
                          <option value="CAN">Canada</option>
                          <option value="JPN">Japan</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* C05: Month/Year */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar size={18} className="text-gray-400" />
                      C05. When did {member.firstName} move?
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <select {...register("c05_month")} className="w-full rounded-lg border-gray-200 text-sm">
                          <option value="">Month</option>
                          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                            <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          {...register("c05_year")}
                          placeholder="Year (YYYY)"
                          min="1900"
                          max={new Date().getFullYear()}
                          className={`w-full rounded-lg border-gray-200 text-sm ${errors.c05_year ? "border-red-500" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* C06: Reasons */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700">C06. Reason for moving to current residence</label>
                    <select
                      {...register("c06")}
                      className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm ${errors.c06 ? "border-red-500" : ""}`}
                    >
                      <option value="">Select reason...</option>
                      {c06Options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    C03-C06 tracks lifetime migration. If multiple moves occurred, record the most recent one before moving to the current city/municipality.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition active:scale-95"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition active:scale-95"
          >
            Save Migration Data
            <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
