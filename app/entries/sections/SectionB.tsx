"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ChevronRight, HelpCircle, Info, User, CheckCircle2 } from "lucide-react";

// Mock members array representing Section A's output
const mockMembers = [
  { id: "01", firstName: "MARIA", lastName: "SANTOS", relationship: "01 Head", age: 45, sex: "Female" },
  { id: "02", firstName: "JUAN", lastName: "SANTOS", relationship: "02 Spouse", age: 48, sex: "Male" },
  { id: "03", firstName: "LIZA", lastName: "SANTOS", relationship: "03 Daughter", age: 18, sex: "Female" },
];

// Data Dictionary Options
const yesNoOptions = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
];

const disabilityOptions = [
  { label: "A Visual", value: "A" },
  { label: "B Deaf/Hearing", value: "B" },
  { label: "C Intellectual/Mental", value: "C" },
  { label: "D Physical", value: "D" },
  { label: "E Speech/Language", value: "E" },
  { label: "F Cancer", value: "F" },
  { label: "G Rare Disease", value: "G" },
  { label: "Z Others", value: "Z" },
];

const scaleOptions = [
  { label: "1 No Difficulty", value: "1" },
  { label: "2 Some Difficulty", value: "2" },
  { label: "3 A Lot of Difficulty", value: "3" },
  { label: "4 Cannot Do At All", value: "4" },
];

const functionalQuestions = [
  { id: "b13", text: "B13. Seeing, even if wearing glasses?" },
  { id: "b14", text: "B14. Hearing, even if using a hearing aid?" },
  { id: "b15", text: "B15. Walking or climbing steps?" },
  { id: "b16", text: "B16. Remembering or concentrating?" },
  { id: "b17", text: "B17. Self-care such as washing or dressing?" },
  { id: "b18", text: "B18. Communicating or being understood?" },
];

// Zod Schema for a single member's Section B
const memberSectionBSchema = z.object({
  b01: z.string(),
  b02: z.string(),
  b03: z.string().min(1, "Required"),
  b04: z.string().optional(),
  b05: z.string().min(1, "Required"),
  b06: z.string().optional(),
  b07: z.string().min(1, "Required"),
  b08: z.string().optional(),
  b09: z.string().optional(),
  b10: z.string().min(1, "Required"),
  b11: z.string().optional(),
  b12: z.array(z.string()).optional(),
  b12_specify: z.string().optional(),
  b13: z.string().min(1, "Required"),
  b14: z.string().min(1, "Required"),
  b15: z.string().min(1, "Required"),
  b16: z.string().min(1, "Required"),
  b17: z.string().min(1, "Required"),
  b18: z.string().min(1, "Required"),
});

// Root schema: Record of member IDs to their Section B data
const sectionBSchema = z.object({
  sectionB: z.record(z.string(), memberSectionBSchema),
});

type SectionBFormValues = z.infer<typeof sectionBSchema>;

type SectionBProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

