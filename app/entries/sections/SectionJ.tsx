"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { NegativeShocksGrid } from "@/components/entries/NegativeShocksGrid";
import { SectionFormFooter } from "@/components/entries/SectionFormFooter";
import { SectionPageLayout } from "@/components/entries/SectionPageLayout";
import { FormInput, FormRadioGroup } from "@/components/untitledui/form-engine-fields";
import {
  createEmptyJ01Values,
  j01OptionKeys,
  yesNoBinaryOptions,
  type J01CaptureValue,
  type J01OptionKey,
} from "@/constants/section-j";

type SectionJProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

const j01Schema = z.object(
  Object.fromEntries(j01OptionKeys.map((key) => [key, z.enum(["1", "2"])])) as Record<
    J01OptionKey,
    z.ZodEnum<["1", "2"]>
  >,
);

const sectionJSchema = z
  .object({
    j01: j01Schema,
    j01_z_specify: z.string().optional(),
    j02: z.string().min(1, "J02 is required."),
    j02_specify: z.string().optional(),
    j03: z.string().min(1, "J03 is required."),
    j03_specify: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.j01.Z === "1" && !data.j01_z_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other negative shock (J01).",
        path: ["j01_z_specify"],
      });
    }

    if (data.j02 === "1" && !data.j02_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the evacuation area.",
        path: ["j02_specify"],
      });
    }

    if (data.j03 === "1" && !data.j03_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the emergency hotline.",
        path: ["j03_specify"],
      });
    }
  });

export type SectionJFormValues = z.infer<typeof sectionJSchema>;

const mockDefaultValues: SectionJFormValues = {
  j01: {
    ...createEmptyJ01Values(),
    A: "1",
    D: "1",
    P: "1",
  },
  j01_z_specify: "",
  j02: "1",
  j02_specify: "Barangay covered court",
  j03: "1",
  j03_specify: "911 / LGU disaster hotline",
};

export function SectionJ({ onNext, onPrevious }: SectionJProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SectionJFormValues>({
    resolver: zodResolver(sectionJSchema),
    defaultValues: mockDefaultValues,
  });

  const watchJ02 = watch("j02");
  const watchJ03 = watch("j03");
  const watchJ01Specify = watch("j01_z_specify");

  const onSubmit = (data: SectionJFormValues) => {
    console.log("Section J submission:", data);
    onNext?.();
  };

  const toggleJ01 = (key: J01OptionKey, current: Record<J01OptionKey, J01CaptureValue>) => {
    const nextValue: J01CaptureValue = current[key] === "1" ? "2" : "1";
    setValue(`j01.${key}`, nextValue, { shouldValidate: true });
    if (key === "Z" && nextValue === "2") {
      setValue("j01_z_specify", "", { shouldValidate: true });
    }
  };

  return (
    <SectionPageLayout sectionLabel="Section J: Negative Shocks and Disaster Preparedness">
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Negative Shocks Experienced
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#475467] italic">
            We would like to ask whether your household experienced events/risks/vulnerabilities/disasters that
            negatively affected the household in the past 12 months. Timeframe: In the past 12 months.
          </p>
          <Controller
            name="j01"
            control={control}
            render={({ field }) => (
              <NegativeShocksGrid
                values={field.value}
                specify={watchJ01Specify ?? ""}
                specifyError={errors.j01_z_specify?.message}
                onToggle={(key) => toggleJ01(key, field.value)}
                onSpecifyChange={(value) => setValue("j01_z_specify", value, { shouldValidate: true })}
              />
            )}
          />
        </article>

        <article className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Disaster Preparedness
          </h2>
          <div className="space-y-8">
            <div>
              <Controller
                name="j02"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="j02"
                    label="J02. Do you know the location of your evacuation area?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.j02?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value !== "1") {
                        setValue("j02_specify", "", { shouldValidate: true });
                      }
                    }}
                  />
                )}
              />
              {watchJ02 === "1" ? (
                <div className="mt-4 max-w-xl">
                  <Controller
                    name="j02_specify"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="j02-specify"
                        label="Please specify the evacuation area"
                        required
                        value={field.value ?? ""}
                        error={errors.j02_specify?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              ) : null}
            </div>

            <div>
              <Controller
                name="j03"
                control={control}
                render={({ field }) => (
                  <FormRadioGroup
                    id="j03"
                    label="J03. In the past 12 months, do you know any local government contact number or hotline which you can contact in case of emergency?"
                    required
                    orientation="horizontal"
                    value={field.value ?? ""}
                    options={yesNoBinaryOptions}
                    error={errors.j03?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value !== "1") {
                        setValue("j03_specify", "", { shouldValidate: true });
                      }
                    }}
                  />
                )}
              />
              {watchJ03 === "1" ? (
                <div className="mt-4 max-w-xl">
                  <Controller
                    name="j03_specify"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        id="j03-specify"
                        label="Please specify the emergency hotline"
                        required
                        value={field.value ?? ""}
                        error={errors.j03_specify?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </article>

        <SectionFormFooter onPrevious={onPrevious} />
      </form>
    </SectionPageLayout>
  );
}
