"use client";

import { FormInput } from "@/components/untitledui/form-engine-fields";
import {
  j01Options,
  type J01CaptureValue,
  type J01OptionKey,
} from "@/constants/section-j";

type NegativeShocksGridProps = {
  values: Record<J01OptionKey, J01CaptureValue>;
  specify: string;
  specifyError?: string;
  onToggle: (key: J01OptionKey) => void;
  onSpecifyChange: (value: string) => void;
};

export function NegativeShocksGrid({
  values,
  specify,
  specifyError,
  onToggle,
  onSpecifyChange,
}: NegativeShocksGridProps) {
  const showSpecify = values.Z === "1";

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[#344054]">
          J01. Negative shocks experienced (check all that apply) *
        </legend>
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
          {j01Options.map((option) => {
            const key = option.value as J01OptionKey;
            const checked = values[key] === "1";
            return (
              <div key={option.value} className="space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition ${
                    checked
                      ? "border-blue-500 bg-blue-50/30"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(key)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                  />
                  <span className="text-sm leading-relaxed text-[#344054]">{option.label}</span>
                </label>
                {option.value === "Z" && showSpecify ? (
                  <FormInput
                    id="j01-z-specify"
                    label="Specify other negative shock"
                    required
                    value={specify}
                    error={specifyError}
                    onChange={onSpecifyChange}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
