"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import {
  FormInput,
  FormRadioGroup,
  FormSearchableSelect,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";
import {
  HouseholdMember,
  relationshipOptions,
  maritalStatusOptions,
  religionOptions,
  ethnicityOptions,
  highestGradeGroups,
} from "@/lib/census-constants";

type SectionAProps = {
  members: HouseholdMember[];
  sectionErrors: Record<string, string>;
  updateMemberField: (memberId: number, field: keyof HouseholdMember, value: string | boolean) => void;
  addHouseholdMember: () => void;
  deleteHouseholdMember: (memberId: number) => void;
  isMemberComplete: (member: HouseholdMember) => boolean;
};

export function SectionA({
  members,
  sectionErrors,
  updateMemberField,
  addHouseholdMember,
  deleteHouseholdMember,
  isMemberComplete,
}: SectionAProps) {
  const [expandedMemberId, setExpandedMemberId] = useState<number>(members[0]?.id || -1);

  return (
    <div className="space-y-6">
      {sectionErrors.aMembers ? (
        <p className="text-xs text-[#D92D20]">{sectionErrors.aMembers}</p>
      ) : null}

      {members.map((member, index) => {
        const isHead = index === 0;
        const open = expandedMemberId === member.id;
        const memberName =
          [member.a01FirstName, member.a01LastName].filter(Boolean).join(" ").trim() ||
          "New Household Member";
        const relationshipLabel =
          relationshipOptions.find((option) => option.value === member.a02Relationship)?.label ??
          "Relationship";
        const complete = isMemberComplete(member);

        return (
          <article key={member.id} className="overflow-visible rounded-2xl border border-gray-200">
            <button
              type="button"
              onClick={() => setExpandedMemberId(open ? -1 : member.id)}
              className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-3 text-left"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#101828]">
                  {memberName}
                  {memberName === "New Household Member" ? "" : ` • ${relationshipLabel}`}
                </p>
                <p className="text-xs text-[#667085]">
                  Household Member {index + 1} {isHead ? "(Head)" : ""}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-2">
                {complete ? (
                  <CheckCircle2 size={16} className="text-[#067647]" />
                ) : (
                  <AlertTriangle size={16} className="text-[#DC6803]" />
                )}
                {!isHead ? (
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteHouseholdMember(member.id);
                    }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
                    role="button"
                    aria-label="Delete member"
                  >
                    <Trash2 size={14} />
                  </span>
                ) : null}
                {open ? (
                  <ChevronUp size={16} className="text-[#667085]" />
                ) : (
                  <ChevronDown size={16} className="text-[#667085]" />
                )}
              </div>
            </button>

            <div
              className={`bg-gray-50 transition-all duration-200 ${
                open ? "max-h-[4000px] overflow-visible opacity-100" : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              <div className="space-y-6 px-4 py-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-[#344054]">
                    A01. Name of Household Member *
                  </p>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <FormInput
                      id={`a01-last-${member.id}`}
                      label="Last Name"
                      value={member.a01LastName}
                      onChange={(value) => updateMemberField(member.id, "a01LastName", value)}
                      error={sectionErrors[`member-${member.id}-a01LastName`]}
                      required
                    />
                    <FormInput
                      id={`a01-first-${member.id}`}
                      label="First Name"
                      value={member.a01FirstName}
                      onChange={(value) => updateMemberField(member.id, "a01FirstName", value)}
                      error={sectionErrors[`member-${member.id}-a01FirstName`]}
                      required
                    />
                    <FormInput
                      id={`a01-middle-${member.id}`}
                      label="Middle Name"
                      value={member.a01MiddleName}
                      onChange={(value) => updateMemberField(member.id, "a01MiddleName", value)}
                      error={sectionErrors[`member-${member.id}-a01MiddleName`]}
                      required
                    />
                    <FormInput
                      id={`a01-suffix-${member.id}`}
                      label="Suffix"
                      value={member.a01Suffix}
                      onChange={(value) => updateMemberField(member.id, "a01Suffix", value)}
                      placeholder="Jr., Sr., III"
                      error={sectionErrors[`member-${member.id}-a01Suffix`]}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <FormSelect
                    id={`a02-${member.id}`}
                    label="A02. Relationship to Household Head"
                    value={member.a02Relationship}
                    options={relationshipOptions}
                    disabled={isHead}
                    onChange={(value) => updateMemberField(member.id, "a02Relationship", value)}
                    error={sectionErrors[`member-${member.id}-a02`]}
                    required
                  />
                  {member.a02Relationship === "26" ? (
                    <FormInput
                      id={`a02-specify-${member.id}`}
                      label="Specify"
                      value={member.a02Specify}
                      onChange={(value) => updateMemberField(member.id, "a02Specify", value)}
                      error={sectionErrors[`member-${member.id}-a02Specify`]}
                      required
                    />
                  ) : null}

                  <FormRadioGroup
                    id={`a03-${member.id}`}
                    label="A03. Sex"
                    value={member.a03Sex}
                    options={[
                      { label: "1 Male", value: "1" },
                      { label: "2 Female", value: "2" },
                    ]}
                    orientation="horizontal"
                    onChange={(value) => updateMemberField(member.id, "a03Sex", value)}
                    error={sectionErrors[`member-${member.id}-a03`]}
                    required
                  />

                  <FormInput
                    id={`a04-${member.id}`}
                    label="A04. Date of Birth"
                    type="date"
                    value={member.a04DateOfBirth}
                    onChange={(value) => updateMemberField(member.id, "a04DateOfBirth", value)}
                    error={sectionErrors[`member-${member.id}-a04`]}
                    required
                  />
                  <FormInput
                    id={`a05-${member.id}`}
                    label="A05. Age"
                    type="number"
                    value={member.a05Age}
                    onChange={(value) => updateMemberField(member.id, "a05Age", value)}
                    error={sectionErrors[`member-${member.id}-a05`]}
                    required
                  />

                  <FormRadioGroup
                    id={`a06-${member.id}`}
                    label="A06. Birth Registration"
                    value={member.a06BirthRegistration}
                    options={[
                      { label: "1 Yes", value: "1" },
                      { label: "2 No", value: "2" },
                      { label: "8 Don't Know", value: "8" },
                    ]}
                    onChange={(value) => updateMemberField(member.id, "a06BirthRegistration", value)}
                    error={sectionErrors[`member-${member.id}-a06`]}
                    required
                  />

                  <FormSelect
                    id={`a07-${member.id}`}
                    label="A07. Marital Status"
                    value={member.a07MaritalStatus}
                    options={maritalStatusOptions}
                    disabled={Number(member.a05Age || "0") < 10}
                    onChange={(value) => updateMemberField(member.id, "a07MaritalStatus", value)}
                    error={sectionErrors[`member-${member.id}-a07`]}
                    required
                  />

                  <FormSelect
                    id={`a08-${member.id}`}
                    label="A08. Religion"
                    value={member.a08Religion}
                    options={religionOptions}
                    onChange={(value) => updateMemberField(member.id, "a08Religion", value)}
                    error={sectionErrors[`member-${member.id}-a08`]}
                    required
                  />
                  {member.a08Religion === "99" ? (
                    <FormInput
                      id={`a08-specify-${member.id}`}
                      label="Specify Religion"
                      value={member.a08Specify}
                      onChange={(value) => updateMemberField(member.id, "a08Specify", value)}
                      error={sectionErrors[`member-${member.id}-a08Specify`]}
                      required
                    />
                  ) : null}

                  <FormSelect
                    id={`a09-${member.id}`}
                    label="A09. Ethnicity"
                    value={member.a09Ethnicity}
                    options={ethnicityOptions}
                    onChange={(value) => updateMemberField(member.id, "a09Ethnicity", value)}
                    error={sectionErrors[`member-${member.id}-a09`]}
                    required
                  />
                  {member.a09Ethnicity === "99" ? (
                    <FormInput
                      id={`a09-specify-${member.id}`}
                      label="Specify Ethnicity"
                      value={member.a09Specify}
                      onChange={(value) => updateMemberField(member.id, "a09Specify", value)}
                      error={sectionErrors[`member-${member.id}-a09Specify`]}
                      required
                    />
                  ) : null}

                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 lg:col-span-2">
                    <input
                      id={`a10-${member.id}`}
                      type="checkbox"
                      checked={member.a10FunctionalDifficulty}
                      onChange={(event) =>
                        updateMemberField(member.id, "a10FunctionalDifficulty", event.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                    />
                    <label htmlFor={`a10-${member.id}`} className="text-sm font-medium text-[#344054]">
                      A10. Does this person have any functional difficulty?
                    </label>
                  </div>

                  <div className="lg:col-span-3">
                    <FormSearchableSelect
                      id={`a11-${member.id}`}
                      label="A11. Highest Grade Completed"
                      groups={highestGradeGroups}
                      value={member.a11HighestGradeCompleted}
                      onChange={(value) =>
                        updateMemberField(member.id, "a11HighestGradeCompleted", value)
                      }
                      error={sectionErrors[`member-${member.id}-a11`]}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <button
        type="button"
        onClick={addHouseholdMember}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
      >
        <UserPlus size={16} />
        Add Household Member
      </button>
    </div>
  );
}
