export type SectionDef = {
  id: string;
  title: string;
  description: string;
  questions: Array<{ id: string; label: string; required: boolean; placeholder: string }>;
};

export type HouseholdMember = {
  id: number;
  a01LastName: string;
  a01FirstName: string;
  a01MiddleName: string;
  a01Suffix: string;
  a02Relationship: string;
  a02Specify: string;
  a03Sex: string;
  a04DateOfBirth: string;
  a05Age: string;
  a06BirthRegistration: string;
  a07MaritalStatus: string;
  a08Religion: string;
  a08Specify: string;
  a09Ethnicity: string;
  a09Specify: string;
  a10FunctionalDifficulty: boolean;
  a11HighestGradeCompleted: string;
};

export const sectionDefs: SectionDef[] = [
  { id: "A", title: "Core Demographics", description: "Identity and civil profile fields.", questions: [] },
  { id: "B", title: "Health & Difficulties", description: "Disability and functional limitations.", questions: [] },
  { id: "C", title: "Migration", description: "Overseas Filipino and displacement details.", questions: [] },
  {
    id: "D",
    title: "Education",
    description: "Education indicators and attendance.",
    questions: [
      { id: "d01", label: "Highest Grade Completed", required: true, placeholder: "e.g. Grade 10" },
      { id: "d02", label: "Currently Attending School", required: true, placeholder: "Yes / No" },
    ],
  },
  { id: "E", title: "Labor & Employment", description: "Nature of work and worker class.", questions: [] },
  { id: "F", title: "Health", description: "Medical facility access and usage.", questions: [] },
  { id: "G", title: "Food Security", description: "Household food access situation.", questions: [] },
  {
    id: "H",
    title: "Public Transportation",
    description: "Household access to public transportation within walking distance.",
    questions: [],
  },
  { id: "I", title: "Finance", description: "Financial account ownership and access.", questions: [] },
  {
    id: "J",
    title: "Negative Shocks & Preparedness",
    description: "Disasters experienced and household emergency preparedness.",
    questions: [],
  },
  {
    id: "K",
    title: "Internet Access",
    description: "Household internet access and connection types at home.",
    questions: [],
  },
  {
    id: "L",
    title: "Public Safety",
    description: "Perceived neighborhood safety when walking at night.",
    questions: [],
  },
  {
    id: "M",
    title: "Social Protection",
    description: "Social protection and assistance program participation.",
    questions: [],
  },
  { id: "N", title: "WASH", description: "Water source and waste practices.", questions: [] },
  {
    id: "O",
    title: "Housing Characteristics",
    description: "Building type, tenure, utilities, and household conveniences.",
    questions: [],
  },
];

export const relationshipOptions = [
  { label: "01 Head", value: "01" },
  { label: "02 Spouse", value: "02" },
  { label: "03 Son", value: "03" },
  { label: "04 Daughter", value: "04" },
  { label: "05 Stepson", value: "05" },
  { label: "06 Stepdaughter", value: "06" },
  { label: "07 Son-in-law", value: "07" },
  { label: "08 Daughter-in-law", value: "08" },
  { label: "09 Grandson", value: "09" },
  { label: "10 Granddaughter", value: "10" },
  { label: "11 Father", value: "11" },
  { label: "12 Mother", value: "12" },
  { label: "13 Brother", value: "13" },
  { label: "14 Sister", value: "14" },
  { label: "15 Nephew", value: "15" },
  { label: "16 Niece", value: "16" },
  { label: "17 Uncle", value: "17" },
  { label: "18 Aunt", value: "18" },
  { label: "19 Cousin", value: "19" },
  { label: "20 Grandfather", value: "20" },
  { label: "21 Grandmother", value: "21" },
  { label: "22 Father-in-law", value: "22" },
  { label: "23 Mother-in-law", value: "23" },
  { label: "24 House Helper", value: "24" },
  { label: "25 Boarder/Lodger", value: "25" },
  { label: "26 Other Non-relative", value: "26" },
];

export const maritalStatusOptions = [
  { label: "1 Single/Never Married", value: "1" },
  { label: "2 Married", value: "2" },
  { label: "3 Common-law", value: "3" },
  { label: "4 Widowed", value: "4" },
  { label: "5 Divorced", value: "5" },
  { label: "6 Separated", value: "6" },
  { label: "7 Annulled", value: "7" },
];

