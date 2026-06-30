"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionPageLayout } from "@/components/entries/SectionPageLayout";
import {
  FormCheckboxGroup,
  FormInput,
  FormRadioGroup,
  FormSearchableSelect,
} from "@/components/untitledui/form-engine-fields";
import {
  n01Options,
  n02n03Options,
  n04Options,
  n08Options,
  n09Options,
  n11Options,
  n12Options,
  n13Options,
  n14Options,
  n16Options,
  washSearchGroup,
  yesNoBinaryOptions,
} from "@/constants/section-n";
import { getSectionNVisibility } from "@/lib/entries/section-n-visibility";
import {
  sectionNMockPersonas,
  sectionNSchema,
  type SectionNFormValues,
} from "@/lib/entries/section-n-schema";

type SectionNProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const n01Groups = washSearchGroup("Water sources", n01Options);
const n02Groups = washSearchGroup("Drinking water sources", n02n03Options);
const n03Groups = washSearchGroup("Other use water sources", n02n03Options);
const n08Groups = washSearchGroup("Toilet facilities", n08Options);

function applyVisibilityCleanup(
  values: SectionNFormValues,
  setValue: ReturnType<typeof useForm<SectionNFormValues>>["setValue"],
) {
  const visibility = getSectionNVisibility(values);

  if (!visibility.showN04) {
    setValue("n04", undefined, { shouldValidate: false });
  }
  if (!visibility.showN05) {
    setValue("n05_minutes", "", { shouldValidate: false });
    setValue("n05_no_collect", false, { shouldValidate: false });
    setValue("n05_dont_know", false, { shouldValidate: false });
  }
  if (!visibility.showN06) {
    setValue("n06_name", "", { shouldValidate: false });
    setValue("n06_not_member", false, { shouldValidate: false });
  }
  if (!visibility.showN07) {
    setValue("n07", "", { shouldValidate: false });
  }
  if (!visibility.showN09) {
    setValue("n09", undefined, { shouldValidate: false });
  }
  if (!visibility.showN10) {
    setValue("n10", undefined, { shouldValidate: false });
  }
  if (!visibility.showN11) {
    setValue("n11", undefined, { shouldValidate: false });
  }
  if (!visibility.showN14) {
    setValue("n14", undefined, { shouldValidate: false });
  }
  if (!visibility.showN15) {
    setValue("n15", undefined, { shouldValidate: false });
  }
  if (!visibility.showN16) {
    setValue("n16", [], { shouldValidate: false });
    setValue("n16_z_specify", "", { shouldValidate: false });
  }
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
        Tests WASH skip routing for piped water, remote sources, and open defecation paths.
      </p>
      <label htmlFor="section-n-persona-select" className="mt-4 block text-sm font-medium text-yellow-900">
        Select test persona
      </label>
      <select
        id="section-n-persona-select"
        value={activePersonaId}
        onChange={(event) => onPersonaChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-yellow-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
      >
        {sectionNMockPersonas.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.name}
          </option>
        ))}
      </select>
    </article>
  );
}

