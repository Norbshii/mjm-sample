export type TristateValue = "1" | "2" | "8";

export type TristateOption = {
  label: string;
  value: TristateValue;
};

export const tristateOptions: TristateOption[] = [
  { label: "1 YES", value: "1" },
  { label: "2 NO", value: "2" },
  { label: "8 DON'T KNOW", value: "8" },
];

export const card1ProgramKeys = ["A", "B", "C", "D"] as const;
export type Card1ProgramKey = (typeof card1ProgramKeys)[number];

export const card3ProgramKeys = ["A", "B", "C", "D", "E", "F", "G", "Z"] as const;
export type Card3ProgramKey = (typeof card3ProgramKeys)[number];

export const card1Programs: Array<{ key: Card1ProgramKey; label: string }> = [
  { key: "A", label: "Social Security System (SSS)" },
  { key: "B", label: "Government Service Insurance System (GSIS)" },
  { key: "C", label: "PhilHealth" },
  {
    key: "D",
    label:
      "Health/Medical Insurance other than PhilHealth (e.g., MediCard, Maxicare, LGU Health card, cooperative health card)",
  },
];

export const card3Programs: Array<{ key: Card3ProgramKey; label: string }> = [
  { key: "A", label: "Pantawid Pamilyang Pilipino Program (4Ps)" },
  { key: "B", label: "Social Pension for Indigent Senior Citizen (SPISC or SocPen)" },
  { key: "C", label: "Assistance to Individuals in Crisis Situation (AICS)" },
  { key: "D", label: "Walang Gutom 2027 Food Stamp Program" },
  {
    key: "E",
    label:
      "Education Assistance Programs (e.g., UAQTE, TES, SHS VP, GASTPE, E-GASTPE, and similar programs)",
  },
  {
    key: "F",
    label:
      "Employment Assistance/Livelihood Program (e.g., TUPAD, Cash-for-Work, SLP, DILEEP, and similar programs)",
  },
  { key: "G", label: "Any form of assistance from LGU" },
  { key: "Z", label: "Other government programs (SPECIFY)" },
];
