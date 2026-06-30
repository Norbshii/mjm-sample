"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ConvenienceCounterGrid } from "@/components/entries/ConvenienceCounterGrid";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionPageLayout } from "@/components/entries/SectionPageLayout";
import {
  FormInput,
  FormRadioGroup,
  FormSearchableSelect,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";
import {
  housingSearchGroup,
  o01Options,
  o03Options,
  o04Options,
  o05Options,
  o06Options,
  o09TenureOptions,
  o12Options,
  o13Options,
  yesNoBinaryOptions,
  type O14Key,
} from "@/constants/section-o";
import { getSectionOVisibility } from "@/lib/entries/section-o-visibility";
import {
  createEmptyO14Values,
  sectionOMockPersonas,
  sectionOSchema,
  type SectionOFormValues,
} from "@/lib/entries/section-o-schema";

type SectionOProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const o01Groups = housingSearchGroup("Building types", o01Options);

function applyVisibilityCleanup(
  values: SectionOFormValues,
  setValue: ReturnType<typeof useForm<SectionOFormValues>>["setValue"],
) {
  const visibility = getSectionOVisibility(values.o01);

  if (visibility.endInterview) {
    setValue("o01_specify", "", { shouldValidate: false });
    setValue("o02", "", { shouldValidate: false });
    setValue("o03", "", { shouldValidate: false });
    setValue("o03_specify", "", { shouldValidate: false });
    setValue("o04", "", { shouldValidate: false });
    setValue("o04_specify", "", { shouldValidate: false });
    setValue("o05", "", { shouldValidate: false });
    setValue("o05_specify", "", { shouldValidate: false });
    setValue("o06", "", { shouldValidate: false });
    setValue("o06_specify", "", { shouldValidate: false });
    setValue("o07", "", { shouldValidate: false });
    setValue("o08", "", { shouldValidate: false });
    setValue("o09", "", { shouldValidate: false });
    setValue("o10", "", { shouldValidate: false });
    setValue("o11", "", { shouldValidate: false });
    setValue("o12", "", { shouldValidate: false });
    setValue("o12_specify", "", { shouldValidate: false });
    setValue("o13", "", { shouldValidate: false });
    setValue("o13_specify", "", { shouldValidate: false });
    setValue("o14", createEmptyO14Values(), { shouldValidate: false });
    return;
  }

  if (!visibility.showO01Specify) {
    setValue("o01_specify", "", { shouldValidate: false });
  }

  if (!visibility.showBuildingDetails) {
    setValue("o02", "", { shouldValidate: false });
    setValue("o03", "", { shouldValidate: false });
    setValue("o03_specify", "", { shouldValidate: false });
    setValue("o04", "", { shouldValidate: false });
    setValue("o04_specify", "", { shouldValidate: false });
    setValue("o05", "", { shouldValidate: false });
    setValue("o05_specify", "", { shouldValidate: false });
    setValue("o06", "", { shouldValidate: false });
    setValue("o06_specify", "", { shouldValidate: false });
    setValue("o07", "", { shouldValidate: false });
    setValue("o08", "", { shouldValidate: false });
  }

  if (!visibility.showTenureBlock) {
    setValue("o09", "", { shouldValidate: false });
    setValue("o10", "", { shouldValidate: false });
  }

  if (!visibility.showUtilitiesBlock) {
    setValue("o11", "", { shouldValidate: false });
    setValue("o12", "", { shouldValidate: false });
    setValue("o12_specify", "", { shouldValidate: false });
    setValue("o13", "", { shouldValidate: false });
    setValue("o13_specify", "", { shouldValidate: false });
    setValue("o14", createEmptyO14Values(), { shouldValidate: false });
  }
}

function EndInterviewBanner() {
  return (
    <div
      role="alert"
      className="mb-6 flex items-start gap-3 rounded-xl border border-[#FDA29B] bg-[#FEF3F2] p-5 text-[#B42318]"
    >
      <AlertTriangle className="mt-0.5 shrink-0" size={22} />
      <div>
        <p className="text-sm font-bold tracking-wide uppercase">End of Interview</p>
        <p className="mt-1 text-sm font-semibold">
          END OF INTERVIEW: Household does not have a standard housing unit.
        </p>
      </div>
    </div>
  );
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
        Tests O01 routing for standard housing, evacuation end-interview, and other building skip paths.
      </p>
      <label htmlFor="section-o-persona-select" className="mt-4 block text-sm font-medium text-yellow-900">
        Select test persona
      </label>
      <select
        id="section-o-persona-select"
        value={activePersonaId}
        onChange={(event) => onPersonaChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-yellow-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
      >
        {sectionOMockPersonas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.name}
          </option>
        ))}
      </select>
    </article>
  );
}

