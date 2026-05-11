"use client";

import {
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  sectionDefs,
  HouseholdMember,
  functionalRows,
  gRows,
} from "@/lib/census-constants";
import { PROTOTYPE_FAST_NAVIGATION } from "@/lib/prototype-flags";

// Dynamic imports for sections to improve initial load time
const SectionA = dynamic(() => import("./sections/SectionA").then(mod => mod.SectionA), { ssr: false });
const SectionB = dynamic(() => import("./sections/SectionB").then(mod => mod.SectionB), { ssr: false });
const SectionC = dynamic(() => import("./sections/SectionC").then(mod => mod.SectionC), { ssr: false });
const SectionE = dynamic(() => import("./sections/SectionE").then(mod => mod.SectionE), { ssr: false });
const SectionF = dynamic(() => import("./sections/SectionF").then(mod => mod.SectionF), { ssr: false });
const SectionG = dynamic(() => import("./sections/SectionG").then(mod => mod.SectionG), { ssr: false });
const SectionI = dynamic(() => import("./sections/SectionI").then(mod => mod.SectionI), { ssr: false });
const SectionL = dynamic(() => import("./sections/SectionL").then(mod => mod.SectionL), { ssr: false });
const SectionN = dynamic(() => import("./sections/SectionN").then(mod => mod.SectionN), { ssr: false });
const SectionO = dynamic(() => import("./sections/SectionO").then(mod => mod.SectionO), { ssr: false });
const GenericSection = dynamic(() => import("./sections/GenericSection").then(mod => mod.GenericSection), { ssr: false });

import { RecordDetailView } from "./RecordDetailView";

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
  const mode = searchParams.get("mode") || "edit";
  const unlockAll = searchParams.get("unlockAll") === "true";
  const [activeSection, setActiveSection] = useState("A");
  const [isStepperOpen, setIsStepperOpen] = useState(true);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, Record<string, string>>>({});
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>({});
  const [sectionA, setSectionA] = useState<{ members: HouseholdMember[] }>({
    members: [createMember(true)],
  });
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

  if (mode === "view") {
    return (
      <RecordDetailView
        data={{
          id: "HH-2026-0012",
          status: "Completed",
          sectionA,
          sectionB,
          sectionC,
          sectionE,
          sectionF,
          sectionG,
          sectionI,
          sectionN,
          sectionO,
        }}
      />
    );
  }

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
  };

  const deleteHouseholdMember = (memberId: number) => {
    setSectionA((previous) => {
      const nextMembers = previous.members.filter((member) => member.id !== memberId);
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

  const validateSection = (section: any) => {
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

    section.questions.forEach((question: any) => {
      if (question.required && !(values[question.id] ?? "").trim()) {
        nextErrors[question.id] = `${question.label} is required.`;
      }
    });

    setSectionErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onNext = () => {
    if (!PROTOTYPE_FAST_NAVIGATION && !validateSection(activeSectionDef)) return;

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "A":
        return (
          <SectionA
            members={sectionA.members}
            sectionErrors={sectionErrors}
            updateMemberField={updateMemberField}
            addHouseholdMember={addHouseholdMember}
            deleteHouseholdMember={deleteHouseholdMember}
            isMemberComplete={isMemberComplete}
          />
        );
      case "B":
        return <SectionB sectionB={sectionB} setSectionB={setSectionB} sectionErrors={sectionErrors} />;
      case "C":
        return <SectionC sectionC={sectionC} setSectionC={setSectionC} sectionErrors={sectionErrors} />;
      case "E":
        return <SectionE sectionE={sectionE} setSectionE={setSectionE} sectionErrors={sectionErrors} />;
      case "F":
        return <SectionF sectionF={sectionF} setSectionF={setSectionF} sectionErrors={sectionErrors} />;
      case "G":
        return <SectionG sectionG={sectionG} setSectionG={setSectionG} sectionErrors={sectionErrors} />;
      case "I":
        return <SectionI sectionI={sectionI} setSectionI={setSectionI} sectionErrors={sectionErrors} />;
      case "L":
        return <SectionL sectionL={sectionL} setSectionL={setSectionL} sectionErrors={sectionErrors} />;
      case "N":
        return <SectionN sectionN={sectionN} setSectionN={setSectionN} sectionErrors={sectionErrors} />;
      case "O":
        return <SectionO sectionO={sectionO} setSectionO={setSectionO} sectionErrors={sectionErrors} />;
      default:
        return (
          <GenericSection
            activeSectionDef={activeSectionDef}
            formValues={formValues}
            sectionErrors={sectionErrors}
            updateField={updateField}
          />
        );
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
          <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-gray-50" />}>
            {renderActiveSection()}
          </Suspense>

          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onPrevious}
              disabled={activeSectionIndex === 0}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-6 text-sm font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9]"
            >
              {activeSectionIndex === sectionDefs.length - 1 ? "Complete Record" : "Next Section"}
              <ChevronRight size={16} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function EntriesPage() {
  return (
    <Suspense fallback={null}>
      <EntriesFormEnginePage />
    </Suspense>
  );
}
