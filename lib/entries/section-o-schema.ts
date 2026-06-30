import * as z from "zod";
import { o14Keys } from "@/constants/section-o";
import { getSectionOVisibility } from "@/lib/entries/section-o-visibility";

const o14Shape = Object.fromEntries(
  o14Keys.map((key) => [key, z.coerce.number().min(0).max(99)]),
) as Record<(typeof o14Keys)[number], z.ZodNumber>;

export const sectionOSchema = z
  .object({
    o01: z.string().min(1, "O01 is required."),
    o01_specify: z.string().optional(),
    o02: z.string().optional(),
    o03: z.string().optional(),
    o03_specify: z.string().optional(),
    o04: z.string().optional(),
    o04_specify: z.string().optional(),
    o05: z.string().optional(),
    o05_specify: z.string().optional(),
    o06: z.string().optional(),
    o06_specify: z.string().optional(),
    o07: z.string().optional(),
    o08: z.string().optional(),
    o09: z.string().optional(),
    o10: z.string().optional(),
    o11: z.string().optional(),
    o12: z.string().optional(),
    o12_specify: z.string().optional(),
    o13: z.string().optional(),
    o13_specify: z.string().optional(),
    o14: z.object(o14Shape),
  })
  .superRefine((data, ctx) => {
    const visibility = getSectionOVisibility(data.o01);

    if (visibility.showO01Specify && !data.o01_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other building type (O01).",
        path: ["o01_specify"],
      });
    }

    if (visibility.endInterview) {
      return;
    }

    if (visibility.showBuildingDetails) {
      if (!data.o02?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O02 is required.", path: ["o02"] });
      } else if (!/^\d{1,3}$/.test(data.o02)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O02 must be 1–3 digits.",
          path: ["o02"],
        });
      }

      const requireSelect = (
        value: string | undefined,
        path: string,
        label: string,
        specifyValue: string | undefined,
        specifyPath: string,
        triggerValues: string[],
      ) => {
        if (!value) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${label} is required.`, path: [path] });
        } else if (triggerValues.includes(value) && !specifyValue?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Please specify ${label}.`,
            path: [specifyPath],
          });
        }
      };

      requireSelect(data.o03, "o03", "O03", data.o03_specify, "o03_specify", ["9"]);
      requireSelect(data.o04, "o04", "O04", data.o04_specify, "o04_specify", ["99"]);
      requireSelect(data.o05, "o05", "O05", data.o05_specify, "o05_specify", ["9"]);
      requireSelect(data.o06, "o06", "O06", data.o06_specify, "o06_specify", ["9"]);

      if (!data.o07?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O07 is required.", path: ["o07"] });
      }
      if (!data.o08?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O08 is required.", path: ["o08"] });
      }
    }

    if (visibility.showTenureBlock) {
      if (!data.o09) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O09 is required.", path: ["o09"] });
      }
      if (!data.o10?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O10 is required.", path: ["o10"] });
      } else if (!/^\d{4}$/.test(data.o10)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O10 must be a 4-digit year (YYYY).",
          path: ["o10"],
        });
      }
    }

    if (visibility.showUtilitiesBlock) {
      if (!data.o11) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O11 is required.", path: ["o11"] });
      }
      if (!data.o12) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O12 is required.", path: ["o12"] });
      } else if (data.o12 === "9" && !data.o12_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify lighting fuel (O12).",
          path: ["o12_specify"],
        });
      }
      if (!data.o13) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "O13 is required.", path: ["o13"] });
      } else if (data.o13 === "9" && !data.o13_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify cooking fuel (O13).",
          path: ["o13_specify"],
        });
      }
    }
  });

export type SectionOFormValues = z.infer<typeof sectionOSchema>;

export function createEmptyO14Values(): SectionOFormValues["o14"] {
  return Object.fromEntries(o14Keys.map((key) => [key, 0])) as SectionOFormValues["o14"];
}

export const emptySectionOValues: SectionOFormValues = {
  o01: "",
  o01_specify: "",
  o02: "",
  o03: "",
  o03_specify: "",
  o04: "",
  o04_specify: "",
  o05: "",
  o05_specify: "",
  o06: "",
  o06_specify: "",
  o07: "",
  o08: "",
  o09: "",
  o10: "",
  o11: "",
  o12: "",
  o12_specify: "",
  o13: "",
  o13_specify: "",
  o14: createEmptyO14Values(),
};

const standardHouseDefaults: Partial<SectionOFormValues> = {
  o01: "01",
  o02: "1",
  o03: "1",
  o04: "01",
  o05: "2",
  o06: "1",
  o07: "48",
  o08: "2",
  o09: "1",
  o10: "1998",
  o11: "1",
  o12: "1",
  o13: "3",
  o14: {
    ...createEmptyO14Values(),
    A: 1,
    F: 1,
    I: 2,
    M: 0,
  },
};

export const sectionOMockPersonas = [
  {
    id: "p1",
    name: "Standard Single House",
    defaultValues: { ...emptySectionOValues, ...standardHouseDefaults },
  },
  {
    id: "p2",
    name: "Temporary Evacuation Center",
    defaultValues: { ...emptySectionOValues, o01: "10" },
  },
  {
    id: "p3",
    name: "Other Building Type",
    defaultValues: {
      ...emptySectionOValues,
      o01: "09",
      o01_specify: "Converted storage warehouse",
      o11: "1",
      o12: "1",
      o13: "3",
      o14: { ...createEmptyO14Values(), E: 1, F: 1 },
    },
  },
] as const;
