"use client";

import { gMatrixColumns, gMatrixRows } from "@/constants/sections-ghi";

export const gFieldKeys = ["g01", "g02", "g03", "g04", "g05", "g06", "g07", "g08"] as const;
export type GFieldKey = (typeof gFieldKeys)[number];

export type FoodSecurityMatrixValues = Record<GFieldKey, string>;

type FoodSecurityMatrixProps = {
  values: FoodSecurityMatrixValues;
  errors: Partial<Record<GFieldKey, { message?: string }>>;
  onChange: (field: GFieldKey, value: string) => void;
};

export function FoodSecurityMatrix({ values, errors, onChange }: FoodSecurityMatrixProps) {
  const matrixError = gFieldKeys.some((key) => errors[key]?.message);

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-[#F9FAFB]">
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                Question Indicator
              </th>
              {gMatrixColumns.map((column) => (
                <th
                  key={column.value}
                  className="px-3 py-3 text-center text-xs font-semibold tracking-wide text-[#475467] uppercase"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gMatrixRows.map((row) => {
              const field = row.id as GFieldKey;
              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 align-top">
                    <p className="text-xs font-semibold text-[#175CD3]">{row.code}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#344054]">{row.question}</p>
                    {errors[field]?.message ? (
                      <p className="mt-1 text-xs text-[#D92D20]">{errors[field]?.message}</p>
                    ) : null}
                  </td>
                  {gMatrixColumns.map((column) => {
                    const checked = values[field] === column.value;
                    return (
                      <td key={`${row.id}-${column.value}`} className="px-3 py-4 text-center align-middle">
                        <label className="inline-flex cursor-pointer items-center justify-center">
                          <input
                            type="radio"
                            name={field}
                            value={column.value}
                            checked={checked}
                            onChange={() => onChange(field, column.value)}
                            className="h-4 w-4 border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                          />
                          <span className="sr-only">
                            {row.code} — {column.label}
                          </span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {matrixError ? (
        <p className="text-xs text-[#D92D20]">Please answer all food security questions (G01–G08).</p>
      ) : null}
    </div>
  );
}
