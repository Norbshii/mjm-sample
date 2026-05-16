"use client";

import { Edit3, CheckCircle2, Wifi, Heart, ShieldAlert } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  HouseholdMember,
  relationshipOptions,
  maritalStatusOptions,
  religionOptions,
  ethnicityOptions,
  highestGradeGroups,
  waterSourceOptions,
  wasteDisposalOptions,
  housingMaterialOptions,
  publicFacilityOptions,
  privateFacilityOptions,
  gRows,
  employmentNatureOptions,
  classWorkerOptions,
  financeOptions,
  disabilityOptions,
  functionalRows,
  difficultyColumns,
} from "@/lib/census-constants";

type RecordDetailViewProps = {
  data: {
    id: string;
    status: string;
    sectionA: { members: HouseholdMember[] };
    sectionB: { b12: string[]; matrix: Record<string, string> };
    sectionC: { c02: string; c06: string };
    sectionE: { e07: string; e08: string };
    sectionF: { public: string[]; private: string[] };
    sectionG: Record<string, string>;
    sectionI: string[];
    sectionN: { n01: string; n12: string[] };
    sectionO: { o03: string; o04: string };
  };
};

export function RecordDetailView({ data }: RecordDetailViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", "edit");
    router.push(`${pathname}?${params.toString()}`);
  };

  const getLabel = (value: string, options: { label: string; value: string }[]) => {
    return options.find((opt) => opt.value === value)?.label || value || "Not specified";
  };

  const getEducationLabel = (value: string) => {
    for (const group of highestGradeGroups) {
      const opt = group.options.find((o) => o.value === value);
      if (opt) return opt.label;
    }
    return value || "Not specified";
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Household Record</h1>
          <div className="mt-1 flex items-center gap-3">
            <p className="text-sm text-gray-500">{data.id}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              <CheckCircle2 size={12} />
              {data.status}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              <Wifi size={12} />
              Synced
            </span>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition"
        >
          <Edit3 size={16} />
          Edit Record
        </button>
      </header>

      {/* Card 1: Household Members */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Household Members (Section A)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Relationship</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Age</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Sex</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Marital Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Highest Education</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.sectionA.members.map((member) => (
                <tr key={member.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {member.a01FirstName} {member.a01LastName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {getLabel(member.a02Relationship, relationshipOptions)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{member.a05Age}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {member.a03Sex === "1" ? "Male" : "Female"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {getLabel(member.a07MaritalStatus, maritalStatusOptions)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {getEducationLabel(member.a11HighestGradeCompleted)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Card 2: Health & Difficulties */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <Heart size={18} className="text-red-500" />
          <h2 className="text-base font-semibold text-gray-900">Health & Difficulties (Section B)</h2>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Functional Difficulties</h3>
              <dl className="space-y-3">
                {functionalRows.map(row => (
                  <div key={row.id} className="flex justify-between items-start gap-4 border-b border-gray-50 pb-2">
                    <dt className="text-sm text-gray-500">{row.question}</dt>
                    <dd className="text-sm font-medium text-gray-900 shrink-0">
                      {getLabel(data.sectionB.matrix[row.id], difficultyColumns)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Disabilities Declared</h3>
              <div className="flex flex-wrap gap-2">
                {data.sectionB.b12.map(val => (
                  <span key={val} className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                    {getLabel(val, disabilityOptions)}
                  </span>
                ))}
                {data.sectionB.b12.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No disabilities reported</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card 3: Housing & WASH */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Housing & WASH (Sections N & O)</h2>
        </div>
        <div className="px-6 py-6">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-sm text-gray-500">Roof Material</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{getLabel(data.sectionO.o03, housingMaterialOptions)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Wall Material</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{getLabel(data.sectionO.o04, housingMaterialOptions)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Water Source</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{getLabel(data.sectionN.n01, waterSourceOptions)}</dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <dt className="text-sm text-gray-500">Waste Disposal Methods</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {data.sectionN.n12.map((val) => (
                  <span key={val} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {getLabel(val, wasteDisposalOptions)}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Card 3: Health & Food Security */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Health & Food Security (Sections F & G)</h2>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Accessed Medical Facilities</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Public</p>
                  <div className="flex flex-wrap gap-2">
                    {data.sectionF.public.map(val => (
                      <span key={val} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        {getLabel(val, publicFacilityOptions)}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Private</p>
                  <div className="flex flex-wrap gap-2">
                    {data.sectionF.private.map(val => (
                      <span key={val} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        {getLabel(val, privateFacilityOptions)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Food Security Summary</h3>
              <dl className="space-y-3">
                {gRows.map(row => (
                  <div key={row.id} className="flex justify-between items-start gap-4 border-b border-gray-50 pb-2">
                    <dt className="text-sm text-gray-500">{row.question}</dt>
                    <dd className="text-sm font-medium text-gray-900 shrink-0">
                      {data.sectionG[row.id] === "1" ? (
                        <span className="text-red-600 font-semibold">Yes</span>
                      ) : data.sectionG[row.id] === "2" ? (
                        <span className="text-green-600">No</span>
                      ) : (
                        <span className="text-gray-400">Not Answered</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Card 5: Employment & Finance */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <ShieldAlert size={18} className="text-blue-500" />
          <h2 className="text-base font-semibold text-gray-900">Employment & Finance (Sections E & I)</h2>
        </div>
        <div className="px-6 py-6">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">Head Employment Nature</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {getLabel(data.sectionE.e07, employmentNatureOptions)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Class of Worker</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {getLabel(data.sectionE.e08, classWorkerOptions)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-gray-500 mb-2">Active Financial Accounts</dt>
              <dd className="flex flex-wrap gap-2">
                {data.sectionI.map((val) => (
                  <span key={val} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {getLabel(val, financeOptions)}
                  </span>
                ))}
                {data.sectionI.length === 0 && <span className="text-sm text-gray-400 italic">None declared</span>}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
