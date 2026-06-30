export type HealthOption = {
  label: string;
  value: string;
};

export const yesNoBinaryOptions: HealthOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
];

export const f06Options: HealthOption[] = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
  { label: "8 Don't Know", value: "8" },
];

export const f09SexOptions: HealthOption[] = [
  { label: "1 Male", value: "1" },
  { label: "2 Female", value: "2" },
];

export const f04ReasonOptions: HealthOption[] = [
  { label: "1 Facility is far", value: "1" },
  { label: "2 No money", value: "2" },
  { label: "3 Worried about cost", value: "3" },
  { label: "4 Home remedy", value: "4" },
  { label: "5 Not PhilHealth member", value: "5" },
  { label: "6 Will heal eventually", value: "6" },
  { label: "9 Others (specify)", value: "9" },
];

export const f03PublicOptions: HealthOption[] = [
  { label: "A Regional", value: "A" },
  { label: "B Provincial", value: "B" },
  { label: "C District", value: "C" },
  { label: "D Municipal", value: "D" },
  { label: "E RHU/UHC", value: "E" },
  { label: "F BHS", value: "F" },
  { label: "G Mobile", value: "G" },
  { label: "H Isolation", value: "H" },
  { label: "I Other Public", value: "I" },
];

export const f03PrivateOptions: HealthOption[] = [
  { label: "J Private Hosp", value: "J" },
  { label: "K Lying-in", value: "K" },
  { label: "L Private Clinic", value: "L" },
  { label: "M Pharmacy", value: "M" },
  { label: "N Mobile", value: "N" },
  { label: "O Other Private", value: "O" },
];

export const f03AlternativeOptions: HealthOption[] = [
  { label: "P Hilot", value: "P" },
  { label: "Q Massage", value: "Q" },
  { label: "R Other Alt", value: "R" },
];

export const f03NonMedicalOptions: HealthOption[] = [
  { label: "S Drugstore", value: "S" },
  { label: "T Faith Healer", value: "T" },
  { label: "Z Other", value: "Z" },
];

export const f03FacilityCategories = [
  { id: "public", title: "Public", options: f03PublicOptions },
  { id: "private", title: "Private", options: f03PrivateOptions },
  { id: "alternative", title: "Alternative", options: f03AlternativeOptions },
  { id: "non-medical", title: "Non-Medical", options: f03NonMedicalOptions },
] as const;
