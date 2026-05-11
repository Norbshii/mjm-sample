"use client";

import React from "react";
import { X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  barangayFilter: string;
  setBarangayFilter: (value: string) => void;
  syncFilter: string;
  setSyncFilter: (value: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  barangayFilter,
  setBarangayFilter,
  syncFilter,
  setSyncFilter,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#101828]/50 transition-opacity" onClick={onClose} />
      <aside className="fixed bottom-0 right-0 top-0 z-[60] w-full max-w-md border-l border-gray-200 bg-white p-6 shadow-xl transition-transform duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Filter Records</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Barangay</label>
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 h-11 px-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition bg-white"
            >
              <option value="All">All Barangays</option>
              <option value="San Isidro">San Isidro</option>
              <option value="Mabini">Mabini</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sync Status</label>
            <select
              value={syncFilter}
              onChange={(e) => setSyncFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 h-11 px-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Synced">Synced</option>
              <option value="Unsynced">Unsynced</option>
            </select>
          </div>
          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => {
                setBarangayFilter("All");
                setSyncFilter("All");
              }}
              className="flex-1 h-11 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-95"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-[#175CD3] font-semibold text-white shadow-sm hover:bg-blue-700 transition active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
