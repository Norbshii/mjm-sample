"use client";

import { FormInput } from "@/components/untitledui/form-engine-fields";
import { i01Options, isI01OptionDisabled, normalizeI01Selection } from "@/constants/sections-ghi";

type FinanceAccountGridProps = {
  values: string[];
  specify: string;
  error?: string;
  specifyError?: string;
  onChange: (values: string[]) => void;
  onSpecifyChange: (value: string) => void;
};

export function FinanceAccountGrid({
  values,
  specify,
  error,
  specifyError,
  onChange,
  onSpecifyChange,
}: FinanceAccountGridProps) {
  const showSpecify = values.includes("Z");

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[#344054]">
          I01. Formal financial account(s) owned by you or any of your household members *
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {i01Options.map((option) => {
            const checked = values.includes(option.value);
            const disabled = isI01OptionDisabled(values, option.value);
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  checked
                    ? "border-blue-500 bg-blue-50/30"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onChange(normalizeI01Selection(values, option.value))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF] disabled:cursor-not-allowed"
                />
                <span className="min-w-0 space-y-1">
                  <span className="block text-sm font-medium text-[#101828]">{option.label}</span>
                  {option.description ? (
                    <span className="block text-xs leading-relaxed text-[#667085]">{option.description}</span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
        {error ? <p className="mt-2 text-xs text-[#D92D20]">{error}</p> : null}
      </fieldset>

      {showSpecify ? (
        <FormInput
          id="i01-z-specify"
          label="Specify other financial account"
          required
          value={specify}
          error={specifyError}
          onChange={onSpecifyChange}
        />
      ) : null}
    </div>
  );
}
