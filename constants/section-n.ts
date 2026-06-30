export type WashOption = {
  label: string;
  value: string;
};

export const n01Options: WashOption[] = [
  { value: "01", label: "01 Piped into dwelling" },
  { value: "02", label: "02 Piped into yard/plot" },
  { value: "03", label: "03 Public tap/standpipe" },
  { value: "04", label: "04 Protected well/tube well/borehole" },
  { value: "05", label: "05 Protected spring" },
  { value: "06", label: "06 Rainwater" },
  { value: "07", label: "07 Tanker truck/peddler/neighbor" },
  { value: "08", label: "08 Unprotected (open dug well)" },
  { value: "09", label: "09 Unprotected spring" },
  { value: "10", label: "10 Surface water (river, dam, lake, pond, etc.)" },
  { value: "99", label: "99 Others" },
];

export const n02n03Options: WashOption[] = [
  ...n01Options,
  { value: "11", label: "11 Piped community water system" },
  { value: "12", label: "12 Piped water (other)" },
  { value: "61", label: "61 Water vendor" },
  { value: "71", label: "71 Bottled water" },
  { value: "72", label: "72 Sachet water" },
  { value: "91", label: "91 Tanker truck (other)" },
];

export const n04Options: WashOption[] = [
  { value: "1", label: "1 In own dwelling" },
  { value: "2", label: "2 In own yard/plot" },
  { value: "3", label: "3 Elsewhere" },
];

export const n08Options: WashOption[] = [
  { value: "11", label: "11 Flush to piped sewer" },
  { value: "12", label: "12 Flush to septic tank" },
  { value: "13", label: "13 Flush to pit latrine" },
  { value: "21", label: "21 Ventilated improved latrine" },
  { value: "22", label: "22 Pit latrine with slab" },
  { value: "31", label: "31 Composting toilet" },
  { value: "14", label: "14 Flush to somewhere else/open drain" },
  { value: "23", label: "23 Pit latrine without slab/open pit" },
  { value: "41", label: "41 Bucket/pail system" },
  { value: "51", label: "51 Hanging toilet/latrine" },
  { value: "15", label: "15 Flush to don't know where" },
  { value: "71", label: "71 Public toilet" },
  { value: "95", label: "95 No facility/Open defecation" },
  { value: "99", label: "99 Others" },
];

export const n09Options: WashOption[] = [
  { value: "1", label: "1 In own dwelling" },
  { value: "2", label: "2 In own yard/plot" },
  { value: "3", label: "3 Elsewhere" },
];

export const yesNoBinaryOptions: WashOption[] = [
  { value: "1", label: "1 YES" },
  { value: "2", label: "2 NO" },
];

export const n11Options: WashOption[] = [
  { value: "1", label: "1 Known household" },
  { value: "2", label: "2 General public" },
];

export const n12Options: WashOption[] = [
  { value: "A", label: "A Segregating" },
  { value: "B", label: "B Garbage truck" },
  { value: "C", label: "C Recycling/reusing" },
  { value: "D", label: "D Selling/giving recyclables" },
  { value: "E", label: "E Composting" },
  { value: "F", label: "F Burning" },
  { value: "G", label: "G Dumping in pit with cover" },
  { value: "H", label: "H Dumping in pit without cover" },
  { value: "I", label: "I Throwing in uninhabited locations" },
  { value: "Z", label: "Z Others" },
];

export const n13Options: WashOption[] = [
  { value: "1", label: "1 In dwelling" },
  { value: "2", label: "2 In yard/plot" },
  { value: "3", label: "3 Bucket/jug/kettle" },
  { value: "4", label: "4 No place" },
  { value: "5", label: "5 No permission" },
  { value: "9", label: "9 Others" },
];

export const n14Options: WashOption[] = [
  { value: "1", label: "1 Water available" },
  { value: "2", label: "2 Not available" },
];

export const n16Options: WashOption[] = [
  { value: "A", label: "A Bar or liquid soap" },
  { value: "B", label: "B Detergent" },
  { value: "C", label: "C Ash/soil/sand" },
  { value: "Z", label: "Z Others" },
];

export const PIPED_WATER_CODES = new Set(["11", "12"]);
export const SKIP_N04_WATER_CODES = new Set(["61", "71", "72", "91"]);
export const SANITATION_SKIP_CODES = new Set(["71", "95"]);
export const HYGIENE_SKIP_CODES = new Set(["4", "5", "9"]);

export const washSearchGroup = (label: string, options: WashOption[]) => [{ label, options }];
