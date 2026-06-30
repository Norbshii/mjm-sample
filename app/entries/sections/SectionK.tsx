"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { InternetConnectionGrid } from "@/components/entries/InternetConnectionGrid";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionPageLayout } from "@/components/entries/SectionPageLayout";
import { FormRadioGroup } from "@/components/untitledui/form-engine-fields";
import {
  createEmptyK03Values,
  k03OptionKeys,
  yesNoBinaryOptions,
  type K03CaptureValue,
  type K03OptionKey,
} from "@/constants/section-k";

type SectionKProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const k03Schema = z.object(
  Object.fromEntries(k03OptionKeys.map((key) => [key, z.enum(["1", "2"])])) as Record<
    K03OptionKey,
    z.ZodEnum<["1", "2"]>
  >,
);

const sectionKSchema = z
  .object({
    k01: z.string().min(1, "K01 is required."),
    k02: z.string().optional(),
    k03: k03Schema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.k01 === "1" && !data.k02) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "K02 is required.",
        path: ["k02"],
      });
    }

    if (data.k01 === "1" && data.k02 === "1") {
      if (!data.k03) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "K03 is required.",
          path: ["k03"],
        });
        return;
      }

      const hasConnection = k03OptionKeys.some((key) => data.k03![key] === "1");
      if (!hasConnection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Select at least one internet connection type available at home.",
          path: ["k03"],
        });
      }
    }
  });

export type SectionKFormValues = z.infer<typeof sectionKSchema>;

type MockPersona = {
  id: string;
  name: string;
  defaultValues: Partial<SectionKFormValues>;
};

const mockPersonas: MockPersona[] = [
  {
    id: "p1",
    name: "The Connected Family",
    defaultValues: {
      k01: "1",
      k02: "1",
      k03: { ...createEmptyK03Values(), A: "1", D: "1" },
    },
  },
  {
    id: "p2",
    name: "Mobile Data Only (No Home WiFi)",
    defaultValues: { k01: "1", k02: "2" },
  },
  {
    id: "p3",
    name: "Completely Offline",
    defaultValues: { k01: "2" },
  },
];

function valuesForPersona(persona: MockPersona): SectionKFormValues {
  const k03 = persona.defaultValues.k03;
  return {
    k01: persona.defaultValues.k01 ?? "",
    k02: persona.defaultValues.k02,
    k03: k03 ? { ...createEmptyK03Values(), ...k03 } : undefined,
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
        Loads preset K01–K03 values to test Section K skip logic and connection grid visibility.
      </p>
      <label htmlFor="section-k-persona-select" className="mt-4 block text-sm font-medium text-yellow-900">
        Select test persona
      </label>
      <select
        id="section-k-persona-select"
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

export function SectionK({ onNext, onPrevious }: SectionKProps) {
  const [activePersona, setActivePersona] = useState<MockPersona>(mockPersonas[0]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SectionKFormValues>({
    resolver: zodResolver(sectionKSchema),
    defaultValues: valuesForPersona(mockPersonas[0]),
  });

  const watchK01 = watch("k01");
  const watchK02 = watch("k02");

  const showK02 = watchK01 === "1";
  const showK03 = watchK01 === "1" && watchK02 === "1";

  const clearK02AndK03 = () => {
    setValue("k02", undefined, { shouldValidate: true });
    setValue("k03", undefined, { shouldValidate: true });
  };

  const clearK03 = () => {
    setValue("k03", undefined, { shouldValidate: true });
  };

  const handleK01Change = (value: string) => {
    setValue("k01", value, { shouldValidate: true });
    if (value === "2") {
      clearK02AndK03();
    }
  };

  const handleK02Change = (value: string) => {
    setValue("k02", value, { shouldValidate: true });
    if (value === "2") {
      clearK03();
    } else if (value === "1") {
      const currentK03 = watch("k03");
      if (!currentK03) {
        setValue("k03", createEmptyK03Values(), { shouldValidate: true });
      }
    }
  };

  const toggleK03 = (key: K03OptionKey, current: Record<K03OptionKey, K03CaptureValue>) => {
    const nextValue: K03CaptureValue = current[key] === "1" ? "2" : "1";
    setValue(`k03.${key}`, nextValue, { shouldValidate: true });
  };

  const handlePersonaChange = (personaId: string) => {
    const persona = mockPersonas.find((entry) => entry.id === personaId) ?? mockPersonas[0];
    setActivePersona(persona);
    reset(valuesForPersona(persona));
  };

  const onSubmit = (data: SectionKFormValues) => {
    console.log("Section K submission:", data);
    onNext?.();
  };

  return (
    <SectionPageLayout sectionLabel="Section K: Internet Access">
      <MockPersonaSwitcher activePersonaId={activePersona.id} onPersonaChange={handlePersonaChange} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">Internet Access</h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            In the next questions, we will ask about your household&apos;s access to the internet.
          </p>

          <div className="space-y-8">
            <Controller
              name="k01"
              control={control}
              render={({ field }) => (
                <FormRadioGroup
                  id="k01"
                  label="K01. In the past 12 months, do you or any member of your household have access to the internet?"
                  required
                  orientation="horizontal"
                  value={field.value ?? ""}
                  options={yesNoBinaryOptions}
                  error={errors.k01?.message}
                  onChange={handleK01Change}
                />
              )}
            />

            {showK02 ? (
              <Controller
                name="k02"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="k02"
                    label="K02. Does this household have its own internet at home which can be used by any household member when needed?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.k02?.message}
                    onChange={handleK02Change}
                  />
                )}
              />
            ) : null}

            {showK03 ? (
              <Controller
                name="k03"
                control={control}
                render={({ field }) => (
                  <InternetConnectionGrid
                    values={field.value ?? createEmptyK03Values()}
                    error={errors.k03?.message}
                    onToggle={(key) => toggleK03(key, field.value ?? createEmptyK03Values())}
                  />
                )}
              />
            ) : null}
          </div>
        </article>

        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionPageLayout>
  );
}