export function SectionB({ onNext, onPrevious }: SectionBProps) {
  const [selectedMemberId, setSelectedMemberId] = useState(mockMembers[0].id);
  const selectedMember = mockMembers.find((m) => m.id === selectedMemberId)!;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SectionBFormValues>({
    resolver: zodResolver(sectionBSchema),
    defaultValues: {
      sectionB: mockMembers.reduce((acc, member) => ({
        ...acc,
        [member.id]: {
          b01: `${member.id} / ${member.firstName} ${member.lastName}`,
          b02: member.relationship,
          b12: [],
        }
      }), {}),
    },
  });

  // Dynamic watchers for the selected member
  const watchB03 = watch(`sectionB.${selectedMemberId}.b03`);
  const watchB05 = watch(`sectionB.${selectedMemberId}.b05`);
  const watchB10 = watch(`sectionB.${selectedMemberId}.b10`);
  const watchB12 = watch(`sectionB.${selectedMemberId}.b12`);

  const showB04 = watchB03 === "1";
  const showB06 = watchB05 === "1";
  const showB08B09 = selectedMember.sex === "Female" && selectedMember.age >= 10 && selectedMember.age <= 59;
  const showB11B12 = watchB10 === "1";
  const showB12Specify = watchB12?.includes("Z");

  const onSubmit = (data: SectionBFormValues) => {
    console.log("Section B Complete Household Data:", data);
    if (onNext) onNext();
  };

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* ... header ... */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Section B: Other Demographic Characteristics</h1>
          <p className="text-sm text-gray-500 mt-1">Health, IDs, and specialized demographic traits per household member.</p>
        </div>
        <HelpCircle className="text-gray-400 cursor-pointer" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column: Member Navigation */}
        <aside className="space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Household Roster</p>
          {mockMembers.map((member) => {
            const isActive = selectedMemberId === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMemberId(member.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all border-l-[3px] ${
                  isActive
                    ? "bg-blue-50 border-blue-600 shadow-sm"
                    : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  <User size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-blue-700" : "text-gray-900"}`}>
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{member.relationship}</p>
                </div>
                {isActive && <CheckCircle2 size={16} className="ml-auto text-blue-600" />}
              </button>
            );
          })}
        </aside>

        {/* Right Column: Form Area */}
        <main className="md:col-span-3">
          <div className="space-y-6">
            {/* Card 1: Member Identification (Locked) */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">1</span>
                Member Identification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">B01. Line Number / Member Name</label>
                  <input
                    type="text"
                    {...register(`sectionB.${selectedMemberId}.b01` as any)}
                    readOnly
                    className="w-full rounded-lg border-gray-200 bg-gray-100 text-gray-500 text-sm cursor-not-allowed focus:ring-0 focus:border-gray-200 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">B02. Relationship to HH Head</label>
                  <input
                    type="text"
                    {...register(`sectionB.${selectedMemberId}.b02` as any)}
                    readOnly
                    className="w-full rounded-lg border-gray-200 bg-gray-100 text-gray-500 text-sm cursor-not-allowed focus:ring-0 focus:border-gray-200 font-medium"
                  />
                </div>
                <div className="md:col-span-2 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                  <Info size={18} className="text-blue-600 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Identity fields are automatically piped from the Core Demographics roster (Section A). To change these values, please return to Section A.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: IDs & Special Traits */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">2</span>
                IDs & Special Traits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">B03. Does {selectedMember.firstName} have a PhilSys ID?</label>
                  <div className="flex gap-6 mt-1">
                    {yesNoOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          value={opt.value}
                          {...register(`sectionB.${selectedMemberId}.b03` as any)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {showB04 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                    <label className="text-sm font-medium text-gray-700">B04. PhilSys Card Number</label>
                    <input
                      type="text"
                      {...register(`sectionB.${selectedMemberId}.b04` as any)}
                      placeholder="Enter 16-digit card number"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">B05. Is {selectedMember.firstName} a Solo Parent?</label>
                  <div className="flex gap-6 mt-1">
                    {yesNoOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          value={opt.value}
                          {...register(`sectionB.${selectedMemberId}.b05` as any)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {showB06 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                    <label className="text-sm font-medium text-gray-700">B06. Solo Parent ID Number</label>
                    <input
                      type="text"
                      {...register(`sectionB.${selectedMemberId}.b06` as any)}
                      placeholder="Enter ID number"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">B07. Registered Voter?</label>
                  <div className="flex gap-6 mt-1">
                    {yesNoOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          value={opt.value}
                          {...register(`sectionB.${selectedMemberId}.b07` as any)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {showB08B09 && (
                  <>
                    <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                      <label className="text-sm font-medium text-gray-700">B08. Currently Pregnant?</label>
                      <div className="flex gap-6 mt-1">
                        {yesNoOptions.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="radio"
                              value={opt.value}
                              {...register(`sectionB.${selectedMemberId}.b08` as any)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                      <label className="text-sm font-medium text-gray-700">B09. Number of children born alive</label>
                      <input
                        type="number"
                        {...register(`sectionB.${selectedMemberId}.b09` as any)}
                        placeholder="0"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Card 3: Health & Functionality */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">3</span>
                Health & Functionality
              </h2>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">B10. Does {selectedMember.firstName} have any disability?</label>
                    <div className="flex gap-6 mt-1">
                      {yesNoOptions.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                          <input
                            type="radio"
                            value={opt.value}
                            {...register(`sectionB.${selectedMemberId}.b10` as any)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {showB11B12 && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                      <label className="text-sm font-medium text-gray-700">B11. PWD ID Number</label>
                      <input
                        type="text"
                        {...register(`sectionB.${selectedMemberId}.b11` as any)}
                        placeholder="Enter ID number"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  )}
                </div>

                {showB11B12 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-medium text-gray-700 block">B12. Type of Disability</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                      {disabilityOptions.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            value={opt.value}
                            {...register(`sectionB.${selectedMemberId}.b12` as any)}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition font-medium">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    {showB12Specify && (
                      <div className="mt-4 animate-in fade-in slide-in-from-top-2 pl-4 border-l-2 border-blue-200">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Please specify other disability</label>
                        <input
                          type="text"
                          {...register(`sectionB.${selectedMemberId}.b12_specify` as any)}
                          placeholder="Describe disability..."
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Functional Difficulty Matrix */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-900">Functional Difficulties (B13-B18)</label>
                    <p className="text-xs text-gray-500 italic">Please assess difficulty levels for {selectedMember.firstName}.</p>
                  </div>
                  <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">Question</th>
                          {scaleOptions.map((opt) => (
                            <th key={opt.value} className="px-3 py-4 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              {opt.label.split(" ").slice(0, 2).join(" ")}
                              <span className="block font-normal normal-case text-gray-400 mt-0.5">{opt.label.split(" ").slice(2).join(" ")}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {functionalQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-4 text-sm text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{q.text}</td>
                            {scaleOptions.map((opt) => (
                              <td key={opt.value} className="px-3 py-4 text-center">
                                <input
                                  type="radio"
                                  value={opt.value}
                                  {...register(`sectionB.${selectedMemberId}.${q.id}` as any)}
                                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between pt-10 border-t border-gray-100">
              <button
                type="button"
                onClick={onPrevious}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition active:scale-95"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
                Previous Section
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition active:scale-95"
              >
                Next Section
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
