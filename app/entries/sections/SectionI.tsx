"use client";

import { FormCheckboxGroup } from "@/components/untitledui/form-engine-fields";
import { financeOptions } from "@/lib/census-constants";

type SectionIProps = {
  sectionI: string[];
  setSectionI: React.Dispatch<React.SetStateAction<string[]>>;
  sectionErrors: Record<string, string>;
};

export function SectionI({ sectionI, setSectionI, sectionErrors }: SectionIProps) {
  return (
    <FormCheckboxGroup
      id="i01"
      label="Financial Accounts (I01)"
      values={sectionI}
      options={financeOptions}
      onChange={setSectionI}
      columns={3}
      error={sectionErrors.i01}
      required
    />
  );
}
