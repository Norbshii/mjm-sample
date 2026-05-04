 "use client";

import {
  AlertCircle,
  ChevronRight,
  Database,
  Filter,
  Plus,
  Search,
  WifiOff,
  Wifi,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type RecordRow = {
  id: string;
  headName: string;
  address: string;
  status: "Draft" | "Completed" | "Needs Correction";
  syncStatus: "Synced" | "Unsynced";
  barangay: string;
  purok: string;
};

const records: RecordRow[] = [
  {
    id: "HH-2026-0012",
    headName: "Juan Dela Cruz",
    address: "Purok 1, Barangay San Isidro",
    status: "Draft",
    syncStatus: "Synced",
    barangay: "San Isidro",
    purok: "Purok 1",
  },
  {
    id: "HH-2026-0028",
    headName: "Maria Santos",
    address: "Purok 3, Barangay Mabini",
    status: "Completed",
    syncStatus: "Synced",
    barangay: "Mabini",
    purok: "Purok 3",
  },
  {
    id: "HH-2026-0045",
    headName: "Pedro Villanueva",
    address: "Purok 2, Barangay Mabini",
    status: "Needs Correction",
    syncStatus: "Unsynced",
    barangay: "Mabini",
    purok: "Purok 2",
  },
];

const statusClasses: Record<RecordRow["status"], string> = {
  Draft: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
  Completed: "bg-[#ECFDF3] text-[#067647] border-[#ABEFC6]",
  "Needs Correction": "bg-[#FFFAEB] text-[#B54708] border-[#FEC84B]",
};

export default function OpenSpreadsheetPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [barangayFilter, setBarangayFilter] = useState("All");
  const [purokFilter, setPurokFilter] = useState("All");
  const [syncFilter, setSyncFilter] = useState("All");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const bySearch =
        record.id.toLowerCase().includes(search.toLowerCase()) ||
        record.headName.toLowerCase().includes(search.toLowerCase()) ||
        record.address.toLowerCase().includes(search.toLowerCase());
      const byBarangay =
        barangayFilter === "All" || record.barangay === barangayFilter;
      const byPurok = purokFilter === "All" || record.purok === purokFilter;
      const bySync = syncFilter === "All" || record.syncStatus === syncFilter;
      return bySearch && byBarangay && byPurok && bySync;
    });
  }, [search, barangayFilter, purokFilter, syncFilter]);

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#667085]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search household ID, head name, or address"
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pr-3 pl-9 text-sm text-[#101828] outline-none transition focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            <Filter size={16} />
            Filter
          </button>

          <button
            type="button"
            onClick={() => setShowDuplicateModal(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-4 text-sm font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9]"
          >
            <Plus size={16} />
            Add New Record
          </button>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-3 text-[#475467]">
              <Database size={24} />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#101828]">No records found</h2>
            <p className="mt-1 max-w-md text-sm text-[#475467]">
              Try adjusting your search or filters, or add a new household record
              to start your spreadsheet list.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Household ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Head Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Sync Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-[#475467] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-[#F9FAFB]">
                    <td className="px-4 py-4 text-sm font-medium text-[#101828]">{record.id}</td>
                    <td className="px-4 py-4 text-sm text-[#344054]">{record.headName}</td>
                    <td className="px-4 py-4 text-sm text-[#475467]">{record.address}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[record.status]}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#344054]">
                      <span className="inline-flex items-center gap-1.5">
                        {record.syncStatus === "Synced" ? (
                          <Wifi size={15} className="text-[#067647]" />
                        ) : (
                          <WifiOff size={15} className="text-[#B54708]" />
                        )}
                        {record.syncStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-[#175CD3] transition hover:bg-[#EFF8FF]"
                      >
                        Open
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isFilterOpen ? (
        <>
          <div className="fixed inset-0 z-50 bg-[#101828]/50" onClick={() => setIsFilterOpen(false)} />
          <aside className="fixed top-0 right-0 z-60 flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#101828]">Filter Records</h2>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="rounded-md p-1 text-[#667085] transition hover:bg-[#F2F4F7]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#344054]">Barangay</span>
                <select
                  value={barangayFilter}
                  onChange={(event) => setBarangayFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
                >
                  <option>All</option>
                  <option>San Isidro</option>
                  <option>Mabini</option>
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#344054]">Purok</span>
                <select
                  value={purokFilter}
                  onChange={(event) => setPurokFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
                >
                  <option>All</option>
                  <option>Purok 1</option>
                  <option>Purok 2</option>
                  <option>Purok 3</option>
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#344054]">Sync Status</span>
                <select
                  value={syncFilter}
                  onChange={(event) => setSyncFilter(event.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
                >
                  <option>All</option>
                  <option>Synced</option>
                  <option>Unsynced</option>
                </select>
              </label>
            </div>

            <div className="mt-auto flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  setBarangayFilter("All");
                  setPurokFilter("All");
                  setSyncFilter("All");
                }}
                className="h-11 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="h-11 flex-1 rounded-xl bg-[#175CD3] px-4 text-sm font-semibold text-white transition hover:bg-[#1849A9]"
              >
                Apply Filters
              </button>
            </div>
          </aside>
        </>
      ) : null}

      {showDuplicateModal ? (
        <>
          <div
            className="fixed inset-0 z-50 bg-[#101828]/50"
            onClick={() => setShowDuplicateModal(false)}
          />
          <section className="fixed inset-0 z-60 flex items-center justify-center p-6">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-[#FFFAEB] p-2 text-[#B54708]">
                  <AlertCircle size={18} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#101828]">Duplicate Check</h3>
                  <p className="mt-1 text-sm text-[#475467]">
                    Before creating a new household record, run duplicate checking
                    against existing entries to avoid double encoding.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDuplicateModal(false)}
                  className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/entries")}
                  className="h-10 rounded-lg bg-[#175CD3] px-4 text-sm font-semibold text-white transition hover:bg-[#1849A9]"
                >
                  Continue to Editor
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