export const religionOptions = [
  { label: "01 Roman Catholic", value: "01" },
  { label: "02 Islam", value: "02" },
  { label: "03 Iglesia ni Cristo", value: "03" },
  { label: "04 Aglipayan", value: "04" },
  { label: "05 Evangelical/Protestant", value: "05" },
  { label: "06 Seventh-day Adventist", value: "06" },
  { label: "07 Jehovah's Witness", value: "07" },
  { label: "08 Born Again Christian", value: "08" },
  { label: "99 Others", value: "99" },
];

export const ethnicityOptions = [
  { label: "01 Tagalog", value: "01" },
  { label: "02 Cebuano", value: "02" },
  { label: "03 Ilocano", value: "03" },
  { label: "04 Bisaya", value: "04" },
  { label: "05 Hiligaynon", value: "05" },
  { label: "06 Bikol", value: "06" },
  { label: "07 Waray", value: "07" },
  { label: "08 Tausug", value: "08" },
  { label: "99 Others", value: "99" },
];

export const highestGradeGroups = [
  {
    label: "Level 0",
    options: [
      { label: "000 No Grade Completed", value: "000" },
      { label: "010 Nursery", value: "010" },
      { label: "020 Kindergarten", value: "020" },
    ],
  },
  {
    label: "Level 1 Primary",
    options: [
      { label: "101 Grade 1", value: "101" },
      { label: "102 Grade 2", value: "102" },
      { label: "103 Grade 3", value: "103" },
      { label: "104 Grade 4", value: "104" },
      { label: "105 Grade 5", value: "105" },
      { label: "106 Grade 6", value: "106" },
      { label: "110 Elementary Graduate", value: "110" },
      { label: "120 SPED", value: "120" },
      { label: "130 ALS Elementary", value: "130" },
    ],
  },
  {
    label: "Level 2 Lower Secondary",
    options: [
      { label: "201 Grade 7", value: "201" },
      { label: "202 Grade 8", value: "202" },
      { label: "203 Grade 9", value: "203" },
      { label: "204 Grade 10", value: "204" },
      { label: "210 Junior High School Graduate", value: "210" },
    ],
  },
  {
    label: "Level 3 Upper Secondary",
    options: [
      { label: "301 Grade 11", value: "301" },
      { label: "302 Grade 12", value: "302" },
      { label: "310 SHS Graduate - Academic", value: "310" },
      { label: "311 SHS Graduate - Arts and Design", value: "311" },
      { label: "312 SHS Graduate - Sports", value: "312" },
      { label: "313 SHS Graduate - TVL", value: "313" },
    ],
  },
  {
    label: "Levels 4-8 Post Secondary and Higher",
    options: [
      { label: "401 Post-Secondary Non-Tertiary", value: "401" },
      { label: "501 Short-Cycle Tertiary", value: "501" },
      { label: "601 Bachelor's Degree", value: "601" },
      { label: "701 Master's Degree", value: "701" },
      { label: "801 Doctoral Degree", value: "801" },
    ],
  },
];

export const disabilityOptions = [
  { label: "A Visual", value: "A" },
  { label: "B Deaf/Hearing", value: "B" },
  { label: "C Intellectual/Mental", value: "C" },
  { label: "D Physical", value: "D" },
  { label: "E Speech/Language", value: "E" },
  { label: "F Cancer", value: "F" },
  { label: "G Rare Disease", value: "G" },
  { label: "Z Others", value: "Z" },
];

export const functionalRows = [
  { id: "B13", question: "Difficulty seeing, even when wearing glasses?" },
  { id: "B14", question: "Difficulty hearing, even when using a hearing aid?" },
  { id: "B15", question: "Difficulty walking or climbing steps?" },
];

export const difficultyColumns = [
  { label: "1 No Difficulty", value: "1" },
  { label: "2 Some Difficulty", value: "2" },
  { label: "3 A Lot of Difficulty", value: "3" },
  { label: "4 Cannot Do at All", value: "4" },
];

export const migrationStatusOptions = [
  { label: "1 OFW with Contract", value: "1" },
  { label: "2 Other OFW (No Contract)", value: "2" },
  { label: "3 Student Abroad", value: "3" },
  { label: "4 Tourist", value: "4" },
  { label: "5 Other Overseas Filipino", value: "5" },
  { label: "6 No, Resident", value: "6" },
];

export const displacementOptions = [
  { label: "2 Natural Calamities", value: "2" },
  { label: "3 Man-made Disaster", value: "3" },
  { label: "4 Peace and Order", value: "4" },
  { label: "5 Refugee/Asylum Seeker", value: "5" },
  { label: "6 Relocation", value: "6" },
  { label: "8 Don't Know", value: "8" },
];

