export type GhiOption = {
  label: string;
  value: string;
  description?: string;
};

export const gMatrixColumns: GhiOption[] = [
  { label: "1 YES", value: "1" },
  { label: "2 NO", value: "2" },
  { label: "8 DON'T KNOW", value: "8" },
  { label: "9 PREFER NOT TO ANSWER", value: "9" },
];

export const gMatrixRows = [
  {
    id: "g01",
    code: "G01",
    question:
      "Was there a time when you (or any other adult in the household) were worried about not having enough food to eat because of a lack of money or other resources?",
  },
  {
    id: "g02",
    code: "G02",
    question:
      "Was there a time when you (or any other adult in the household) were unable to eat healthy and nutritious food because of a lack of money or other resources?",
  },
  {
    id: "g03",
    code: "G03",
    question:
      "Was there a time when you (or any other adult in the household) ate only a few kinds of food because of a lack of money or other resources?",
  },
  {
    id: "g04",
    code: "G04",
    question:
      "Was there a time when you (or any other adult in the household) had to skip a meal because there was not enough money or other resources to get food?",
  },
  {
    id: "g05",
    code: "G05",
    question:
      "Was there a time when you (or any other adult in the household) ate less than you thought you should because of a lack of money or other resources?",
  },
  {
    id: "g06",
    code: "G06",
    question:
      "Was there a time when you or your household ran out of food because of a lack of money or other resources?",
  },
  {
    id: "g07",
    code: "G07",
    question:
      "Was there a time when you (or any other adult in the household) were hungry but did not eat because there was not enough money or other resources for food?",
  },
  {
    id: "g08",
    code: "G08",
    question:
      "Was there a time when you (or any other adult in the household) went without eating for a whole day because of a lack of money or other resources?",
  },
] as const;

export const h01Options: GhiOption[] = [
  { label: "1 YES", value: "1" },
  { label: "2 NO", value: "2" },
];

export const i01Options: GhiOption[] = [
  {
    label: "A — Bank account",
    value: "A",
    description: "ATM, online/electronic banking, passbook, CIMB",
  },
  {
    label: "B — Digital bank account",
    value: "B",
    description: "UNObank, Union Digital Bank, GoTyme, Overseas Filipino Bank, Tonik, Maya Bank",
  },
  {
    label: "C — E-money account",
    value: "C",
    description: "G-Cash, Maya, or cash card",
  },
  {
    label: "D — NSSLA account",
    value: "D",
    description: "Non-Stock Savings and Loan Association (e.g., AFPSLAI, Manila Teachers SLA)",
  },
  { label: "E — Cooperatives", value: "E", description: "Account with cooperatives" },
  {
    label: "F — Microfinance NGO",
    value: "F",
    description: "CARD, ASA, and similar institutions",
  },
  {
    label: "G — Money remittance centers",
    value: "G",
    description: "Palawan Express, LBC, ML Kwarta Padala, Western Union",
  },
  { label: "X — Prefer not to answer", value: "X" },
  { label: "Y — None", value: "Y" },
  { label: "Z — Others, specify", value: "Z" },
];

export const I01_EXCLUSIVE = new Set(["X", "Y"]);
export const I01_REGULAR = new Set(["A", "B", "C", "D", "E", "F", "G", "Z"]);

export function normalizeI01Selection(current: string[], toggled: string): string[] {
  if (I01_EXCLUSIVE.has(toggled)) {
    return current.includes(toggled) ? [] : [toggled];
  }

  const withoutExclusive = current.filter((value) => !I01_EXCLUSIVE.has(value));
  if (withoutExclusive.includes(toggled)) {
    return withoutExclusive.filter((value) => value !== toggled);
  }
  return [...withoutExclusive, toggled];
}

export function isI01OptionDisabled(current: string[], optionValue: string): boolean {
  const hasExclusive = current.some((value) => I01_EXCLUSIVE.has(value));
  if (hasExclusive) {
    return !current.includes(optionValue);
  }
  return false;
}
