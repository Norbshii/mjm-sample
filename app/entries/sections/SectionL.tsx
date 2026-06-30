"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { SafetyCardRadioGroup } from "@/components/entries/SafetyCardRadioGroup";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionPageLayout } from "@/components/entries/SectionPageLayout";
import { l01Options } from "@/constants/section-l";

type SectionLProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const sectionLSchema = z.object({
  l01: z.string().min(1, "L01 is required."),
});

export type SectionLFormValues = z.infer<typeof sectionLSchema>;

type MockPersona = {
  id: string;
  name: string;
  defaultValues: Partial<SectionLFormValues>;
};

const mockPersonas: MockPersona[] = [
  { id: "p1", name: "The Night Owl", defaultValues: { l01: "1" } },
  { id: "p2", name: "The Homebody", defaultValues: { l01: "5" } },
  { id: "p3", name: "Unanswered Draft", defaultValues: {} },
];

function valuesForPersona(persona: MockPersona): SectionLFormValues {
  return {
    l01: persona.defaultValues.l01 ?? "",
  };
}

type MockPersonaSwitcherProps = {
  activePersonaId: string;
  onPersonaChange: (personaId: string) => void;
};

function MockPersonaSwitcher({ activePersonaId, onPersonaChange }: MockPersonaSwitcherProps) {
  return (
    <article className="mb-6 rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 shadow-sm">
      <p className="text-xs font-bold tracking-wider text-yellow-800 uppercase">
        Developer Tool: Mock Persona Switcher
      </p>
      <p className="mt-1 text-sm text-yellow-900">
        Loads preset L01 values to verify React Hook Form binding for Section L.
      </p>
      <label htmlFor="section-l-persona-select" className="mt-4 block text-sm font-medium text-yellow-900">
        Select test persona
      </label>
      <select
        id="section-l-persona-select"
        value={activePersonaId}
        onChange={(event) => onPersonaChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-yellow-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
      >
        {mockPersonas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.name}
          </option>
        ))}
      </select>
    </article>
  );
}

export function SectionL({ onNext, onPrevious }: SectionLProps) {
  const [activePersona, setActivePersona] = useState<MockPersona>(mockPersonas[0]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionLFormValues>({
    resolver: zodResolver(sectionLSchema),
    defaultValues: valuesForPersona(mockPersonas[0]),
  });

  const handlePersonaChange = (personaId: string) => {
    const persona = mockPersonas.find((entry) => entry.id === personaId) ?? mockPersonas[0];
    setActivePersona(persona);
    reset(valuesForPersona(persona));
  };

  const onSubmit = (data: SectionLFormValues) => {
    console.log("Section L submission:", data);
    onNext?.();
  };

  return (
    <SectionPageLayout sectionLabel="Section L: Public Safety">
      <MockPersonaSwitcher activePersonaId={activePersona.id} onPersonaChange={handlePersonaChange} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">Public Safety</h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            The next question will ask about how you or your household members feel about the safety of your
            neighborhood.
          </p>

          <Controller
            name="l01"
            control={control}
            render={({ field }) => (
              <SafetyCardRadioGroup
                id="l01"
                label="L01. How safe do you feel walking alone in your area (i.e., neighborhood or village) at night?"
                required
                value={field.value ?? ""}
                options={l01Options}
                error={errors.l01?.message}
                onChange={field.onChange}
              />
            )}
          />
        </article>

        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionPageLayout>
  );
}
