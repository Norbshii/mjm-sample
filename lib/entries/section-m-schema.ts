import * as z from "zod";
import {
  card1ProgramKeys,
  card3ProgramKeys,
  type TristateValue,
} from "@/constants/section-m";

const tristateSchema = z.enum(["1", "2", "8"]);

function buildSectionMShape() {
  const shape: Record<string, z.ZodTypeAny> = {};

  card1ProgramKeys.forEach((key) => {
    shape[`m01_${key}`] = tristateSchema;
    shape[`m02_${key}`] = tristateSchema.optional();
  });

  shape.m03 = tristateSchema;
  shape.m04 = tristateSchema.optional();

  card3ProgramKeys.forEach((key) => {
    shape[`m05_${key}`] = tristateSchema;
    shape[`m06_${key}`] = tristateSchema.optional();
  });

  shape.m05_z_specify = z.string().optional();

  return shape;
}

export const sectionMSchema = z
  .object(buildSectionMShape())
  .superRefine((data, ctx) => {
    card1ProgramKeys.forEach((key) => {
      const m01 = data[`m01_${key}` as keyof typeof data] as TristateValue | undefined;
      const m02 = data[`m02_${key}` as keyof typeof data] as TristateValue | undefined;
      if (m01 === "1" && !m02) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `M02_${key} is required when M01_${key} is Yes.`,
          path: [`m02_${key}`],
        });
      }
    });

    if (data.m03 === "1" && !data.m04) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "M04 is required when M03 is Yes.",
        path: ["m04"],
      });
    }

    card3ProgramKeys.forEach((key) => {
      const m05 = data[`m05_${key}` as keyof typeof data] as TristateValue | undefined;
      const m06 = data[`m06_${key}` as keyof typeof data] as TristateValue | undefined;
      if (m05 === "1" && !m06) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `M06_${key} is required when M05_${key} is Yes.`,
          path: [`m06_${key}`],
        });
      }
    });

    if (data.m05_Z === "1" && !data.m05_z_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other government program.",
        path: ["m05_z_specify"],
      });
    }
  });

export type SectionMFormValues = z.infer<typeof sectionMSchema>;

export function fillTristateDefaults(
  partial: Partial<SectionMFormValues> = {},
  defaultValue: TristateValue = "2",
): SectionMFormValues {
  const values: Record<string, unknown> = {
    m03: defaultValue,
    m05_z_specify: "",
  };

  card1ProgramKeys.forEach((key) => {
    values[`m01_${key}`] = defaultValue;
    values[`m02_${key}`] = undefined;
  });

  card3ProgramKeys.forEach((key) => {
    values[`m05_${key}`] = defaultValue;
    values[`m06_${key}`] = undefined;
  });

  return { ...values, ...partial } as SectionMFormValues;
}

export const sectionMMockPersonas = [
  {
    id: "p1",
    name: "Covered & Active Beneficiary",
    defaultValues: fillTristateDefaults({
      m01_A: "1",
      m02_A: "1",
      m03: "1",
      m04: "1",
      m05_A: "1",
      m06_A: "1",
    }),
  },
  {
    id: "p2",
    name: "General No/Don't Know",
    defaultValues: fillTristateDefaults({
      m01_A: "2",
      m03: "8",
      m05_A: "2",
    }),
  },
  {
    id: "p3",
    name: "Other Program Custom Path",
    defaultValues: fillTristateDefaults({
      m05_Z: "1",
      m06_Z: "1",
      m05_z_specify: "LGU medical assistance program",
    }),
  },
] as const;
