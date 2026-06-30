export type HousingOption = {
  label: string;
  value: string;
};

export const o01Options: HousingOption[] = [
  { value: "01", label: "01 Single house" },
  { value: "02", label: "02 Duplex" },
  { value: "03", label: "03 Apartment/accessoria/row house" },
  { value: "04", label: "04 Condominium/condotel" },
  { value: "05", label: "05 Other multi-unit residential building" },
  { value: "06", label: "06 Commercial/industrial/agricultural" },
  { value: "07", label: "07 Institutional living quarter" },
  { value: "08", label: "08 None" },
  { value: "09", label: "09 Other types of building" },
  { value: "10", label: "10 Temporary evacuation center" },
];

export const o03Options: HousingOption[] = [
  { value: "1", label: "1 Metal roofing sheets" },
  { value: "2", label: "2 Concrete/clay/slate tile" },
  { value: "3", label: "3 Half galvanized iron and half concrete" },
  { value: "4", label: "4 Wood/bamboo" },
  { value: "5", label: "5 Sod/thatch" },
  { value: "6", label: "6 Asbestos" },
  { value: "7", label: "7 Makeshift/salvaged/improvised" },
  { value: "9", label: "9 Others, specify" },
];

export const o04Options: HousingOption[] = [
  { value: "01", label: "01 Concrete/brick/stone" },
  { value: "02", label: "02 Metal sheet" },
  { value: "03", label: "03 Half concrete/brick/stone and half wood" },
  { value: "04", label: "04 Glass" },
  { value: "05", label: "05 Wood/bamboo" },
  { value: "06", label: "06 Sawali/cogon/nipa" },
  { value: "07", label: "07 Asbestos" },
  { value: "08", label: "08 Makeshift/salvaged/improvised" },
  { value: "09", label: "09 Fiber cement board" },
  { value: "99", label: "99 Others, specify" },
];

export const o05Options: HousingOption[] = [
  { value: "1", label: "1 Ceramic tile/marble/granite" },
  { value: "2", label: "2 Cement/brick/stone" },
  { value: "3", label: "3 Wood/bamboo plank" },
  { value: "4", label: "4 Wood tile/parquet" },
  { value: "5", label: "5 Vinyl/carpet tile" },
  { value: "6", label: "6 Linoleum" },
  { value: "7", label: "7 None" },
  { value: "9", label: "9 Others, specify" },
];

export const o06Options: HousingOption[] = [
  { value: "1", label: "1 Concrete" },
  { value: "2", label: "2 Earth/sand/mud" },
  { value: "3", label: "3 Wood" },
  { value: "4", label: "4 Coconut lumber" },
  { value: "5", label: "5 Bamboo" },
  { value: "6", label: "6 Makeshift/salvaged/improvised" },
  { value: "7", label: "7 Fiber cement board" },
  { value: "8", label: "8 Not observed" },
  { value: "9", label: "9 Others, specify" },
];

export const o09TenureOptions: HousingOption[] = [
  { value: "1", label: "1 Own or owner-like possession" },
  { value: "2", label: "2 Own house/rent lot" },
  { value: "3", label: "3 Own house/rent-free lot with consent" },
  { value: "4", label: "4 Own house/rent-free lot without consent" },
  { value: "5", label: "5 Rent house/including lot" },
  { value: "6", label: "6 Rent-free house and lot with consent" },
  { value: "7", label: "7 Rent-free house and lot without consent" },
];

export const o12Options: HousingOption[] = [
  { value: "1", label: "1 Electricity" },
  { value: "2", label: "2 Kerosene" },
  { value: "3", label: "3 LPG" },
  { value: "4", label: "4 Oil" },
  { value: "5", label: "5 Solar panel/lamp" },
  { value: "6", label: "6 Candle" },
  { value: "7", label: "7 Battery" },
  { value: "8", label: "8 None" },
  { value: "9", label: "9 Others, specify" },
];

export const o13Options: HousingOption[] = [
  { value: "1", label: "1 Electricity" },
  { value: "2", label: "2 Kerosene" },
  { value: "3", label: "3 LPG" },
  { value: "4", label: "4 Charcoal" },
  { value: "5", label: "5 Wood" },
  { value: "6", label: "6 None" },
  { value: "9", label: "9 Others, specify" },
];

export const yesNoBinaryOptions: HousingOption[] = [
  { value: "1", label: "1 YES" },
  { value: "2", label: "2 NO" },
];

export const o14Items = [
  { key: "A", label: "A Refrigerator/Freezer" },
  { key: "B", label: "B Air conditioner" },
  { key: "C", label: "C Washing Machine" },
  { key: "D", label: "D Stove with oven/Gas range" },
  { key: "E", label: "E Radio" },
  { key: "F", label: "F Television" },
  { key: "G", label: "G Audio component/Stereo" },
  { key: "H", label: "H Landline/Wireless telephone" },
  { key: "I", label: "I Cellular phone (basic)" },
  { key: "J", label: "J Cellular phone (smart)" },
  { key: "K", label: "K Tablet" },
  { key: "L", label: "L Personal computer" },
  { key: "M", label: "M Car" },
  { key: "N", label: "N Van" },
  { key: "O", label: "O Jeep" },
  { key: "P", label: "P Truck" },
  { key: "Q", label: "Q Motorcycle/Motor scooter" },
  { key: "R", label: "R E-bike" },
  { key: "S", label: "S Tricycle" },
  { key: "T", label: "T Bicycle" },
  { key: "U", label: "U Pedicab" },
  { key: "V", label: "V Motorized boat/Banca" },
  { key: "W", label: "W Non-motorized boat/Banca" },
] as const;

export type O14Key = (typeof o14Items)[number]["key"];

export const o14Keys = o14Items.map((item) => item.key);

export const housingSearchGroup = (label: string, options: HousingOption[]) => [{ label, options }];
