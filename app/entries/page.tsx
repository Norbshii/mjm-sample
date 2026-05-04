"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Lock,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  FormInput,
  FormCheckboxGroup,
  FormRadioGroup,
  FormRadioMatrix,
  FormSearchableSelect,
  FormSelect,
} from "@/components/untitledui/form-engine-fields";

type SectionDef = {
  id: string;
  title: string;
  description: string;
  questions: Array<{ id: string; label: string; required: boolean; placeholder: string }>;
};

type HouseholdMember = {
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

const sectionDefs: SectionDef[] = [
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
    title: "ICT Access",
    description: "Access to digital devices and internet.",
    questions: [
      { id: "h01", label: "Internet Access at Home", required: true, placeholder: "Yes / No" },
      { id: "h02", label: "Primary Device Used", required: false, placeholder: "Smartphone" },
    ],
  },
  { id: "I", title: "Finance", description: "Financial account ownership and access.", questions: [] },
  {
    id: "J",
    title: "Social Protection",
    description: "Program enrollment and benefits.",
    questions: [
      { id: "j01", label: "4Ps Beneficiary", required: true, placeholder: "Yes / No" },
      { id: "j02", label: "Other Program Membership", required: false, placeholder: "Program name" },
    ],
  },
  {
    id: "K",
    title: "Environment",
    description: "Household climate and hazard indicators.",
    questions: [
      { id: "k01", label: "Flood-Prone Area", required: true, placeholder: "Yes / No" },
      { id: "k02", label: "Evacuation Plan Available", required: false, placeholder: "Yes / No" },
    ],
  },
  { id: "L", title: "Safety", description: "Perceived safety and security concerns.", questions: [] },
  {
    id: "M",
    title: "Transport",
    description: "Transportation access and travel burden.",
    questions: [
      { id: "m01", label: "Primary Transport Mode", required: true, placeholder: "Tricycle" },
      { id: "m02", label: "Travel Time to Town Center", required: false, placeholder: "30 minutes" },
    ],
  },
  { id: "N", title: "WASH", description: "Water source and waste practices.", questions: [] },
  { id: "O", title: "Housing Materials", description: "Dwelling roof and wall profile.", questions: [] },
];

