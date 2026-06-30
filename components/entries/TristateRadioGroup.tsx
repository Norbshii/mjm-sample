"use client";

import { tristateOptions, type TristateValue } from "@/constants/section-m";

type TristateRadioGroupProps = {
  name: string;
  value: string;
  error?: string;
  onChange: (value: TristateValue) => void;
};

export function TristateRadioGroup({ name, value, error, onChange }: TristateRadioGroupProps) {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-2">
        {tristateOptions.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`inline-flex cursor-pointer items-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
                selected
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? <p className="text-xs text-[#D92D20]">{error}</p> : null}
    </div>
  );
}
