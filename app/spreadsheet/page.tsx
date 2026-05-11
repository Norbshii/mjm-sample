"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Check } from "lucide-react";
import { SpreadsheetHeader } from "@/components/spreadsheet/SpreadsheetHeader";
import { SpreadsheetTable, RecordRow } from "@/components/spreadsheet/SpreadsheetTable";
import { FilterSidebar } from "@/components/spreadsheet/FilterSidebar";

const records: RecordRow[] = [
  {
    id: "HH-2026-0012",
    headName: "Juan Dela Cruz",
    address: "Purok 1, Barangay San Isidro",
    status: "Draft",
    syncStatus: "Synced",
    barangay: "San Isidro",
    purok: "Purok 1",
    age: 42,
    sex: "Male",
    maritalStatus: "Married",
    education: "Bachelor's Degree",
    waterSource: "Piped into dwelling",
    roofMaterial: "Metal Sheets",
    members: [
      {
        id: 1,
        a01LastName: "Dela Cruz",
        a01FirstName: "Juan",
        a01MiddleName: "M",
        a01Suffix: "",
        a02Relationship: "01",
        a02Specify: "",
        a03Sex: "1",
        a04DateOfBirth: "1984-05-15",
        a05Age: "42",
        a06BirthRegistration: "1",
        a07MaritalStatus: "2",
        a08Religion: "01",
        a08Specify: "",
        a09Ethnicity: "01",
        a09Specify: "",
        a10FunctionalDifficulty: false,
        a11HighestGradeCompleted: "601",
      },
      {
        id: 2,
        a01LastName: "Dela Cruz",
        a01FirstName: "Maria",
        a01MiddleName: "L",
        a01Suffix: "",
        a02Relationship: "02",
        a02Specify: "",
        a03Sex: "2",
        a04DateOfBirth: "1986-10-20",
        a05Age: "39",
        a06BirthRegistration: "1",
        a07MaritalStatus: "2",
        a08Religion: "01",
        a08Specify: "",
        a09Ethnicity: "01",
        a09Specify: "",
        a10FunctionalDifficulty: false,
        a11HighestGradeCompleted: "601",
      },
    ],
  },
  {
    id: "HH-2026-0028",
    headName: "Maria Santos",
    address: "Purok 3, Barangay Mabini",
    status: "Completed",
    syncStatus: "Synced",
    barangay: "Mabini",
    purok: "Purok 3",
    age: 38,
    sex: "Female",
    maritalStatus: "Married",
    education: "High School Graduate",
    waterSource: "Public tap",
    roofMaterial: "Concrete/Stone",
    members: [
      {
        id: 3,
        a01LastName: "Santos",
        a01FirstName: "Maria",
        a01MiddleName: "C",
        a01Suffix: "",
        a02Relationship: "01",
        a02Specify: "",
        a03Sex: "2",
        a04DateOfBirth: "1988-02-10",
        a05Age: "38",
        a06BirthRegistration: "1",
        a07MaritalStatus: "2",
        a08Religion: "01",
        a08Specify: "",
        a09Ethnicity: "01",
        a09Specify: "",
        a10FunctionalDifficulty: false,
        a11HighestGradeCompleted: "210",
      },
    ],
  },
  {
    id: "HH-2026-0045",
    headName: "Pedro Villanueva",
    address: "Purok 2, Barangay Mabini",
    status: "Needs Correction",
    syncStatus: "Unsynced",
    barangay: "Mabini",
    purok: "Purok 2",
    age: 55,
    sex: "Male",
    maritalStatus: "Widowed",
    education: "Elementary Graduate",
    waterSource: "Protected well",
    roofMaterial: "Bamboo/Thatch",
    members: [
      {
        id: 4,
        a01LastName: "Villanueva",
        a01FirstName: "Pedro",
        a01MiddleName: "S",
        a01Suffix: "",
        a02Relationship: "01",
        a02Specify: "",
        a03Sex: "1",
        a04DateOfBirth: "1971-12-05",
        a05Age: "55",
        a06BirthRegistration: "1",
        a07MaritalStatus: "4",
        a08Religion: "01",
        a08Specify: "",
        a09Ethnicity: "01",
        a09Specify: "",
        a10FunctionalDifficulty: true,
        a11HighestGradeCompleted: "110",
      },
    ],
  },
];

const tabs = [
  { id: "all", label: "All Status" },
  { id: "demographics", label: "Core Demographics (A)" },
  { id: "health", label: "Health (F)" },
  { id: "housing", label: "Housing (O)" },
];

export default function OpenSpreadsheetPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    id: true,
    headName: true,
    barangay: true,
    status: true,
    syncStatus: true,
    age: true,
    sex: true,
    maritalStatus: true,
    education: true,
  });

  const [barangayFilter, setBarangayFilter] = useState("All");
  const [syncFilter, setSyncFilter] = useState("All");
  const normalizedSearch = search.trim().toLowerCase();

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (!normalizedSearch) {
        const byBarangay =
          barangayFilter === "All" || record.barangay === barangayFilter;
        const bySync = syncFilter === "All" || record.syncStatus === syncFilter;
        return byBarangay && bySync;
      }

      const bySearch =
        record.id.toLowerCase().includes(normalizedSearch) ||
        record.headName.toLowerCase().includes(normalizedSearch) ||
        record.address.toLowerCase().includes(normalizedSearch);
      const byBarangay =
        barangayFilter === "All" || record.barangay === barangayFilter;
      const bySync = syncFilter === "All" || record.syncStatus === syncFilter;
      return bySearch && byBarangay && bySync;
    });
  }, [normalizedSearch, barangayFilter, syncFilter]);

  const toggleRow = (id: string) => {
    setExpandedRows((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  return (
    <div className="space-y-6">
      <SpreadsheetHeader
        search={search}
        setSearch={setSearch}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? "text-[#175CD3]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#175CD3]" />
              )}
            </button>
          ))}
        </div>

        <div className="relative pb-4">
          <button
            onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            <Settings size={16} />
            Columns
          </button>

          {isColumnDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsColumnDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full z-40 mt-1 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Toggle Columns
                </p>
                <div className="space-y-1">
                  {Object.entries(visibleColumns).map(([id, visible]) => (
                    <button
                      key={id}
                      onClick={() => toggleColumn(id)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span className="capitalize">{id.replace(/([A-Z])/g, " $1")}</span>
                      {visible && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <SpreadsheetTable
        records={filteredRecords}
        activeTab={activeTab}
        visibleColumns={visibleColumns}
        expandedRows={expandedRows}
        toggleRow={toggleRow}
        onOpenRecord={(id) => router.push(`/entries?mode=view&id=${id}`)}
      />

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        barangayFilter={barangayFilter}
        setBarangayFilter={setBarangayFilter}
        syncFilter={syncFilter}
        setSyncFilter={setSyncFilter}
      />
    </div>
  );
}