export const employmentNatureOptions = [
  { label: "1 Permanent", value: "1" },
  { label: "2 Short-term/Seasonal/Casual", value: "2" },
  { label: "3 Day-to-Day/Week-to-Week", value: "3" },
];

export const classWorkerOptions = [
  { label: "0 Private Household", value: "0" },
  { label: "1 Private Establishment", value: "1" },
  { label: "2 Government/GOCC", value: "2" },
  { label: "3 Self-Employed (no employees)", value: "3" },
  { label: "4 Employer in own farm/business", value: "4" },
  { label: "5 Worked with pay in own family farm/business", value: "5" },
  { label: "6 Worked without pay in own family farm/business", value: "6" },
];

export const publicFacilityOptions = [
  { label: "A Regional", value: "A" },
  { label: "B Provincial", value: "B" },
  { label: "C District", value: "C" },
  { label: "D Municipal", value: "D" },
  { label: "E RHU/UHC", value: "E" },
  { label: "F Barangay Health Station", value: "F" },
  { label: "G Mobile", value: "G" },
  { label: "H Isolation", value: "H" },
  { label: "I Other", value: "I" },
];

export const privateFacilityOptions = [
  { label: "J Hospital", value: "J" },
  { label: "K Lying-in", value: "K" },
  { label: "L Clinic", value: "L" },
  { label: "M Pharmacy", value: "M" },
  { label: "N Mobile", value: "N" },
  { label: "O Other", value: "O" },
];

export const gRows = [
  { id: "G01", question: "In the last 30 days, did your household worry food would run out?" },
  { id: "G02", question: "In the last 30 days, did food bought not last and no money to get more?" },
  { id: "G03", question: "In the last 30 days, were meals skipped because of lack of resources?" },
];

export const gColumns = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
  { label: "8 Don't Know", value: "8" },
  { label: "9 Prefer Not to Answer", value: "9" },
];

export const financeOptions = [
  { label: "A Bank", value: "A" },
  { label: "B Digital Bank", value: "B" },
  { label: "C E-money (GCash/Maya)", value: "C" },
  { label: "D Microfinance NGO", value: "D" },
  { label: "E Cooperatives", value: "E" },
  { label: "F Remittance Centers", value: "F" },
  { label: "G NSSLA", value: "G" },
  { label: "X Prefer not to answer", value: "X" },
  { label: "Y None", value: "Y" },
  { label: "Z Others", value: "Z" },
];

export const safetyOptions = [
  { label: "1 Very Safe", value: "1" },
  { label: "2 Safe", value: "2" },
  { label: "3 Unsafe", value: "3" },
  { label: "4 Very Unsafe", value: "4" },
  { label: "5 Never go out", value: "5" },
  { label: "8 Don't Know", value: "8" },
];

export const waterSourceOptions = [
  { label: "01 Piped into dwelling", value: "01" },
  { label: "02 Piped into yard", value: "02" },
  { label: "03 Public tap", value: "03" },
  { label: "04 Protected well", value: "04" },
  { label: "05 Protected spring", value: "05" },
  { label: "06 Rainwater", value: "06" },
  { label: "07 Tanker/Peddler", value: "07" },
  { label: "08 Unprotected well", value: "08" },
  { label: "09 Unprotected spring", value: "09" },
  { label: "10 Surface water", value: "10" },
  { label: "99 Others", value: "99" },
];

export const wasteDisposalOptions = [
  { label: "A Segregating", value: "A" },
  { label: "B Garbage Truck", value: "B" },
  { label: "C Recycling", value: "C" },
  { label: "D Selling recyclables", value: "D" },
  { label: "E Composting", value: "E" },
  { label: "F Burning", value: "F" },
  { label: "G Pit with cover", value: "G" },
  { label: "H Pit without cover", value: "H" },
  { label: "I Throwing in uninhabited locations", value: "I" },
  { label: "Z Others", value: "Z" },
];

export const housingMaterialOptions = [
  { label: "1 Concrete/Stone", value: "1" },
  { label: "2 Metal Sheets", value: "2" },
  { label: "3 Wood", value: "3" },
  { label: "4 Half-Concrete/Half-Wood", value: "4" },
  { label: "5 Bamboo/Thatch", value: "5" },
  { label: "6 Asbestos", value: "6" },
  { label: "7 Makeshift", value: "7" },
  { label: "8 Not Observed", value: "8" },
];