type SelectWithSpecifyProps = {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  error?: string;
  specifyValue?: string;
  specifyError?: string;
  specifyLabel?: string;
  triggerValues: string[];
  onChange: (value: string) => void;
  onSpecifyChange: (value: string) => void;
};

function SelectWithSpecify({
  id,
  label,
  value,
  options,
  error,
  specifyValue,
  specifyError,
  specifyLabel = "Specify",
  triggerValues,
  onChange,
  onSpecifyChange,
}: SelectWithSpecifyProps) {
  const showSpecify = triggerValues.includes(value);
  return (
    <div className="space-y-3">
      <FormSelect
        id={id}
        label={label}
        required
        value={value}
        options={options}
        error={error}
        onChange={onChange}
      />
      {showSpecify ? (
        <FormInput
          id={`${id}-specify`}
          label={specifyLabel}
          required
          value={specifyValue ?? ""}
          error={specifyError}
          onChange={onSpecifyChange}
        />
      ) : null}
    </div>
  );
}

export function SectionO({ onNext, onPrevious }: SectionOProps) {
  const [activePersonaId, setActivePersonaId] = useState(sectionOMockPersonas[0].id);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SectionOFormValues>({
    resolver: zodResolver(sectionOSchema),
    defaultValues: sectionOMockPersonas[0].defaultValues,
  });

  const watchO01 = watch("o01");
  const visibility = useMemo(() => getSectionOVisibility(watchO01 ?? ""), [watchO01]);

  const handleO01Change = (value: string) => {
    setValue("o01", value, { shouldValidate: true });
    applyVisibilityCleanup({ ...getValues(), o01: value }, setValue);
  };

  const handlePersonaChange = (personaId: string) => {
    const persona = sectionOMockPersonas.find((entry) => entry.id === personaId) ?? sectionOMockPersonas[0];
    setActivePersonaId(persona.id);
    reset(persona.defaultValues);
    queueMicrotask(() => applyVisibilityCleanup(getValues(), setValue));
  };

  const onSubmit = (data: SectionOFormValues) => {
    console.log("Section O submission:", data);
    onNext?.();
  };

  return (
    <SectionPageLayout sectionLabel="Section O: Housing">
      <MockPersonaSwitcher activePersonaId={activePersonaId} onPersonaChange={handlePersonaChange} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Building Characteristics
          </h2>
          <div className="space-y-6">
            <Controller
              name="o01"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <FormSearchableSelect
                    id="o01"
                    label="O01. Type of building/housing unit"
                    required
                    value={field.value ?? ""}
                    groups={o01Groups}
                    error={errors.o01?.message}
                    onChange={handleO01Change}
                  />
                  {visibility.showO01Specify ? (
                    <Controller
                      name="o01_specify"
                      control={control}
                      render={({ field: specifyField }) => (
                        <FormInput
                          id="o01-specify"
                          label="Specify other building type"
                          required
                          value={specifyField.value ?? ""}
                          error={errors.o01_specify?.message}
                          onChange={specifyField.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              )}
            />

            {visibility.endInterview ? <EndInterviewBanner /> : null}

            {visibility.showBuildingDetails ? (
              <>
                <Controller
                  name="o02"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      id="o02"
                      label="O02. Number of floors (max 3 digits)"
                      required
                      type="number"
                      value={field.value ?? ""}
                      error={errors.o02?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <Controller
                    name="o03"
                    control={control}
                    render={({ field }) => (
                      <SelectWithSpecify
                        id="o03"
                        label="O03. Main material of roof"
                        value={field.value ?? ""}
                        options={o03Options}
                        error={errors.o03?.message}
                        specifyValue={watch("o03_specify")}
                        specifyError={errors.o03_specify?.message}
                        triggerValues={["9"]}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value !== "9") {
                            setValue("o03_specify", "", { shouldValidate: true });
                          }
                        }}
                        onSpecifyChange={(value) => setValue("o03_specify", value, { shouldValidate: true })}
                      />
                    )}
                  />
                  <Controller
                    name="o04"
                    control={control}
                    render={({ field }) => (
                      <SelectWithSpecify
                        id="o04"
                        label="O04. Main material of walls"
                        value={field.value ?? ""}
                        options={o04Options}
                        error={errors.o04?.message}
                        specifyValue={watch("o04_specify")}
                        specifyError={errors.o04_specify?.message}
                        triggerValues={["99"]}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value !== "99") {
                            setValue("o04_specify", "", { shouldValidate: true });
                          }
                        }}
                        onSpecifyChange={(value) => setValue("o04_specify", value, { shouldValidate: true })}
                      />
                    )}
                  />
                  <Controller
                    name="o05"
                    control={control}
                    render={({ field }) => (
                      <SelectWithSpecify
                        id="o05"
                        label="O05. Main material of floor"
                        value={field.value ?? ""}
                        options={o05Options}
                        error={errors.o05?.message}
                        specifyValue={watch("o05_specify")}
                        specifyError={errors.o05_specify?.message}
                        triggerValues={["9"]}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value !== "9") {
                            setValue("o05_specify", "", { shouldValidate: true });
                          }
                        }}
                        onSpecifyChange={(value) => setValue("o05_specify", value, { shouldValidate: true })}
                      />
                    )}
                  />
                  <Controller
                    name="o06"
                    control={control}
                    render={({ field }) => (
                      <SelectWithSpecify
                        id="o06"
                        label="O06. Foundation/posts"
                        value={field.value ?? ""}
                        options={o06Options}
                        error={errors.o06?.message}
                        specifyValue={watch("o06_specify")}
                        specifyError={errors.o06_specify?.message}
                        triggerValues={["9"]}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value !== "9") {
                            setValue("o06_specify", "", { shouldValidate: true });
                          }
                        }}
                        onSpecifyChange={(value) => setValue("o06_specify", value, { shouldValidate: true })}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Controller
                    name="o07"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="o07"
                        label="O07. Floor area (square meters)"
                        required
                        type="number"
                        value={field.value ?? ""}
                        error={errors.o07?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="o08"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="o08"
                        label="O08. Number of bedrooms"
                        required
                        type="number"
                        value={field.value ?? ""}
                        error={errors.o08?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </>
            ) : null}
          </div>
        </article>

        {!visibility.endInterview && (visibility.showTenureBlock || visibility.showUtilitiesBlock) ? (
          <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Tenure &amp; Utilities
            </h2>
            <div className="space-y-6">
              {visibility.showTenureBlock ? (
                <>
                  <Controller
                    name="o09"
                    control={control}
                    render={({ field }) => (
                      <FormSelect
                        id="o09"
                        label="O09. Tenure status of housing unit and lot"
                        required
                        value={field.value ?? ""}
                        options={o09TenureOptions}
                        error={errors.o09?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="o10"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="o10"
                        label="O10. Year constructed (YYYY)"
                        required
                        type="number"
                        value={field.value ?? ""}
                        error={errors.o10?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </>
              ) : null}

              {visibility.showUtilitiesBlock ? (
                <>
                  <Controller
                    name="o11"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        id="o11"
                        label="O11. Does the household have electricity?"
                        required
                        orientation="horizontal"
                        value={field.value ?? ""}
                        options={yesNoBinaryOptions}
                        error={errors.o11?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Controller
                      name="o12"
                      control={control}
                      render={({ field }) => (
                        <SelectWithSpecify
                          id="o12"
                          label="O12. Main source of lighting"
                          value={field.value ?? ""}
                          options={o12Options}
                          error={errors.o12?.message}
                          specifyValue={watch("o12_specify")}
                          specifyError={errors.o12_specify?.message}
                          specifyLabel="Specify lighting source"
                          triggerValues={["9"]}
                          onChange={(value) => {
                            field.onChange(value);
                            if (value !== "9") {
                              setValue("o12_specify", "", { shouldValidate: true });
                            }
                          }}
                          onSpecifyChange={(value) => setValue("o12_specify", value, { shouldValidate: true })}
                        />
                      )}
                    />
                    <Controller
                      name="o13"
                      control={control}
                      render={({ field }) => (
                        <SelectWithSpecify
                          id="o13"
                          label="O13. Main source of cooking fuel"
                          value={field.value ?? ""}
                          options={o13Options}
                          error={errors.o13?.message}
                          specifyValue={watch("o13_specify")}
                          specifyError={errors.o13_specify?.message}
                          specifyLabel="Specify cooking fuel"
                          triggerValues={["9"]}
                          onChange={(value) => {
                            field.onChange(value);
                            if (value !== "9") {
                              setValue("o13_specify", "", { shouldValidate: true });
                            }
                          }}
                          onSpecifyChange={(value) => setValue("o13_specify", value, { shouldValidate: true })}
                        />
                      )}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </article>
        ) : null}

        {visibility.showConveniences ? (
          <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Household Conveniences
            </h2>
            <p className="mb-6 text-sm text-[#475467]">
              O14. How many of each item does the household own in good working condition?
            </p>
            <Controller
              name="o14"
              control={control}
              render={({ field }) => (
                <ConvenienceCounterGrid
                  values={field.value}
                  onChange={(key: O14Key, value: number) =>
                    field.onChange({ ...field.value, [key]: value })
                  }
                />
              )}
            />
          </article>
        ) : null}

        <SectionFormFooter
          onPrevious={onPrevious}
          submitLabel={visibility.endInterview ? "Complete Interview" : "Save & Next Section"}
          submitVariant={visibility.endInterview ? "danger" : "primary"}
        />
      </form>
    </SectionPageLayout>
  );
}
