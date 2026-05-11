"use client";

import {
  FormCheckboxGroup,
  FormRadioMatrix,
} from "@/components/untitledui/form-engine-fields";
import {
  disabilityOptions,
  functionalRows,
  difficultyColumns,
} from "@/lib/census-constants";

type SectionBProps = {
  sectionB: { b12: string[]; matrix: Record<string, string> };
  setSectionB: React.Dispatch<React.SetStateAction<{ b12: string[]; matrix: Record<string, string> }>>;
  sectionErrors: Record<string, string>;
};

export function SectionB({
  sectionB,
  setSectionB,
  sectionErrors,
}: SectionBProps) {
  return (
    <div className="space-y-4">
      <FormCheckboxGroup
        id="b12"
        label="Disability Type (B12)"
        subtitle="Select all that apply."
        values={sectionB.b12}
        options={disabilityOptions}
        onChange={(values) => setSectionB((prev) => ({ ...prev, b12: values }))}
        columns={4}
        error={sectionErrors.b12}
        required
      />

      <FormRadioMatrix
        id="b13-b18"
        label="Functional Difficulties (B13-B18)"
        subtitle="Use the best answer for each function."
        rows={functionalRows}
        columns={difficultyColumns}
        values={sectionB.matrix}
        onChange={(rowId, value) =>
          setSectionB((prev) => ({
            ...prev,
            matrix: { ...prev.matrix, [rowId]: value },
          }))
        }
        error={
          Object.keys(sectionErrors).some((key) =>
            functionalRows.some((row) => row.id === key),
          )
            ? "Please answer all functional difficulty questions."
            : undefined
        }
        helperText="Rows are mock items so you can preview matrix behavior."
        required
      />
    </div>
  );
}
