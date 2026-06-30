export type EducationOption = {
  label: string;
  value: string;
};

export type EducationOptionGroup = {
  label: string;
  options: EducationOption[];
};

export const yesNoBinaryOptions: EducationOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
];

export const d03OptionGroups: EducationOptionGroup[] = [
  {
    label: "Level 0",
    options: [
      { label: "01000000 Nursery", value: "01000000" },
      { label: "02100000 Kindergarten", value: "02100000" },
    ],
  },
  {
    label: "Level 1",
    options: [
      { label: "10001101 Grade 1", value: "10001101" },
      { label: "10001102 Grade 2", value: "10001102" },
      { label: "10001103 Grade 3", value: "10001103" },
      { label: "10001104 Grade 4", value: "10001104" },
      { label: "10001105 Grade 5", value: "10001105" },
      { label: "10001106 Grade 6", value: "10001106" },
      { label: "10003001 Basic Literacy", value: "10003001" },
      { label: "10003002 A&E Elementary", value: "10003002" },
    ],
  },
  {
    label: "Level 2",
    options: [
      { label: "24001101 Grade 7", value: "24001101" },
      { label: "24001102 Grade 8", value: "24001102" },
      { label: "24001103 Grade 9", value: "24001103" },
      { label: "24001104 Grade 10", value: "24001104" },
      { label: "24003001 A&E JHS Level", value: "24003001" },
    ],
  },
  {
    label: "Level 3",
    options: [
      { label: "34001110 Grade 11 (Track Unknown)", value: "34001110" },
      { label: "34001120 Grade 12 (Track Unknown)", value: "34001120" },
      { label: "34001111 Grade 11 ABM", value: "34001111" },
      { label: "34001115 Grade 11 STEM", value: "34001115" },
      { label: "35000110 Grade 11 TVL", value: "35000110" },
      { label: "34002110 Grade 11 Arts/Design", value: "34002110" },
      { label: "34003110 Grade 11 Sports", value: "34003110" },
    ],
  },
  {
    label: "Level 4",
    options: [
      { label: "40000001 1st Year", value: "40000001" },
      { label: "40000002 2nd Year", value: "40000002" },
      { label: "40000003 3rd Year", value: "40000003" },
    ],
  },
  {
    label: "Level 5",
    options: [
      { label: "50000001 1st Year", value: "50000001" },
      { label: "50000002 2nd Year", value: "50000002" },
      { label: "50000003 3rd Year", value: "50000003" },
    ],
  },
  {
    label: "Level 6",
    options: [
      { label: "60000001 1st Year", value: "60000001" },
      { label: "60000002 2nd Year", value: "60000002" },
      { label: "60000003 3rd Year", value: "60000003" },
      { label: "60000004 4th Year", value: "60000004" },
      { label: "60000005 5th Year", value: "60000005" },
      { label: "60000006 6th Year", value: "60000006" },
    ],
  },
  {
    label: "Level 7",
    options: [
      { label: "70000010 Undergraduate", value: "70000010" },
      { label: "70000011 Extra Year", value: "70000011" },
    ],
  },
  {
    label: "Level 8",
    options: [
      { label: "80000010 Undergraduate", value: "80000010" },
      { label: "80000011 Extra Year", value: "80000011" },
    ],
  },
];

export const d04Options: EducationOption[] = [
  { label: "A IMPACT (Self-paced, Grades 1-6)", value: "A" },
  { label: "B HOME SCHOOL (K-12)", value: "B" },
  { label: "C MISOSA (Modular, Grades 4-6)", value: "C" },
  { label: "D NIGHT HIGH SCHOOL (Grades 7-12)", value: "D" },
  { label: "E OPEN HIGH SCHOOL (Grades 7-12)", value: "E" },
  { label: "F RURAL FARM SCHOOL (Grades 7-12)", value: "F" },
];

export const d06Options: EducationOption[] = [
  { label: "01 Accessibility", value: "01" },
  { label: "02 Illness", value: "02" },
  { label: "03 Disability", value: "03" },
  { label: "04 Pregnancy", value: "04" },
  { label: "05 Marriage", value: "05" },
  { label: "06 High Cost/Financial", value: "06" },
  { label: "07 Employment", value: "07" },
  { label: "08 Finished Schooling", value: "08" },
  { label: "09 Looking for work", value: "09" },
  { label: "10 Lack of personal interest", value: "10" },
  { label: "11 Too young", value: "11" },
  { label: "12 Bullying", value: "12" },
  { label: "13 Family matters", value: "13" },
  { label: "14 No/weak internet", value: "14" },
  { label: "15 Modular learning not preferred", value: "15" },
  { label: "16 School requirements problem", value: "16" },
  { label: "17 Lack of confidence", value: "17" },
  { label: "18 Oral health issue", value: "18" },
  { label: "99 Others (Specify)", value: "99" },
];