const relationshipOptions = [
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

const maritalStatusOptions = [
  { label: "1 Single/Never Married", value: "1" },
  { label: "2 Married", value: "2" },
  { label: "3 Common-law", value: "3" },
  { label: "4 Widowed", value: "4" },
  { label: "5 Divorced", value: "5" },
  { label: "6 Separated", value: "6" },
  { label: "7 Annulled", value: "7" },
];

const religionOptions = [
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

const ethnicityOptions = [
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

const highestGradeGroups = [
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

const disabilityOptions = [
  { label: "A Visual", value: "A" },
  { label: "B Deaf/Hearing", value: "B" },
  { label: "C Intellectual/Mental", value: "C" },
  { label: "D Physical", value: "D" },
  { label: "E Speech/Language", value: "E" },
  { label: "F Cancer", value: "F" },
  { label: "G Rare Disease", value: "G" },
  { label: "Z Others", value: "Z" },
];

const functionalRows = [
  { id: "B13", question: "Difficulty seeing, even when wearing glasses?" },
  { id: "B14", question: "Difficulty hearing, even when using a hearing aid?" },
  { id: "B15", question: "Difficulty walking or climbing steps?" },
];

const difficultyColumns = [
  { label: "1 No Difficulty", value: "1" },
  { label: "2 Some Difficulty", value: "2" },
  { label: "3 A Lot of Difficulty", value: "3" },
  { label: "4 Cannot Do at All", value: "4" },
];

const migrationStatusOptions = [
  { label: "1 OFW with Contract", value: "1" },
  { label: "2 Other OFW (No Contract)", value: "2" },
  { label: "3 Student Abroad", value: "3" },
  { label: "4 Tourist", value: "4" },
  { label: "5 Other Overseas Filipino", value: "5" },
  { label: "6 No, Resident", value: "6" },
];

const displacementOptions = [
  { label: "2 Natural Calamities", value: "2" },
  { label: "3 Man-made Disaster", value: "3" },
  { label: "4 Peace and Order", value: "4" },
  { label: "5 Refugee/Asylum Seeker", value: "5" },
  { label: "6 Relocation", value: "6" },
  { label: "8 Don't Know", value: "8" },
];

const employmentNatureOptions = [
  { label: "1 Permanent", value: "1" },
  { label: "2 Short-term/Seasonal/Casual", value: "2" },
  { label: "3 Day-to-Day/Week-to-Week", value: "3" },
];

const classWorkerOptions = [
  { label: "0 Private Household", value: "0" },
  { label: "1 Private Establishment", value: "1" },
  { label: "2 Government/GOCC", value: "2" },
  { label: "3 Self-Employed (no employees)", value: "3" },
  { label: "4 Employer in own farm/business", value: "4" },
  { label: "5 Worked with pay in own family farm/business", value: "5" },
  { label: "6 Worked without pay in own family farm/business", value: "6" },
];

const publicFacilityOptions = [
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

const privateFacilityOptions = [
  { label: "J Hospital", value: "J" },
  { label: "K Lying-in", value: "K" },
  { label: "L Clinic", value: "L" },
  { label: "M Pharmacy", value: "M" },
  { label: "N Mobile", value: "N" },
  { label: "O Other", value: "O" },
];

const gRows = [
  { id: "G01", question: "In the last 30 days, did your household worry food would run out?" },
  { id: "G02", question: "In the last 30 days, did food bought not last and no money to get more?" },
  { id: "G03", question: "In the last 30 days, were meals skipped because of lack of resources?" },
];

const gColumns = [
  { label: "1 Yes", value: "1" },
  { label: "2 No", value: "2" },
  { label: "8 Don't Know", value: "8" },
  { label: "9 Prefer Not to Answer", value: "9" },
];

const financeOptions = [
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

const safetyOptions = [
  { label: "1 Very Safe", value: "1" },
  { label: "2 Safe", value: "2" },
  { label: "3 Unsafe", value: "3" },
  { label: "4 Very Unsafe", value: "4" },
  { label: "5 Never go out", value: "5" },
  { label: "8 Don't Know", value: "8" },
];

const waterSourceOptions = [
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

const wasteDisposalOptions = [
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

const housingMaterialOptions = [
  { label: "1 Concrete/Stone", value: "1" },
  { label: "2 Metal Sheets", value: "2" },
  { label: "3 Wood", value: "3" },
  { label: "4 Half-Concrete/Half-Wood", value: "4" },
  { label: "5 Bamboo/Thatch", value: "5" },
  { label: "6 Asbestos", value: "6" },
  { label: "7 Makeshift", value: "7" },
  { label: "8 Not Observed", value: "8" },
];

const createMember = (isHead: boolean): HouseholdMember => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  a01LastName: "",
  a01FirstName: "",
  a01MiddleName: "",
  a01Suffix: "",
  a02Relationship: isHead ? "01" : "",
  a02Specify: "",
  a03Sex: "",
  a04DateOfBirth: "",
  a05Age: "",
  a06BirthRegistration: "",
  a07MaritalStatus: "",
  a08Religion: "",
  a08Specify: "",
  a09Ethnicity: "",
  a09Specify: "",
  a10FunctionalDifficulty: false,
  a11HighestGradeCompleted: "",
});

const calculateAgeFromDate = (dateValue: string) => {
  if (!dateValue) return "";
  const birthDate = new Date(dateValue);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age < 0) return "";
  return String(age);
};

function EntriesFormEnginePage() {
  const searchParams = useSearchParams();
  const unlockAll = searchParams.get("unlockAll") === "true";
  const [activeSection, setActiveSection] = useState("A");
  const [isStepperOpen, setIsStepperOpen] = useState(true);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, Record<string, string>>>({});
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>({});
  const [sectionA, setSectionA] = useState<{ members: HouseholdMember[] }>({
    members: [createMember(true)],
  });
  const [expandedMemberId, setExpandedMemberId] = useState<number>(sectionA.members[0].id);
  const [sectionB, setSectionB] = useState<{ b12: string[]; matrix: Record<string, string> }>({
    b12: [],
    matrix: {},
  });
  const [sectionC, setSectionC] = useState({ c02: "", c06: "" });
  const [sectionE, setSectionE] = useState({ e07: "", e08: "" });
  const [sectionF, setSectionF] = useState({ public: [] as string[], private: [] as string[] });
  const [sectionG, setSectionG] = useState<Record<string, string>>({});
  const [sectionI, setSectionI] = useState<string[]>([]);
  const [sectionL, setSectionL] = useState({ l01: "" });
  const [sectionN, setSectionN] = useState({ n01: "", n12: [] as string[] });
  const [sectionO, setSectionO] = useState({ o03: "", o04: "" });

  const activeSectionIndex = sectionDefs.findIndex((section) => section.id === activeSection);
  const activeSectionDef = sectionDefs[activeSectionIndex];

  const isLocked = (sectionId: string) => {
    if (unlockAll) return false;
    const idx = sectionDefs.findIndex((section) => section.id === sectionId);
    if (idx <= 0) return false;
    const previousSection = sectionDefs[idx - 1];
    return !completedSections.includes(previousSection.id);
  };

  const canOpenSection = (sectionId: string) => {
    if (unlockAll) return true;
    return sectionId === activeSection || completedSections.includes(sectionId) || !isLocked(sectionId);
  };

  const updateField = (sectionId: string, fieldId: string, value: string) => {
    setFormValues((previous) => ({
      ...previous,
      [sectionId]: {
        ...previous[sectionId],
        [fieldId]: value,
      },
    }));
    if (sectionErrors[fieldId]) {
      setSectionErrors((previous) => ({ ...previous, [fieldId]: "" }));
    }
  };

  const updateMemberField = (
    memberId: number,
    field: keyof HouseholdMember,
    value: string | boolean,
  ) => {
    setSectionA((previous) => ({
      ...previous,
      members: previous.members.map((member, index) => {
        if (member.id !== memberId) return member;
        const nextMember = { ...member, [field]: value } as HouseholdMember;

        if (field === "a04DateOfBirth" && typeof value === "string") {
          nextMember.a05Age = calculateAgeFromDate(value);
          if (Number(nextMember.a05Age || "0") < 10) {
            nextMember.a07MaritalStatus = "1";
          }
        }

        if (field === "a05Age" && typeof value === "string" && Number(value || "0") < 10) {
          nextMember.a07MaritalStatus = "1";
        }

        if (field === "a02Relationship" && value !== "26") {
          nextMember.a02Specify = "";
        }

        if (field === "a08Religion" && value !== "99") {
          nextMember.a08Specify = "";
        }

        if (field === "a09Ethnicity" && value !== "99") {
          nextMember.a09Specify = "";
        }

        if (index === 0) {
          nextMember.a02Relationship = "01";
        }

        return nextMember;
      }),
    }));
  };

  const addHouseholdMember = () => {
    const newMember = createMember(false);
    setSectionA((previous) => ({ ...previous, members: [...previous.members, newMember] }));
    setExpandedMemberId(newMember.id);
  };

  const deleteHouseholdMember = (memberId: number) => {
    setSectionA((previous) => {
      const nextMembers = previous.members.filter((member) => member.id !== memberId);
      if (nextMembers.length > 0 && expandedMemberId === memberId) {
        setExpandedMemberId(nextMembers[0].id);
      }
      return { ...previous, members: nextMembers };
    });
  };

  const isMemberComplete = (member: HouseholdMember) => {
    const baseComplete =
      Boolean(member.a01LastName.trim()) &&
      Boolean(member.a01FirstName.trim()) &&
      Boolean(member.a01MiddleName.trim()) &&
      Boolean(member.a01Suffix.trim()) &&
      Boolean(member.a02Relationship) &&
      Boolean(member.a03Sex) &&
      Boolean(member.a04DateOfBirth) &&
      Boolean(member.a05Age) &&
      Boolean(member.a06BirthRegistration) &&
      Boolean(member.a07MaritalStatus) &&
      Boolean(member.a08Religion) &&
      Boolean(member.a09Ethnicity) &&
      Boolean(member.a11HighestGradeCompleted);
    if (!baseComplete) return false;
    if (member.a02Relationship === "26" && !member.a02Specify.trim()) return false;
    if (member.a08Religion === "99" && !member.a08Specify.trim()) return false;
    if (member.a09Ethnicity === "99" && !member.a09Specify.trim()) return false;
    return true;
  };

  const validateSection = (section: SectionDef) => {
    if (section.id === "A") {
      const nextErrors: Record<string, string> = {};
      const head = sectionA.members[0];
      if (!head) {
        nextErrors.aMembers = "At least one household member is required.";
      } else {
        if (!head.a01LastName.trim()) nextErrors[`member-${head.id}-a01LastName`] = "Last Name is required.";
        if (!head.a01FirstName.trim()) nextErrors[`member-${head.id}-a01FirstName`] = "First Name is required.";
        if (!head.a01MiddleName.trim()) nextErrors[`member-${head.id}-a01MiddleName`] = "Middle Name is required.";
        if (!head.a01Suffix.trim()) nextErrors[`member-${head.id}-a01Suffix`] = "Suffix is required.";
        if (!head.a02Relationship) nextErrors[`member-${head.id}-a02`] = "Relationship is required.";
        if (head.a02Relationship === "26" && !head.a02Specify.trim()) {
          nextErrors[`member-${head.id}-a02Specify`] = "Specify relationship is required.";
        }
        if (!head.a03Sex) nextErrors[`member-${head.id}-a03`] = "Sex is required.";
        if (!head.a04DateOfBirth) nextErrors[`member-${head.id}-a04`] = "Date of Birth is required.";
        if (!head.a05Age) nextErrors[`member-${head.id}-a05`] = "Age is required.";
        if (!head.a06BirthRegistration) nextErrors[`member-${head.id}-a06`] = "Birth Registration is required.";
        if (!head.a07MaritalStatus) nextErrors[`member-${head.id}-a07`] = "Marital Status is required.";
        if (!head.a08Religion) nextErrors[`member-${head.id}-a08`] = "Religion is required.";
        if (head.a08Religion === "99" && !head.a08Specify.trim()) {
          nextErrors[`member-${head.id}-a08Specify`] = "Specify religion is required.";
        }
        if (!head.a09Ethnicity) nextErrors[`member-${head.id}-a09`] = "Ethnicity is required.";
        if (head.a09Ethnicity === "99" && !head.a09Specify.trim()) {
          nextErrors[`member-${head.id}-a09Specify`] = "Specify ethnicity is required.";
        }
        if (!head.a11HighestGradeCompleted) {
          nextErrors[`member-${head.id}-a11`] = "Highest Grade Completed is required.";
        }
      }
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }

    if (section.id === "B") {
      const nextErrors: Record<string, string> = {};
      if (sectionB.b12.length === 0) {
        nextErrors.b12 = "Disability Type (B12) requires at least one selection.";
      }
      functionalRows.forEach((row) => {
        if (!sectionB.matrix[row.id]) {
          nextErrors[row.id] = "Please select a response for this item.";
        }
      });
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "C") {
      const nextErrors: Record<string, string> = {};
      if (!sectionC.c02) nextErrors.c02 = "Overseas Filipino Status (C02) is required.";
      if (!sectionC.c06) nextErrors.c06 = "Internal Displacement Reason (C06) is required.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "E") {
      const nextErrors: Record<string, string> = {};
      if (!sectionE.e07) nextErrors.e07 = "Nature of Employment (E07) is required.";
      if (!sectionE.e08) nextErrors.e08 = "Class of Worker (E08) is required.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "F") {
      const nextErrors: Record<string, string> = {};
      if (sectionF.public.length === 0) nextErrors.fPublic = "Select at least one public facility.";
      if (sectionF.private.length === 0) nextErrors.fPrivate = "Select at least one private facility.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "G") {
      const nextErrors: Record<string, string> = {};
      gRows.forEach((row) => {
        if (!sectionG[row.id]) nextErrors[row.id] = "Required.";
      });
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "I") {
      const nextErrors: Record<string, string> = {};
      if (sectionI.length === 0) nextErrors.i01 = "Select at least one financial account option.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "L") {
      const nextErrors: Record<string, string> = {};
      if (!sectionL.l01) nextErrors.l01 = "Safety Walking at Night (L01) is required.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "N") {
      const nextErrors: Record<string, string> = {};
      if (!sectionN.n01) nextErrors.n01 = "Water Source (N01) is required.";
      if (sectionN.n12.length === 0) nextErrors.n12 = "Waste Disposal (N12) requires at least one.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }
    if (section.id === "O") {
      const nextErrors: Record<string, string> = {};
      if (!sectionO.o03) nextErrors.o03 = "Roof Material (O03) is required.";
      if (!sectionO.o04) nextErrors.o04 = "Wall Material (O04) is required.";
      setSectionErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    }

    const values = formValues[section.id] ?? {};
    const nextErrors: Record<string, string> = {};

    section.questions.forEach((question) => {
      if (question.required && !(values[question.id] ?? "").trim()) {
        nextErrors[question.id] = `${question.label} is required.`;
      }
    });

    setSectionErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onNext = () => {
    if (!validateSection(activeSectionDef)) return;

    setCompletedSections((previous) =>
      previous.includes(activeSectionDef.id) ? previous : [...previous, activeSectionDef.id],
    );

    if (activeSectionIndex < sectionDefs.length - 1) {
      setActiveSection(sectionDefs[activeSectionIndex + 1].id);
      setSectionErrors({});
    }
  };

  const onPrevious = () => {
    if (activeSectionIndex > 0) {
      setActiveSection(sectionDefs[activeSectionIndex - 1].id);
      setSectionErrors({});
    }
  };

  return (
    <div className="flex gap-6">
      <aside
        className={`shrink-0 lg:sticky lg:top-8 lg:h-fit transition-all duration-300 ${
          isStepperOpen ? "w-72" : "w-16"
        }`}
      >
        <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300">
          <div className="mb-4 flex items-center justify-between">
            <p
              className={`px-2 text-xs font-semibold tracking-wide text-[#667085] uppercase whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isStepperOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Record Editor Steps (A-O)
            </p>
            <button
              type="button"
              onClick={() => setIsStepperOpen((previous) => !previous)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#667085] transition hover:bg-[#F2F4F7]"
              aria-label={isStepperOpen ? "Collapse stepper" : "Expand stepper"}
            >
              {isStepperOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
          <nav className="space-y-1">
            {sectionDefs.map((section) => {
              const completed = completedSections.includes(section.id);
              const active = section.id === activeSection;
              const locked = isLocked(section.id);
              return (
                <button
                  key={section.id}
                  type="button"
                  disabled={!canOpenSection(section.id)}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-[#EFF8FF] font-semibold text-[#175CD3]"
                      : locked
                        ? "cursor-not-allowed text-[#98A2B3]"
                        : "font-medium text-[#344054] hover:bg-[#F2F4F7]"
                  } ${isStepperOpen ? "justify-between" : "justify-center"}`}
                >
                  <span className={`flex items-center ${isStepperOpen ? "gap-2" : "flex-col gap-0.5"}`}>
                    <span className="font-semibold">{section.id}</span>
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                        isStepperOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
                      }`}
                    >
                      {section.title}
                    </span>
                  </span>
                  {completed ? (
                    <CheckCircle2 size={15} className="text-[#067647]" />
                  ) : locked && !unlockAll ? (
                    <Lock size={14} className="text-[#98A2B3]" />
                  ) : unlockAll ? (
                    <ChevronRight size={14} className="text-[#98A2B3]" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </section>
      </aside>

      <section className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="border-b border-gray-200 pb-4">
          <p className="text-xs font-semibold tracking-wide text-[#667085] uppercase">
            Section {activeSectionDef.id}
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">{activeSectionDef.title}</h1>
          <p className="mt-1 text-sm text-[#475467]">{activeSectionDef.description}</p>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onNext();
          }}
        >
          {activeSectionDef.id === "A" ? (
            <div className="space-y-6">
              {sectionErrors.aMembers ? (
                <p className="text-xs text-[#D92D20]">{sectionErrors.aMembers}</p>
              ) : null}

              {sectionA.members.map((member, index) => {
                const isHead = index === 0;
                const open = expandedMemberId === member.id;
                const memberName =
                  [member.a01FirstName, member.a01LastName].filter(Boolean).join(" ").trim() ||
                  "New Household Member";
                const relationshipLabel =
                  relationshipOptions.find((option) => option.value === member.a02Relationship)?.label ??
                  "Relationship";
                const complete = isMemberComplete(member);

                return (
                  <article key={member.id} className="overflow-visible rounded-2xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setExpandedMemberId(open ? -1 : member.id)}
                      className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-3 text-left"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#101828]">
                          {memberName}
                          {memberName === "New Household Member" ? "" : ` • ${relationshipLabel}`}
                        </p>
                        <p className="text-xs text-[#667085]">
                          Household Member {index + 1} {isHead ? "(Head)" : ""}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        {complete ? (
                          <CheckCircle2 size={16} className="text-[#067647]" />
                        ) : (
                          <AlertTriangle size={16} className="text-[#DC6803]" />
                        )}
                        {!isHead ? (
                          <span
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteHouseholdMember(member.id);
                            }}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
                            role="button"
                            aria-label="Delete member"
                          >
                            <Trash2 size={14} />
                          </span>
                        ) : null}
                        {open ? (
                          <ChevronUp size={16} className="text-[#667085]" />
                        ) : (
                          <ChevronDown size={16} className="text-[#667085]" />
                        )}
                      </div>
                    </button>

                    <div
                      className={`bg-gray-50 transition-all duration-200 ${
                        open ? "max-h-[4000px] overflow-visible opacity-100" : "max-h-0 overflow-hidden opacity-0"
                      }`}
                    >
                      <div className="space-y-6 px-4 py-4">
                        <div>
                          <p className="mb-2 text-sm font-medium text-[#344054]">
                            A01. Name of Household Member *
                          </p>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <FormInput
                              id={`a01-last-${member.id}`}
                              label="Last Name"
                              value={member.a01LastName}
                              onChange={(value) => updateMemberField(member.id, "a01LastName", value)}
                              error={sectionErrors[`member-${member.id}-a01LastName`]}
                              required
                            />
                            <FormInput
                              id={`a01-first-${member.id}`}
                              label="First Name"
                              value={member.a01FirstName}
                              onChange={(value) => updateMemberField(member.id, "a01FirstName", value)}
                              error={sectionErrors[`member-${member.id}-a01FirstName`]}
                              required
                            />
                            <FormInput
                              id={`a01-middle-${member.id}`}
                              label="Middle Name"
                              value={member.a01MiddleName}
                              onChange={(value) => updateMemberField(member.id, "a01MiddleName", value)}
                              error={sectionErrors[`member-${member.id}-a01MiddleName`]}
                              required
                            />
                            <FormInput
                              id={`a01-suffix-${member.id}`}
                              label="Suffix"
                              value={member.a01Suffix}
                              onChange={(value) => updateMemberField(member.id, "a01Suffix", value)}
                              placeholder="Jr., Sr., III"
                              error={sectionErrors[`member-${member.id}-a01Suffix`]}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          <FormSelect
                            id={`a02-${member.id}`}
                            label="A02. Relationship to Household Head"
                            value={member.a02Relationship}
                            options={relationshipOptions}
                            disabled={isHead}
                            onChange={(value) => updateMemberField(member.id, "a02Relationship", value)}
                            error={sectionErrors[`member-${member.id}-a02`]}
                            required
                          />
                          {member.a02Relationship === "26" ? (
                            <FormInput
                              id={`a02-specify-${member.id}`}
                              label="Specify"
                              value={member.a02Specify}
                              onChange={(value) => updateMemberField(member.id, "a02Specify", value)}
                              error={sectionErrors[`member-${member.id}-a02Specify`]}
                              required
                            />
                          ) : null}

                          <FormRadioGroup
                            id={`a03-${member.id}`}
                            label="A03. Sex"
                            value={member.a03Sex}
                            options={[
                              { label: "1 Male", value: "1" },
                              { label: "2 Female", value: "2" },
                            ]}
                            orientation="horizontal"
                            onChange={(value) => updateMemberField(member.id, "a03Sex", value)}
                            error={sectionErrors[`member-${member.id}-a03`]}
                            required
                          />

                          <FormInput
                            id={`a04-${member.id}`}
                            label="A04. Date of Birth"
                            type="date"
                            value={member.a04DateOfBirth}
                            onChange={(value) => updateMemberField(member.id, "a04DateOfBirth", value)}
                            error={sectionErrors[`member-${member.id}-a04`]}
                            required
                          />
                          <FormInput
                            id={`a05-${member.id}`}
                            label="A05. Age"
                            type="number"
                            value={member.a05Age}
                            onChange={(value) => updateMemberField(member.id, "a05Age", value)}
                            error={sectionErrors[`member-${member.id}-a05`]}
                            required
                          />

                          <FormRadioGroup
                            id={`a06-${member.id}`}
                            label="A06. Birth Registration"
                            value={member.a06BirthRegistration}
                            options={[
                              { label: "1 Yes", value: "1" },
                              { label: "2 No", value: "2" },
                              { label: "8 Don't Know", value: "8" },
                            ]}
                            onChange={(value) => updateMemberField(member.id, "a06BirthRegistration", value)}
                            error={sectionErrors[`member-${member.id}-a06`]}
                            required
                          />

                          <FormSelect
                            id={`a07-${member.id}`}
                            label="A07. Marital Status"
                            value={member.a07MaritalStatus}
                            options={maritalStatusOptions}
                            disabled={Number(member.a05Age || "0") < 10}
                            onChange={(value) => updateMemberField(member.id, "a07MaritalStatus", value)}
                            error={sectionErrors[`member-${member.id}-a07`]}
                            required
                          />

                          <FormSelect
                            id={`a08-${member.id}`}
                            label="A08. Religion"
                            value={member.a08Religion}
                            options={religionOptions}
                            onChange={(value) => updateMemberField(member.id, "a08Religion", value)}
                            error={sectionErrors[`member-${member.id}-a08`]}
                            required
                          />
                          {member.a08Religion === "99" ? (
                            <FormInput
                              id={`a08-specify-${member.id}`}
                              label="Specify Religion"
                              value={member.a08Specify}
                              onChange={(value) => updateMemberField(member.id, "a08Specify", value)}
                              error={sectionErrors[`member-${member.id}-a08Specify`]}
                              required
                            />
                          ) : null}

                          <FormSelect
                            id={`a09-${member.id}`}
                            label="A09. Ethnicity"
                            value={member.a09Ethnicity}
                            options={ethnicityOptions}
                            onChange={(value) => updateMemberField(member.id, "a09Ethnicity", value)}
                            error={sectionErrors[`member-${member.id}-a09`]}
                            required
                          />
                          {member.a09Ethnicity === "99" ? (
                            <FormInput
                              id={`a09-specify-${member.id}`}
                              label="Specify Ethnicity"
                              value={member.a09Specify}
                              onChange={(value) => updateMemberField(member.id, "a09Specify", value)}
                              error={sectionErrors[`member-${member.id}-a09Specify`]}
                              required
                            />
                          ) : null}

                          <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 lg:col-span-2">
                            <input
                              id={`a10-${member.id}`}
                              type="checkbox"
                              checked={member.a10FunctionalDifficulty}
                              onChange={(event) =>
                                updateMemberField(member.id, "a10FunctionalDifficulty", event.target.checked)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                            />
                            <label htmlFor={`a10-${member.id}`} className="text-sm font-medium text-[#344054]">
                              A10. Does this person have any functional difficulty?
                            </label>
                          </div>

                          <div className="lg:col-span-3">
                            <FormSearchableSelect
                              id={`a11-${member.id}`}
                              label="A11. Highest Grade Completed"
                              groups={highestGradeGroups}
                              value={member.a11HighestGradeCompleted}
                              onChange={(value) =>
                                updateMemberField(member.id, "a11HighestGradeCompleted", value)
                              }
                              error={sectionErrors[`member-${member.id}-a11`]}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              <button
                type="button"
                onClick={addHouseholdMember}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                <UserPlus size={16} />
                Add Household Member
              </button>
            </div>
          ) : activeSectionDef.id === "B" ? (
            <div className="space-y-4">
              <FormCheckboxGroup
                id="b12"
                label="Disability Type (B12)"
                subtitle="Select all that apply."
                values={sectionB.b12}
                options={disabilityOptions}
                onChange={(values) => setSectionB((prev) => ({ ...prev, b12: values }))}
                columns={4}
                error={sectionErrors.b12}
                required
              />

              <FormRadioMatrix
                id="b13-b18"
                label="Functional Difficulties (B13-B18)"
                subtitle="Use the best answer for each function."
                rows={functionalRows}
                columns={difficultyColumns}
                values={sectionB.matrix}
                onChange={(rowId, value) =>
                  setSectionB((prev) => ({
                    ...prev,
                    matrix: { ...prev.matrix, [rowId]: value },
                  }))
                }
                error={
                  Object.keys(sectionErrors).some((key) =>
                    functionalRows.some((row) => row.id === key),
                  )
                    ? "Please answer all functional difficulty questions."
                    : undefined
                }
                helperText="Rows are mock items so you can preview matrix behavior."
                required
              />
            </div>
          ) : activeSectionDef.id === "C" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                id="c02"
                label="Overseas Filipino Status (C02)"
                value={sectionC.c02}
                options={migrationStatusOptions}
                onChange={(value) => setSectionC((prev) => ({ ...prev, c02: value }))}
                error={sectionErrors.c02}
                required
              />
              <FormSelect
                id="c06"
                label="Internal Displacement Reason (C06)"
                value={sectionC.c06}
                options={displacementOptions}
                onChange={(value) => setSectionC((prev) => ({ ...prev, c06: value }))}
                error={sectionErrors.c06}
                required
              />
            </div>
          ) : activeSectionDef.id === "E" ? (
            <div className="space-y-4">
              <FormRadioGroup
                id="e07"
                label="Nature of Employment (E07)"
                value={sectionE.e07}
                options={employmentNatureOptions}
                onChange={(value) => setSectionE((prev) => ({ ...prev, e07: value }))}
                error={sectionErrors.e07}
                required
              />
              <FormSelect
                id="e08"
                label="Class of Worker (E08)"
                value={sectionE.e08}
                options={classWorkerOptions}
                onChange={(value) => setSectionE((prev) => ({ ...prev, e08: value }))}
                error={sectionErrors.e08}
                required
              />
            </div>
          ) : activeSectionDef.id === "F" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <FormCheckboxGroup
                id="f03-public"
                label="Medical Facility (F03) - Public"
                subtitle="Public facilities accessed."
                values={sectionF.public}
                options={publicFacilityOptions}
                onChange={(values) => setSectionF((prev) => ({ ...prev, public: values }))}
                columns={2}
                error={sectionErrors.fPublic}
                required
              />
              <FormCheckboxGroup
                id="f03-private"
                label="Medical Facility (F03) - Private"
                subtitle="Private facilities accessed."
                values={sectionF.private}
                options={privateFacilityOptions}
                onChange={(values) => setSectionF((prev) => ({ ...prev, private: values }))}
                columns={2}
                error={sectionErrors.fPrivate}
                required
              />
            </div>
          ) : activeSectionDef.id === "G" ? (
            <FormRadioMatrix
              id="g01-g08"
              label="Food Security (G01-G08)"
              subtitle="Mock questions to preview the section matrix."
              rows={gRows}
              columns={gColumns}
              values={sectionG}
              onChange={(rowId, value) => setSectionG((prev) => ({ ...prev, [rowId]: value }))}
              error={
                Object.keys(sectionErrors).some((key) => gRows.some((row) => row.id === key))
                  ? "Please complete all food security rows."
                  : undefined
              }
              required
            />
          ) : activeSectionDef.id === "I" ? (
            <FormCheckboxGroup
              id="i01"
              label="Financial Accounts (I01)"
              values={sectionI}
              options={financeOptions}
              onChange={setSectionI}
              columns={3}
              error={sectionErrors.i01}
              required
            />
          ) : activeSectionDef.id === "L" ? (
            <FormRadioGroup
              id="l01"
              label="Safety Walking at Night (L01)"
              value={sectionL.l01}
              options={safetyOptions}
              onChange={(value) => setSectionL({ l01: value })}
              error={sectionErrors.l01}
              required
            />
          ) : activeSectionDef.id === "N" ? (
            <div className="space-y-4">
              <FormSelect
                id="n01"
                label="Water Source (N01)"
                value={sectionN.n01}
                options={waterSourceOptions}
                onChange={(value) => setSectionN((prev) => ({ ...prev, n01: value }))}
                error={sectionErrors.n01}
                required
              />
              <FormCheckboxGroup
                id="n12"
                label="Waste Disposal (N12)"
                values={sectionN.n12}
                options={wasteDisposalOptions}
                onChange={(values) => setSectionN((prev) => ({ ...prev, n12: values }))}
                columns={3}
                error={sectionErrors.n12}
                required
              />
            </div>
          ) : activeSectionDef.id === "O" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                id="o03"
                label="Roof Material (O03)"
                value={sectionO.o03}
                options={housingMaterialOptions}
                onChange={(value) => setSectionO((prev) => ({ ...prev, o03: value }))}
                error={sectionErrors.o03}
                required
              />
              <FormSelect
                id="o04"
                label="Wall Material (O04)"
                value={sectionO.o04}
                options={housingMaterialOptions}
                onChange={(value) => setSectionO((prev) => ({ ...prev, o04: value }))}
                error={sectionErrors.o04}
                required
              />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeSectionDef.questions.map((question) => (
                <label key={question.id} className="space-y-2">
                  <span className="text-sm font-medium text-[#344054]">
                    {question.label}
                    {question.required ? " *" : ""}
                  </span>
                  <input
                    value={formValues[activeSectionDef.id]?.[question.id] ?? ""}
                    onChange={(event) =>
                      updateField(activeSectionDef.id, question.id, event.target.value)
                    }
                    placeholder={question.placeholder}
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 ${
                      sectionErrors[question.id]
                        ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
                        : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
                    }`}
                  />
                  {sectionErrors[question.id] ? (
                    <p className="text-xs text-[#D92D20]">{sectionErrors[question.id]}</p>
                  ) : null}
                </label>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
            <button
              type="button"
              disabled={activeSectionIndex === 0}
              onClick={onPrevious}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#175CD3] px-4 text-sm font-semibold text-white hover:bg-[#1849A9]"
            >
              {activeSectionIndex === sectionDefs.length - 1 ? "Review & Submit" : "Next"}
              <ChevronRight size={14} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function MyEntriesPage() {
  return (
    <Suspense fallback={null}>
      <EntriesFormEnginePage />
    </Suspense>
  );
}
