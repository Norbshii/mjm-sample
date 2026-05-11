"use client";

import { FormSelect } from "@/components/untitledui/form-engine-fields";
import { migrationStatusOptions, displacementOptions } from "@/lib/census-constants";

type SectionCProps = {
  sectionC: { c02: string; c06: string };
  setSectionC: React.Dispatch<React.SetStateAction<{ c02: string; c06: string }>>;
  sectionErrors: Record<string, string>;
};

export function SectionC({ sectionC, setSectionC, sectionErrors }: SectionCProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormSelect
        id="c02"
        label="Overseas Filipino Status (C02)"
        value={sectionC.c02}
        options={migrationStatusOptions}
        onChange={(value) => setSectionC((prev) => ({ ...prev, c02: value }))}
        error={sectionErrors.c02}
        required
      />
      <FormSelect
        id="c06"
        label="Internal Displacement Reason (C06)"
        value={sectionC.c06}
        options={displacementOptions}
        onChange={(value) => setSectionC((prev) => ({ ...prev, c06: value }))}
        error={sectionErrors.c06}
        required
      />
    </div>
  );
}