export function SectionN({ onNext, onPrevious }: SectionNProps) {
  const [activePersonaId, setActivePersonaId] = useState(sectionNMockPersonas[0].id);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SectionNFormValues>({
    resolver: zodResolver(sectionNSchema),
    defaultValues: sectionNMockPersonas[0].defaultValues,
  });

  const watched = watch();
  const visibility = useMemo(() => getSectionNVisibility(watched), [watched]);

  const handlePersonaChange = (personaId: string) => {
    const persona = sectionNMockPersonas.find((entry) => entry.id === personaId) ?? sectionNMockPersonas[0];
    setActivePersonaId(persona.id);
    reset(persona.defaultValues);
    queueMicrotask(() => applyVisibilityCleanup(getValues(), setValue));
  };

  const syncCleanup = () => {
    applyVisibilityCleanup(getValues(), setValue);
  };

  const onSubmit = (data: SectionNFormValues) => {
    console.log("Section N submission:", data);
    onNext?.();
  };

  return (
    <SectionPageLayout sectionLabel="Section N: WASH">
      <MockPersonaSwitcher activePersonaId={activePersonaId} onPersonaChange={handlePersonaChange} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">Water Supply</h2>
          <div className="space-y-6">
            <Controller
              name="n01"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <FormSearchableSelect
                    id="n01"
                    label="N01. Main source of drinking water for the household"
                    required
                    value={field.value ?? ""}
                    groups={n01Groups}
                    error={errors.n01?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value !== "99") {
                        setValue("n01_specify", "", { shouldValidate: true });
                      }
                    }}
                  />
                  {field.value === "99" ? (
                    <Controller
                      name="n01_specify"
                      control={control}
                      render={({ field: specifyField }) => (
                        <FormInput
                          id="n01-specify"
                          label="Specify other water source"
                          required
                          value={specifyField.value ?? ""}
                          error={errors.n01_specify?.message}
                          onChange={specifyField.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              )}
            />

            <Controller
              name="n02"
              control={control}
              render={({ field }) => (
                <FormSearchableSelect
                  id="n02"
                  label="N02. Source of drinking water"
                  required
                  value={field.value ?? ""}
                  groups={n02Groups}
                  error={errors.n02?.message}
                  onChange={(value) => {
                    field.onChange(value);
                    syncCleanup();
                  }}
                />
              )}
            />

            <Controller
              name="n03"
              control={control}
              render={({ field }) => (
                <FormSearchableSelect
                  id="n03"
                  label="N03. Source of water for other domestic uses"
                  required
                  value={field.value ?? ""}
                  groups={n03Groups}
                  error={errors.n03?.message}
                  onChange={(value) => {
                    field.onChange(value);
                    syncCleanup();
                  }}
                />
              )}
            />

            {visibility.showN04 ? (
              <Controller
                name="n04"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n04"
                    label="N04. Location of water source"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={n04Options}
                    error={errors.n04?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      syncCleanup();
                    }}
                  />
                )}
              />
            ) : null}

            {visibility.showN05 ? (
              <div className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-4">
                <p className="mb-3 text-sm font-medium text-[#344054]">
                  N05. Time required to go to the water source, fetch water, and return (minutes)
                </p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Controller
                    name="n05_minutes"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="n05-minutes"
                        label="Minutes"
                        type="number"
                        value={field.value ?? ""}
                        disabled={Boolean(watched.n05_no_collect || watched.n05_dont_know)}
                        error={errors.n05_minutes?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <div className="flex flex-col justify-end gap-2">
                    <Controller
                      name="n05_no_collect"
                      control={control}
                      render={({ field }) => (
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm">
                          <input
                            type="checkbox"
                            checked={Boolean(field.value)}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              field.onChange(checked);
                              if (checked) {
                                setValue("n05_dont_know", false);
                                setValue("n05_minutes", "");
                              }
                              syncCleanup();
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-[#175CD3]"
                          />
                          000 Household does not collect
                        </label>
                      )}
                    />
                    <Controller
                      name="n05_dont_know"
                      control={control}
                      render={({ field }) => (
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm">
                          <input
                            type="checkbox"
                            checked={Boolean(field.value)}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              field.onChange(checked);
                              if (checked) {
                                setValue("n05_no_collect", false);
                                setValue("n05_minutes", "");
                              }
                              syncCleanup();
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-[#175CD3]"
                          />
                          998 Don&apos;t Know
                        </label>
                      )}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {visibility.showN06 ? (
              <div className="rounded-xl border border-gray-100 bg-[#F9FAFB] p-4">
                <p className="mb-3 text-sm font-medium text-[#344054]">
                  N06. Who usually fetches the water? (Last Name, First Name, M.I.)
                </p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Controller
                    name="n06_name"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="n06-name"
                        label="Name"
                        value={field.value ?? ""}
                        disabled={Boolean(watched.n06_not_member)}
                        error={errors.n06_name?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="n06_not_member"
                    control={control}
                    render={({ field }) => (
                      <label className="flex h-11 cursor-pointer items-center gap-2 self-end rounded-lg border border-gray-200 bg-white px-3 text-sm">
                        <input
                          type="checkbox"
                          checked={Boolean(field.value)}
                          onChange={(event) => {
                            field.onChange(event.target.checked);
                            if (event.target.checked) {
                              setValue("n06_name", "");
                            }
                            syncCleanup();
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-[#175CD3]"
                        />
                        96 Not a household member
                      </label>
                    )}
                  />
                </div>
              </div>
            ) : null}

            {visibility.showN07 ? (
              <Controller
                name="n07"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="n07"
                    label="N07. Distance to water source (meters)"
                    required
                    type="number"
                    value={field.value ?? ""}
                    error={errors.n07?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}
          </div>
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Sanitation &amp; Toilet Facility
          </h2>
          <div className="space-y-6">
            <Controller
              name="n08"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <FormSearchableSelect
                    id="n08"
                    label="N08. Type of toilet facility used by the household"
                    required
                    value={field.value ?? ""}
                    groups={n08Groups}
                    error={errors.n08?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value !== "22" && value !== "99") {
                        setValue("n08_specify", "", { shouldValidate: true });
                      }
                      syncCleanup();
                    }}
                  />
                  {field.value === "22" || field.value === "99" ? (
                    <Controller
                      name="n08_specify"
                      control={control}
                      render={({ field: specifyField }) => (
                        <FormInput
                          id="n08-specify"
                          label="Specify toilet facility"
                          required
                          value={specifyField.value ?? ""}
                          error={errors.n08_specify?.message}
                          onChange={specifyField.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              )}
            />

            {visibility.showN09 ? (
              <Controller
                name="n09"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n09"
                    label="N09. Location of toilet facility"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={n09Options}
                    error={errors.n09?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}

            {visibility.showN10 ? (
              <Controller
                name="n10"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n10"
                    label="N10. Is the toilet facility shared with other households?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.n10?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      syncCleanup();
                    }}
                  />
                )}
              />
            ) : null}

            {visibility.showN11 ? (
              <Controller
                name="n11"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n11"
                    label="N11. With whom is the toilet facility shared?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={n11Options}
                    error={errors.n11?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}
          </div>
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">Waste Disposal</h2>
          <Controller
            name="n12"
            control={control}
            render={({ field }) => (
              <div className="space-y-4">
                <FormCheckboxGroup
                  id="n12"
                  label="N12. How does your household dispose of its waste/garbage?"
                  required
                  values={field.value ?? []}
                  options={n12Options}
                  columns={3}
                  error={errors.n12?.message}
                  onChange={(values) => {
                    field.onChange(values);
                    if (!values.includes("Z")) {
                      setValue("n12_z_specify", "", { shouldValidate: true });
                    }
                  }}
                />
                {(field.value ?? []).includes("Z") ? (
                  <Controller
                    name="n12_z_specify"
                    control={control}
                    render={({ field: specifyField }) => (
                      <FormInput
                        id="n12-z-specify"
                        label="Specify other waste disposal"
                        required
                        value={specifyField.value ?? ""}
                        error={errors.n12_z_specify?.message}
                        onChange={specifyField.onChange}
                      />
                    )}
                  />
                ) : null}
              </div>
            )}
          />
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">Hygiene Observation</h2>
          <div className="space-y-6">
            <Controller
              name="n13"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <FormRadioGroup
                    id="n13"
                    label="N13. Where do members of your household usually wash their hands?"
                    required
                    value={field.value ?? ""}
                    options={n13Options}
                    error={errors.n13?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value !== "3" && value !== "9") {
                        setValue("n13_specify", "", { shouldValidate: true });
                      }
                      syncCleanup();
                    }}
                  />
                  {field.value === "3" || field.value === "9" ? (
                    <Controller
                      name="n13_specify"
                      control={control}
                      render={({ field: specifyField }) => (
                        <FormInput
                          id="n13-specify"
                          label="Specify handwashing place"
                          required
                          value={specifyField.value ?? ""}
                          error={errors.n13_specify?.message}
                          onChange={specifyField.onChange}
                        />
                      )}
                    />
                  ) : null}
                </div>
              )}
            />

            {visibility.showN14 ? (
              <Controller
                name="n14"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n14"
                    label="N14. Is water available at the place for handwashing?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={n14Options}
                    error={errors.n14?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}

            {visibility.showN15 ? (
              <Controller
                name="n15"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="n15"
                    label="N15. Is soap or other cleansing agent available at the place for handwashing?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.n15?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      syncCleanup();
                    }}
                  />
                )}
              />
            ) : null}

            {visibility.showN16 ? (
              <Controller
                name="n16"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4">
                    <FormCheckboxGroup
                      id="n16"
                      label="N16. What cleansing agents are available?"
                      required
                      values={field.value ?? []}
                      options={n16Options}
                      columns={2}
                      error={errors.n16?.message}
                      onChange={(values) => {
                        field.onChange(values);
                        if (!values.includes("Z")) {
                          setValue("n16_z_specify", "", { shouldValidate: true });
                        }
                      }}
                    />
                    {(field.value ?? []).includes("Z") ? (
                      <Controller
                        name="n16_z_specify"
                        control={control}
                        render={({ field: specifyField }) => (
                          <FormInput
                            id="n16-z-specify"
                            label="Specify other cleansing agent"
                            required
                            value={specifyField.value ?? ""}
                            error={errors.n16_z_specify?.message}
                            onChange={specifyField.onChange}
                          />
                        )}
                      />
                    ) : null}
                  </div>
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
