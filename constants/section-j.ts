export type SectionJOption = {
  value: string;
  label: string;
};

export const j01OptionKeys = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "Z",
] as const;

export type J01OptionKey = (typeof j01OptionKeys)[number];

export type J01CaptureValue = "1" | "2";

export const j01Options: SectionJOption[] = [
  { value: "A", label: "A — Typhoon" },
  { value: "B", label: "B — Power outage" },
  { value: "C", label: "C — Drought" },
  { value: "D", label: "D — Too much rain or flood" },
  { value: "E", label: "E — Erosion, cracks, landslides" },
  { value: "F", label: "F — Earthquake" },
  { value: "G", label: "G — Volcanic eruption" },
  { value: "H", label: "H — Fire" },
  { value: "I", label: "I — Pests or diseases that affected crops before they were harvested" },
  { value: "J", label: "J — Pests or diseases that affected livestock/poultry" },
  { value: "K", label: "K — Pests or disease that led to losses of stored crops" },
  { value: "L", label: "L — Crops failed" },
  { value: "M", label: "M — Livestock/poultry died" },
  { value: "N", label: "N — Pollution caused by mining" },
  { value: "O", label: "O — Building collapsed" },
  { value: "P", label: "P — Increase in prices" },
  { value: "Q", label: "Q — Political conflict" },
  { value: "R", label: "R — Death of household member" },
  { value: "S", label: "S — Illness/injury of household member" },
  { value: "T", label: "T — No water supply" },
  { value: "Z", label: "Z — Others, specify" },
];

export const yesNoBinaryOptions: SectionJOption[] = [
  { label: "1 YES", value: "1" },
  { label: "2 NO", value: "2" },
];

export function createEmptyJ01Values(): Record<J01OptionKey, J01CaptureValue> {
  return Object.fromEntries(j01OptionKeys.map((key) => [key, "2"])) as Record<
    J01OptionKey,
    J01CaptureValue
  >;
}
