"use client";

import { FormCheckboxGroup } from "@/components/untitledui/form-engine-fields";
import { publicFacilityOptions, privateFacilityOptions } from "@/lib/census-constants";

type SectionFProps = {
  sectionF: { public: string[]; private: string[] };
  setSectionF: React.Dispatch<React.SetStateAction<{ public: string[]; private: string[] }>>;
  sectionErrors: Record<string, string>;
};

export function SectionF({ sectionF, setSectionF, sectionErrors }: SectionFProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormCheckboxGroup
        id="f03-public"
        label="Medical Facility (F03) - Public"
        subtitle="Public facilities accessed."
        values={sectionF.public}
        options={publicFacilityOptions}
        onChange={(values) => setSectionF((prev) => ({ ...prev, public: values }))}
        columns={2}
        error={sectionErrors.fPublic}
        required
      />
      <FormCheckboxGroup
        id="f03-private"
        label="Medical Facility (F03) - Private"
        subtitle="Private facilities accessed."
        values={sectionF.private}
        options={privateFacilityOptions}
        onChange={(values) => setSectionF((prev) => ({ ...prev, private: values }))}
        columns={2}
        error={sectionErrors.fPrivate}
        required
      />
    </div>
  );
}
