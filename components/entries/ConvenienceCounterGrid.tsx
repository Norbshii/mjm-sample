"use client";

import { Minus, Plus } from "lucide-react";
import { o14Items, type O14Key } from "@/constants/section-o";

type ConvenienceCounterGridProps = {
  values: Record<O14Key, number>;
  onChange: (key: O14Key, value: number) => void;
};

export function ConvenienceCounterGrid({ values, onChange }: ConvenienceCounterGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
      {o14Items.map((item) => {
        const current = values[item.key] ?? 0;
        return (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-[#F9FAFB]/60 px-3 py-2.5"
          >
            <span className="text-sm text-[#344054]">{item.label}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease ${item.label}`}
                onClick={() => onChange(item.key, Math.max(0, current - 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#344054] transition hover:bg-gray-50"
              >
                <Minus size={14} />
              </button>
              <span className="inline-flex h-8 min-w-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-2 text-sm font-semibold text-[#101828]">
                {current}
              </span>
              <button
                type="button"
                aria-label={`Increase ${item.label}`}
                onClick={() => onChange(item.key, Math.min(99, current + 1))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#344054] transition hover:bg-gray-50"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
