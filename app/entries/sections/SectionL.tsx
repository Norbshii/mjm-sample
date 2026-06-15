"use client";

import { FormRadioGroup } from "@/components/untitledui/form-engine-fields";
import { safetyOptions } from "@/lib/census-constants";

type SectionLProps = {
  sectionL: { l01: string };
  setSectionL: React.Dispatch<React.SetStateAction<{ l01: string }>>;
  sectionErrors: Record<string, string>;
};

export function SectionL({ sectionL, setSectionL, sectionErrors }: SectionLProps) {
  return (
    <FormRadioGroup
      id="l01"
      label="Safety Walking at Night (L01)"
      value={sectionL.l01}
      options={safetyOptions}
      onChange={(value) => setSectionL({ l01: value })}
      error={sectionErrors.l01}
      required
    />
  );
}
