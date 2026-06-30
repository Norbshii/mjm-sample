import type { HouseholdRosterMember, HouseholdRosterStatus } from "@/components/entries/HouseholdRoster";
import type { SectionMFormValues } from "@/lib/entries/section-m-schema";

export type MockHouseholdSectionMember = {
  id: string;
  name: string;
  relationship: string;
  age: number;
  status: HouseholdRosterStatus;
  sectionG: {
    g01?: string;
    g02?: string;
    g03?: string;
    g04?: string;
    g05?: string;
    g06?: string;
    g07?: string;
    g08?: string;
  };
  sectionH: {
    h01?: string;
  };
  sectionI: {
    i01?: string[];
    i01_z_specify?: string;
  };
  sectionM?: Partial<SectionMFormValues>;
};

export const mockHouseholdSections: MockHouseholdSectionMember[] = [
  {
    id: "ghi-m1",
    name: "MARIA SANTOS",
    relationship: "01 Head",
    age: 45,
    status: "completed",
    sectionG: {
      g01: "1",
      g02: "2",
      g03: "1",
      g04: "2",
      g05: "1",
      g06: "2",
      g07: "1",
      g08: "2",
    },
    sectionH: { h01: "1" },
    sectionI: { i01: ["A", "C"] },
    sectionM: {
      m01_A: "1",
      m02_A: "1",
      m01_B: "2",
      m01_C: "1",
      m02_C: "2",
      m01_D: "2",
      m03: "1",
      m04: "2",
      m05_A: "1",
      m06_A: "1",
      m05_B: "2",
      m05_C: "2",
      m05_D: "2",
      m05_E: "2",
      m05_F: "2",
      m05_G: "2",
      m05_Z: "2",
    },
  },
  {
    id: "ghi-m2",
    name: "JUAN SANTOS",
    relationship: "02 Spouse",
    age: 48,
    status: "pending",
    sectionG: {
      g01: "2",
      g02: "2",
      g03: "2",
      g04: "2",
      g05: "2",
      g06: "2",
      g07: "2",
      g08: "2",
    },
    sectionH: { h01: "2" },
    sectionI: { i01: ["Y"] },
    sectionM: {
      m01_A: "2",
      m01_B: "2",
      m01_C: "2",
      m01_D: "2",
      m03: "8",
      m05_A: "2",
      m05_B: "2",
      m05_C: "2",
      m05_D: "2",
      m05_E: "2",
      m05_F: "2",
      m05_G: "2",
      m05_Z: "2",
    },
  },
  {
    id: "ghi-m3",
    name: "LIZA SANTOS",
    relationship: "03 Daughter",
    age: 21,
    status: "pending",
    sectionG: {
      g01: "1",
      g02: "1",
      g03: "8",
      g04: "9",
      g05: "1",
      g06: "2",
      g07: "2",
      g08: "2",
    },
    sectionH: { h01: "1" },
    sectionI: { i01: ["Z"], i01_z_specify: "Student savings club" },
    sectionM: {
      m01_A: "2",
      m01_B: "2",
      m01_C: "2",
      m01_D: "2",
      m03: "2",
      m05_A: "2",
      m05_B: "2",
      m05_C: "2",
      m05_D: "2",
      m05_E: "2",
      m05_F: "2",
      m05_G: "2",
      m05_Z: "1",
      m06_Z: "1",
      m05_z_specify: "Barangay scholarship grant",
    },
  },
];

export function toRosterMember(member: MockHouseholdSectionMember): HouseholdRosterMember {
  return {
    id: member.id,
    name: member.name,
    relationship: member.relationship,
    age: member.age,
    status: member.status,
    defaultValues: {},
  };
}
