"use client";

import type { SectionLOption } from "@/constants/section-l";

type SafetyCardRadioGroupProps = {
  id: string;
  label: string;
  value: string;
  options: SectionLOption[];
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

export function SafetyCardRadioGroup({
  id,
  label,
  value,
  options,
  error,
  required,
  onChange,
}: SafetyCardRadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-[#344054]">
        {label}
        {required ? " *" : ""}
      </legend>

      <div id={id} className="mt-4 flex flex-col gap-3" role="radiogroup" aria-invalid={Boolean(error)}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                selected
                  ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              } ${error && !selected ? "border-[#FDA29B]" : ""}`}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">
                <span className="mr-2 font-semibold text-[#175CD3]">{option.value}</span>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      {error ? <p className="text-xs text-[#D92D20]">{error}</p> : null}
    </fieldset>
  );
}
