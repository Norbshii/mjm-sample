"use client";

import React from "react";
import { ChevronRight, ChevronDown, Wifi, WifiOff, Database } from "lucide-react";

type HouseholdMember = {
  id: number;
  a01LastName: string;
  a01FirstName: string;
  a03Sex: string;
  a02Relationship: string;
  a05Age: string;
  a07MaritalStatus: string;
  a11HighestGradeCompleted: string;
};

export type RecordRow = {
  id: string;
  headName: string;
  address: string;
  status: "Draft" | "Completed" | "Needs Correction";
  syncStatus: "Synced" | "Unsynced";
  barangay: string;
  purok: string;
  age?: number;
  sex?: string;
  maritalStatus?: string;
  education?: string;
  waterSource?: string;
  roofMaterial?: string;
  members: HouseholdMember[];
};

const statusClasses: Record<string, string> = {
  Draft: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
  Completed: "bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]",
  "Needs Correction": "bg-[#FFFAEB] text-[#B54708] border-[#FEC84B]",
};

interface SpreadsheetTableProps {
  records: RecordRow[];
  activeTab: string;
  visibleColumns: Record<string, boolean>;
  expandedRows: Set<string>;
  toggleRow: (id: string) => void;
  onOpenRecord: (id: string) => void;
}

export const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({
  records,
  activeTab,
  visibleColumns,
  expandedRows,
  toggleRow,
  onOpenRecord,
}) => {
  const commonHeaderClass =
    "px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase whitespace-nowrap bg-gray-50 border-b border-gray-200";

  const renderHeaders = () => (
    <tr className="bg-gray-50">
      <th className={`${commonHeaderClass} w-10 px-4! bg-gray-50 border-b border-gray-200`}></th>
      <th className={`sticky left-0 z-20 ${commonHeaderClass} shadow-[1px_0_0_rgba(0,0,0,0.1)]`}>
        Household ID
      </th>
      <th className={`sticky left-[140px] z-20 ${commonHeaderClass} shadow-[1px_0_0_rgba(0,0,0,0.1)]`}>
        Head Name
      </th>
      {activeTab === "all" && (
        <>
          {visibleColumns.barangay && <th className={commonHeaderClass}>Barangay</th>}
          {visibleColumns.status && <th className={commonHeaderClass}>Overall Status</th>}
          {visibleColumns.syncStatus && <th className={commonHeaderClass}>Sync Status</th>}
        </>
      )}
      {activeTab === "demographics" && (
        <>
          {visibleColumns.age && <th className={commonHeaderClass}>Age</th>}
          {visibleColumns.sex && <th className={commonHeaderClass}>Sex</th>}
          {visibleColumns.maritalStatus && <th className={commonHeaderClass}>Marital Status</th>}
          {visibleColumns.education && <th className={commonHeaderClass}>Highest Education</th>}
        </>
      )}
      {activeTab === "health" && (
        <>
          <th className={commonHeaderClass}>Medical Facility</th>
          <th className={commonHeaderClass}>Food Security</th>
          <th className={commonHeaderClass}>Health Status</th>
        </>
      )}
      {activeTab === "housing" && (
        <>
          <th className={commonHeaderClass}>Water Source</th>
          <th className={commonHeaderClass}>Roof Material</th>
          <th className={commonHeaderClass}>Wall Material</th>
        </>
      )}
      <th className={`sticky right-0 z-20 ${commonHeaderClass} text-right shadow-[-1px_0_0_rgba(0,0,0,0.1)]`}>
        Actions
      </th>
    </tr>
  );

  const renderRow = (record: RecordRow) => {
    const commonCellClass = "px-6 py-3 text-sm whitespace-nowrap border-b border-gray-100 transition-colors";
    const isExpanded = expandedRows.has(record.id);

    return (
      <React.Fragment key={record.id}>
        <tr
          className={`hover:bg-gray-50 group cursor-pointer transition-colors ${
            isExpanded ? "bg-gray-50/50" : ""
          }`}
          onClick={() => toggleRow(record.id)}
        >
          <td className={`${commonCellClass} px-4! text-gray-400`}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </td>
          <td className={`sticky left-0 z-10 bg-white group-hover:bg-gray-50 font-medium text-[#101828] ${commonCellClass} shadow-[1px_0_0_rgba(0,0,0,0.1)] ${isExpanded ? "bg-gray-50/50!" : ""}`}>
            {record.id}
          </td>
          <td className={`sticky left-[140px] z-10 bg-white group-hover:bg-gray-50 text-[#344054] ${commonCellClass} shadow-[1px_0_0_rgba(0,0,0,0.1)] ${isExpanded ? "bg-gray-50/50!" : ""}`}>
            <div className="flex items-center gap-2">
              {record.headName}
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {record.members.length} Members
              </span>
            </div>
          </td>
          {activeTab === "all" && (
            <>
              {visibleColumns.barangay && <td className={commonCellClass}>{record.barangay}</td>}
              {visibleColumns.status && (
                <td className={commonCellClass}>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[record.status]}`}>
                    {record.status}
                  </span>
                </td>
              )}
              {visibleColumns.syncStatus && (
                <td className={commonCellClass}>
                  <span className="inline-flex items-center gap-1.5">
                    {record.syncStatus === "Synced" ? <Wifi size={15} className="text-[#067647]" /> : <WifiOff size={15} className="text-[#B54708]" />}
                    {record.syncStatus}
                  </span>
                </td>
              )}
            </>
          )}
          {activeTab === "demographics" && (
            <>
              {visibleColumns.age && <td className={commonCellClass}>{record.age}</td>}
              {visibleColumns.sex && <td className={commonCellClass}>{record.sex}</td>}
              {visibleColumns.maritalStatus && <td className={commonCellClass}>{record.maritalStatus}</td>}
              {visibleColumns.education && <td className={commonCellClass}>{record.education}</td>}
            </>
          )}
          {activeTab === "health" && (
            <>
              <td className={commonCellClass}>Public/Private</td>
              <td className={commonCellClass}>Secure</td>
              <td className={commonCellClass}>Normal</td>
            </>
          )}
          {activeTab === "housing" && (
            <>
              <td className={commonCellClass}>{record.waterSource}</td>
              <td className={commonCellClass}>{record.roofMaterial}</td>
              <td className={commonCellClass}>Concrete</td>
            </>
          )}
          <td className={`sticky right-0 z-10 bg-white group-hover:bg-gray-50 text-right ${commonCellClass} shadow-[-1px_0_0_rgba(0,0,0,0.1)] ${isExpanded ? "bg-gray-50/50!" : ""}`}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRecord(record.id);
              }}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-[#175CD3] transition hover:bg-[#EFF8FF]"
            >
              Open
              <ChevronRight size={14} />
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={100} className="p-0 border-none">
            {isExpanded && (
              <div className="overflow-hidden">
                <div className="bg-gray-50 p-6 border-l-4 border-blue-500 shadow-inner">
                  <h3 className="mb-4 text-sm font-semibold text-gray-900">Household Members</h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Name", "Relationship", "Age", "Sex", "Marital Status", "Education"].map((h) => (
                            <th key={h} className="px-4 py-2 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {record.members.map((m) => (
                          <tr key={m.id} className="transition-colors hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{m.a01FirstName} {m.a01LastName}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{m.a02Relationship === "01" ? "Head" : "Member"}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{m.a05Age}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{m.a03Sex === "1" ? "Male" : "Female"}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{m.a07MaritalStatus === "2" ? "Married" : "Single"}</td>
                            <td className="px-4 py-2 text-sm text-gray-500">{m.a11HighestGradeCompleted === "601" ? "Bachelor's Degree" : "High School"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  };

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-2xl">
        <Database className="h-12 w-12 text-gray-300" />
        <p className="mt-4 text-lg font-medium text-gray-900">No records found</p>
        <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>{renderHeaders()}</thead>
          <tbody className="bg-white">{records.map(renderRow)}</tbody>
        </table>
      </div>
    </section>
  );
};
