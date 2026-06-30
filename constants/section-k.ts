export type SectionKOption = {
  label: string;
  value: string;
};

export const k03OptionKeys = ["A", "B", "C", "D"] as const;
export type K03OptionKey = (typeof k03OptionKeys)[number];
export type K03CaptureValue = "1" | "2";

export const yesNoBinaryOptions: SectionKOption[] = [
  { label: "1 YES", value: "1" },
  { label: "2 NO", value: "2" },
];

export const k03Options = [
  {
    value: "A" as const,
    title: "FIXED (WIRED) NARROWBAND/BROADBAND NETWORK",
    examples:
      "e.g., via Digital Subscriber Line (DSL), cable modem, high speed leased line, fiber-to-the-home/building, powerline, and other fixed (wired) broadband",
  },
  {
    value: "B" as const,
    title: "FIXED (WIRELESS) BROADBAND NETWORK",
    examples: "e.g., via WiMAX and fixed Code Division Multiple Access (CDMA)",
  },
  {
    value: "C" as const,
    title: "SATELLITE BROADBAND NETWORK",
    examples: "",
  },
  {
    value: "D" as const,
    title: "MOBILE BROADBAND NETWORK",
    examples:
      "e.g., via handset, card (e.g., integrated SIM card) or USB modem",
  },
];

export function createEmptyK03Values(): Record<K03OptionKey, K03CaptureValue> {
  return Object.fromEntries(k03OptionKeys.map((key) => [key, "2"])) as Record<
    K03OptionKey,
    K03CaptureValue
  >;
}
