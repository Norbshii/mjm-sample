export type EconomicOption = {
  label: string;
  value: string;
};

export type EconomicOptionGroup = {
  label: string;
  options: EconomicOption[];
};

export const yesNoBinaryOptions: EconomicOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
];

export const e01Options: EconomicOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
];

export const e02Options: EconomicOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
  { label: "3 No, Temporarily", value: "3" },
];

export const e07Options: EconomicOption[] = [
  { label: "1 Permanent job/business/unpaid family work", value: "1" },
  {
    label: "2 Short-term or seasonal or casual job/business, unpaid family work",
    value: "2",
  },
  {
    label: "3 Worked for different employers or customers on day-to-day or week-to-week basis",
    value: "3",
  },
];

export const e08Options: EconomicOption[] = [
  { label: "0 Worked for private household", value: "0" },
  { label: "1 Worked for private establishment", value: "1" },
  { label: "2 Worked for government/GOCC", value: "2" },
  { label: "3 Self-employed without paid employee", value: "3" },
  { label: "4 Employer in own family-operated farm or business", value: "4" },
  {
    label: "5 Worked with pay in own family-operated farm or business",
    value: "5",
  },
  {
    label: "6 Worked without pay in own family-operated farm or business",
    value: "6",
  },
];

export const e09Options: EconomicOption[] = [
  { label: "0 In kind, imputed (received as wage/salary)", value: "0" },
  { label: "1 Per piece", value: "1" },
  { label: "2 Per hour", value: "2" },
  { label: "3 Per day", value: "3" },
  { label: "4 Monthly", value: "4" },
  { label: "5 Pakyaw", value: "5" },
  { label: "6 Other salaries/wages, specify", value: "6" },
  { label: "7 Not salaries/wages (e.g. commission basis), specify", value: "7" },
];

export const e14Options: EconomicOption[] = [
  { label: "01 Temporary illness or disability", value: "01" },
  { label: "02 Bad weather", value: "02" },
  { label: "03 Waiting for rehire/job recall", value: "03" },
  { label: "04 Tired/believed no work available", value: "04" },
  { label: "05 Awaiting results of previous job application", value: "05" },
  { label: "06 Too young/old", value: "06" },
  { label: "07 Retired", value: "07" },
  { label: "08 Permanent disability/illness", value: "08" },
  { label: "09 Schooling", value: "09" },
  { label: "10 Household and family duties, specify", value: "10" },
  { label: "99 Others, specify", value: "99" },
];

// Mock PSOC (Philippine Standard Occupational Classification)
export const psocOptionGroups: EconomicOptionGroup[] = [
  {
    label: "Major Group 1 — Managers",
    options: [
      { label: "1111 Legislators and senior officials", value: "1111" },
      { label: "1211 Finance managers", value: "1211" },
      { label: "1311 Agricultural, forestry and fishery managers", value: "1311" },
    ],
  },
  {
    label: "Major Group 2 — Professionals",
    options: [
      { label: "2211 Medical doctors", value: "2211" },
      { label: "2311 University and higher education teachers", value: "2311" },
      { label: "2411 Accountants", value: "2411" },
    ],
  },
  {
    label: "Major Group 3 — Technicians",
    options: [
      { label: "3111 Chemical and physical science technicians", value: "3111" },
      { label: "3211 Medical imaging and therapeutic equipment technicians", value: "3211" },
    ],
  },
  {
    label: "Major Group 5 — Service and sales",
    options: [
      { label: "5111 Travel attendants and travel stewards", value: "5111" },
      { label: "5211 Street and market salespersons", value: "5211" },
      { label: "5223 Shop sales assistants", value: "5223" },
    ],
  },
  {
    label: "Major Group 7 — Craft and related trades",
    options: [
      { label: "7111 House builders", value: "7111" },
      { label: "7212 Welders and flame cutters", value: "7212" },
    ],
  },
  {
    label: "Major Group 9 — Elementary occupations",
    options: [
      { label: "9111 Domestic cleaners and helpers", value: "9111" },
      { label: "9211 Crop farm labourers", value: "9211" },
    ],
  },
];

// Mock PSIC (Philippine Standard Industrial Classification)
export const psicOptionGroups: EconomicOptionGroup[] = [
  {
    label: "Section A — Agriculture, forestry and fishing",
    options: [
      { label: "0111 Growing of cereals", value: "0111" },
      { label: "0141 Raising of cattle and buffaloes", value: "0141" },
    ],
  },
  {
    label: "Section C — Manufacturing",
    options: [
      { label: "1011 Processing and preserving of meat", value: "1011" },
      { label: "1071 Manufacture of bakery products", value: "1071" },
    ],
  },
  {
    label: "Section F — Construction",
    options: [
      { label: "4100 Construction of buildings", value: "4100" },
      { label: "4210 Construction of roads and railways", value: "4210" },
    ],
  },
  {
    label: "Section G — Wholesale and retail trade",
    options: [
      { label: "4711 Retail sale in non-specialized stores", value: "4711" },
      { label: "4771 Retail sale of clothing", value: "4771" },
    ],
  },
  {
    label: "Section I — Accommodation and food service",
    options: [
      { label: "5510 Short term accommodation activities", value: "5510" },
      { label: "5610 Restaurants and mobile food service", value: "5610" },
    ],
  },
  {
    label: "Section O — Public administration",
    options: [
      { label: "8411 General public administration activities", value: "8411" },
      { label: "8421 Foreign affairs", value: "8421" },
    ],
  },
];
