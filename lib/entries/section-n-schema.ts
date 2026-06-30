import * as z from "zod";
import { getSectionNVisibility } from "@/lib/entries/section-n-visibility";

export const sectionNSchema = z
  .object({
    n01: z.string().min(1, "N01 is required."),
    n01_specify: z.string().optional(),
    n02: z.string().min(1, "N02 is required."),
    n03: z.string().min(1, "N03 is required."),
    n04: z.string().optional(),
    n05_minutes: z.string().optional(),
    n05_no_collect: z.boolean().optional(),
    n05_dont_know: z.boolean().optional(),
    n06_name: z.string().optional(),
    n06_not_member: z.boolean().optional(),
    n07: z.string().optional(),
    n08: z.string().min(1, "N08 is required."),
    n08_specify: z.string().optional(),
    n09: z.string().optional(),
    n10: z.string().optional(),
    n11: z.string().optional(),
    n12: z.array(z.string()).min(1, "Select at least one waste disposal option (N12)."),
    n12_z_specify: z.string().optional(),
    n13: z.string().min(1, "N13 is required."),
    n13_specify: z.string().optional(),
    n14: z.string().optional(),
    n15: z.string().optional(),
    n16: z.array(z.string()).optional(),
    n16_z_specify: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const visibility = getSectionNVisibility(data);

    if (data.n01 === "99" && !data.n01_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other water source (N01).",
        path: ["n01_specify"],
      });
    }

    if (visibility.showN04 && !data.n04) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "N04 is required.",
        path: ["n04"],
      });
    }

    if (visibility.showN05) {
      const hasMinutes = Boolean(data.n05_minutes?.trim());
      const hasSpecial = data.n05_no_collect || data.n05_dont_know;
      if (!hasMinutes && !hasSpecial) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter minutes or select a special code for N05.",
          path: ["n05_minutes"],
        });
      }
    }

    if (visibility.showN06 && !data.n06_not_member && !data.n06_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter fetcher name or mark as not a household member (N06).",
        path: ["n06_name"],
      });
    }

    if (visibility.showN07 && !data.n07?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "N07 is required.",
        path: ["n07"],
      });
    }

    if ((data.n08 === "22" || data.n08 === "99") && !data.n08_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify toilet facility (N08).",
        path: ["n08_specify"],
      });
    }

    if (visibility.showN09 && !data.n09) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "N09 is required.", path: ["n09"] });
    }
    if (visibility.showN10 && !data.n10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "N10 is required.", path: ["n10"] });
    }
    if (visibility.showN11 && !data.n11) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "N11 is required.", path: ["n11"] });
    }

    if (data.n12.includes("Z") && !data.n12_z_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify other waste disposal (N12).",
        path: ["n12_z_specify"],
      });
    }

    if ((data.n13 === "3" || data.n13 === "9") && !data.n13_specify?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify handwashing place (N13).",
        path: ["n13_specify"],
      });
    }

    if (visibility.showN14 && !data.n14) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "N14 is required.", path: ["n14"] });
    }
    if (visibility.showN15 && !data.n15) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "N15 is required.", path: ["n15"] });
    }
    if (visibility.showN16) {
      if (!data.n16?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Select at least one cleansing agent (N16).",
          path: ["n16"],
        });
      } else if (data.n16.includes("Z") && !data.n16_z_specify?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify other cleansing agent (N16).",
          path: ["n16_z_specify"],
        });
      }
    }
  });

export type SectionNFormValues = z.infer<typeof sectionNSchema>;

export const emptySectionNValues: SectionNFormValues = {
  n01: "",
  n01_specify: "",
  n02: "",
  n03: "",
  n04: undefined,
  n05_minutes: "",
  n05_no_collect: false,
  n05_dont_know: false,
  n06_name: "",
  n06_not_member: false,
  n07: "",
  n08: "",
  n08_specify: "",
  n09: undefined,
  n10: undefined,
  n11: undefined,
  n12: [],
  n12_z_specify: "",
  n13: "",
  n13_specify: "",
  n14: undefined,
  n15: undefined,
  n16: [],
  n16_z_specify: "",
};

export const sectionNMockPersonas = [
  {
    id: "p1",
    name: "Piped Water (Fast Path)",
    defaultValues: {
      ...emptySectionNValues,
      n01: "01",
      n02: "11",
      n03: "11",
      n08: "11",
      n12: ["B"],
      n13: "1",
      n14: "1",
      n15: "1",
      n16: ["A"],
    } satisfies SectionNFormValues,
  },
  {
    id: "p2",
    name: "Remote Water Source",
    defaultValues: {
      ...emptySectionNValues,
      n01: "03",
      n02: "03",
      n03: "04",
      n04: "3",
      n05_minutes: "25",
      n06_name: "SANTOS, MARIA R.",
      n07: "450",
      n08: "12",
      n09: "2",
      n10: "1",
      n11: "1",
      n12: ["A", "B"],
      n13: "2",
      n14: "1",
      n15: "1",
      n16: ["A", "B"],
    } satisfies SectionNFormValues,
  },
  {
    id: "p3",
    name: "Open Defecation / No Wash",
    defaultValues: {
      ...emptySectionNValues,
      n01: "10",
      n02: "10",
      n03: "10",
      n04: "3",
      n08: "95",
      n12: ["F", "I"],
      n13: "4",
    } satisfies SectionNFormValues,
  },
] as const;
