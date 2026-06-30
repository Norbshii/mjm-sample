import {
  HYGIENE_SKIP_CODES,
  PIPED_WATER_CODES,
  SANITATION_SKIP_CODES,
  SKIP_N04_WATER_CODES,
} from "@/constants/section-n";
export type SectionNVisibilityInput = {
  n02?: string;
  n03?: string;
  n04?: string;
  n08?: string;
  n10?: string;
  n13?: string;
  n15?: string;
  n05_no_collect?: boolean;
  n05_dont_know?: boolean;
};

export type SectionNVisibility = {
  showN04: boolean;
  showN05: boolean;
  showN06: boolean;
  showN07: boolean;
  showN09: boolean;
  showN10: boolean;
  showN11: boolean;
  showN14: boolean;
  showN15: boolean;
  showN16: boolean;
};

export function getSectionNVisibility(data: SectionNVisibilityInput): SectionNVisibility {
  const n02 = data.n02 ?? "";
  const n03 = data.n03 ?? "";
  const n04 = data.n04 ?? "";
  const n08 = data.n08 ?? "";
  const n10 = data.n10 ?? "";
  const n13 = data.n13 ?? "";
  const n15 = data.n15 ?? "";

  const hideWaterLocationBlock =
    PIPED_WATER_CODES.has(n02) || PIPED_WATER_CODES.has(n03);
  const skipN04Only =
    !hideWaterLocationBlock &&
    (SKIP_N04_WATER_CODES.has(n02) || SKIP_N04_WATER_CODES.has(n03));

  const showN04 = !hideWaterLocationBlock && !skipN04Only;
  const showN05 =
    !hideWaterLocationBlock && (skipN04Only || (showN04 && n04 === "3"));
  const showN06 =
    showN05 && !data.n05_no_collect && !data.n05_dont_know;
  const showN07 = showN06;

  const hideSanitationFollowUp = SANITATION_SKIP_CODES.has(n08);

  return {
    showN04,
    showN05,
    showN06,
    showN07,
    showN09: !hideSanitationFollowUp,
    showN10: !hideSanitationFollowUp,
    showN11: !hideSanitationFollowUp && n10 === "1",
    showN14: !HYGIENE_SKIP_CODES.has(n13),
    showN15: !HYGIENE_SKIP_CODES.has(n13),
    showN16: !HYGIENE_SKIP_CODES.has(n13) && n15 === "1",
  };
}
