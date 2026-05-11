"use client";

import { FormRadioGroup, FormSelect } from "@/components/untitledui/form-engine-fields";
import { employmentNatureOptions, classWorkerOptions } from "@/lib/census-constants";

type SectionEProps = {
  sectionE: { e07: string; e08: string };
  setSectionE: React.Dispatch<React.SetStateAction<{ e07: string; e08: string }>>;
  sectionErrors: Record<string, string>;
};

export function SectionE({ sectionE, setSectionE, sectionErrors }: SectionEProps) {
  return (
    <div className="space-y-4">
      <FormRadioGroup
        id="e07"
        label="Nature of Employment (E07)"
        value={sectionE.e07}
        options={employmentNatureOptions}
        onChange={(value) => setSectionE((prev) => ({ ...prev, e07: value }))}
        error={sectionErrors.e07}
        required
      />
      <FormSelect
        id="e08"
        label="Class of Worker (E08)"
        value={sectionE.e08}
        options={classWorkerOptions}
        onChange={(value) => setSectionE((prev) => ({ ...prev, e08: value }))}
        error={sectionErrors.e08}
        required
      />
    </div>
  );
}
