"use client";

import { FormSelect } from "@/components/untitledui/form-engine-fields";
import { housingMaterialOptions } from "@/lib/census-constants";

type SectionOProps = {
  sectionO: { o03: string; o04: string };
  setSectionO: React.Dispatch<React.SetStateAction<{ o03: string; o04: string }>>;
  sectionErrors: Record<string, string>;
};

export function SectionO({ sectionO, setSectionO, sectionErrors }: SectionOProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormSelect
        id="o03"
        label="Roof Material (O03)"
        value={sectionO.o03}
        options={housingMaterialOptions}
        onChange={(value) => setSectionO((prev) => ({ ...prev, o03: value }))}
        error={sectionErrors.o03}
        required
      />
      <FormSelect
        id="o04"
        label="Wall Material (O04)"
        value={sectionO.o04}
        options={housingMaterialOptions}
        onChange={(value) => setSectionO((prev) => ({ ...prev, o04: value }))}
        error={sectionErrors.o04}
        required
      />
    </div>
  );
}
