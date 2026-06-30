"use client";

import {
  k03Options,
  type K03CaptureValue,
  type K03OptionKey,
} from "@/constants/section-k";

type InternetConnectionGridProps = {
  values: Record<K03OptionKey, K03CaptureValue>;
  error?: string;
  onToggle: (key: K03OptionKey) => void;
};

export function InternetConnectionGrid({ values, error, onToggle }: InternetConnectionGridProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-[#344054]">
        K03. What types of internet connection are available at home? *
      </legend>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {k03Options.map((option) => {
          const key = option.value;
          const checked = values[key] === "1";
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-blue-500 bg-blue-50/30"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(key)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
              />
              <span className="min-w-0">
                <span className="font-semibold text-gray-900">
                  {option.value} — {option.title}
                </span>
                {option.examples ? (
                  <span className="mt-1 block text-sm text-gray-500">[{option.examples}]</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? <p className="text-xs text-[#D92D20]">{error}</p> : null}
    </fieldset>
  );
}
