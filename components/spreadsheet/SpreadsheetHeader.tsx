"use client";

import React from "react";
import { Search, Filter, Plus } from "lucide-react";

interface SpreadsheetHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onFilterClick: () => void;
}

export const SpreadsheetHeader: React.FC<SpreadsheetHeaderProps> = ({
  search,
  setSearch,
  onFilterClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Household Records Database</h1>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            className="h-10 w-64 rounded-xl border border-gray-300 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={onFilterClick}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95"
        >
          <Filter size={16} />
          Filter
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#175CD3] px-4 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition active:scale-95">
          <Plus size={16} />
          Add New Record
        </button>
      </div>
    </div>
  );
};
