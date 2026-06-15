"use client";

import { FormRadioMatrix } from "@/components/untitledui/form-engine-fields";
import { gRows, gColumns } from "@/lib/census-constants";

type SectionGProps = {
  sectionG: Record<string, string>;
  setSectionG: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sectionErrors: Record<string, string>;
};

export function SectionG({ sectionG, setSectionG, sectionErrors }: SectionGProps) {
  return (
    <FormRadioMatrix
      id="g01-g08"
      label="Food Security (G01-G08)"
      subtitle="Mock questions to preview the section matrix."
      rows={gRows}
      columns={gColumns}
      values={sectionG}
      onChange={(rowId, value) => setSectionG((prev) => ({ ...prev, [rowId]: value }))}
      error={
        Object.keys(sectionErrors).some((key) => gRows.some((row) => row.id === key))
          ? "Please complete all food security rows."
          : undefined
      }
      required
    />
  );
}
