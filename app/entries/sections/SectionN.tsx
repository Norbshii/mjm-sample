"use client";

import { FormCheckboxGroup, FormSelect } from "@/components/untitledui/form-engine-fields";
import { waterSourceOptions, wasteDisposalOptions } from "@/lib/census-constants";

type SectionNProps = {
  sectionN: { n01: string; n12: string[] };
  setSectionN: React.Dispatch<React.SetStateAction<{ n01: string; n12: string[] }>>;
  sectionErrors: Record<string, string>;
};

export function SectionN({ sectionN, setSectionN, sectionErrors }: SectionNProps) {
  return (
    <div className="space-y-4">
      <FormSelect
        id="n01"
        label="Water Source (N01)"
        value={sectionN.n01}
        options={waterSourceOptions}
        onChange={(value) => setSectionN((prev) => ({ ...prev, n01: value }))}
        error={sectionErrors.n01}
        required
      />
      <FormCheckboxGroup
        id="n12"
        label="Waste Disposal (N12)"
        values={sectionN.n12}
        options={wasteDisposalOptions}
        onChange={(values) => setSectionN((prev) => ({ ...prev, n12: values }))}
        columns={3}
        error={sectionErrors.n12}
        required
      />
    </div>
  );
}
