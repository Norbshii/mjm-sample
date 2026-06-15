"use client";

import { SectionDef } from "@/lib/census-constants";

type GenericSectionProps = {
  activeSectionDef: SectionDef;
  formValues: Record<string, Record<string, string>>;
  sectionErrors: Record<string, string>;
  updateField: (sectionId: string, fieldId: string, value: string) => void;
};

export function GenericSection({
  activeSectionDef,
  formValues,
  sectionErrors,
  updateField,
}: GenericSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {activeSectionDef.questions.map((question) => (
        <label key={question.id} className="space-y-2">
          <span className="text-sm font-medium text-[#344054]">
            {question.label}
            {question.required ? " *" : ""}
          </span>
          <input
            value={formValues[activeSectionDef.id]?.[question.id] ?? ""}
            onChange={(event) =>
              updateField(activeSectionDef.id, question.id, event.target.value)
            }
            placeholder={question.placeholder}
            className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 ${
              sectionErrors[question.id]
                ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
                : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
            }`}
          />
          {sectionErrors[question.id] ? (
            <p className="text-xs text-[#D92D20]">{sectionErrors[question.id]}</p>
          ) : null}
        </label>
      ))}
    </div>
  );
}
