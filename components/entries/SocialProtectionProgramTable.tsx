"use client";

import type { FieldErrors, UseFormSetValue } from "react-hook-form";
import { TristateRadioGroup } from "@/components/entries/TristateRadioGroup";
import { FormInput } from "@/components/untitledui/form-engine-fields";
import type { TristateValue } from "@/constants/section-m";

type ProgramRow = {
  key: string;
  label: string;
};

type SocialProtectionProgramTableProps<TForm extends Record<string, unknown>> = {
  programs: ProgramRow[];
  primaryPrefix: "m01" | "m05";
  secondaryPrefix: "m02" | "m06";
  primaryQuestion: string;
  secondaryQuestion: string;
  values: TForm;
  errors: FieldErrors<TForm>;
  setValue: UseFormSetValue<TForm>;
  specifyValue?: string;
  specifyError?: string;
  onSpecifyChange?: (value: string) => void;
};

export function SocialProtectionProgramTable<TForm extends Record<string, unknown>>({
  programs,
  primaryPrefix,
  secondaryPrefix,
  primaryQuestion,
  secondaryQuestion,
  values,
  errors,
  setValue,
  specifyValue,
  specifyError,
  onSpecifyChange,
}: SocialProtectionProgramTableProps<TForm>) {
  const handlePrimaryChange = (rowKey: string, value: TristateValue) => {
    const primaryField = `${primaryPrefix}_${rowKey}` as keyof TForm;
    const secondaryField = `${secondaryPrefix}_${rowKey}` as keyof TForm;
    setValue(primaryField, value as TForm[keyof TForm], { shouldValidate: true });
    if (value !== "1") {
      setValue(secondaryField, undefined as TForm[keyof TForm], { shouldValidate: true });
      if (rowKey === "Z" && primaryPrefix === "m05" && onSpecifyChange) {
        onSpecifyChange("");
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-[#F9FAFB]">
            <th className="w-[40%] px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
              Program Name
            </th>
            <th className="w-[30%] px-3 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
              {primaryQuestion}
            </th>
            <th className="w-[30%] px-3 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
              {secondaryQuestion}
            </th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, index) => {
            const primaryField = `${primaryPrefix}_${program.key}`;
            const secondaryField = `${secondaryPrefix}_${program.key}`;
            const primaryValue = String(values[primaryField] ?? "");
            const showSecondary = primaryValue === "1";
            const primaryError = errors[primaryField as keyof TForm]?.message as string | undefined;
            const secondaryError = errors[secondaryField as keyof TForm]?.message as string | undefined;

            return (
              <tr
                key={program.key}
                className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-gray-50/50" : "bg-white"}`}
              >
                <td className="px-4 py-4 align-top">
                  <p className="text-xs font-semibold text-[#175CD3]">{program.key}</p>
                  <p className="mt-1 leading-relaxed text-[#344054]">{program.label}</p>
                  {program.key === "Z" && primaryPrefix === "m05" && showSecondary && onSpecifyChange ? (
                    <div className="mt-4 max-w-md">
                      <FormInput
                        id="m05-z-specify"
                        label="Please specify other government program"
                        required
                        value={specifyValue ?? ""}
                        error={specifyError}
                        onChange={onSpecifyChange}
                      />
                    </div>
                  ) : null}
                </td>
                <td className="px-3 py-4 align-top">
                  <TristateRadioGroup
                    name={primaryField}
                    value={primaryValue}
                    error={primaryError}
                    onChange={(value) => handlePrimaryChange(program.key, value)}
                  />
                </td>
                <td className="px-3 py-4 align-top">
                  {showSecondary ? (
                    <TristateRadioGroup
                      name={secondaryField}
                      value={String(values[secondaryField] ?? "")}
                      error={secondaryError}
                      onChange={(value) =>
                        setValue(secondaryField as keyof TForm, value as TForm[keyof TForm], {
                          shouldValidate: true,
                        })
                      }
                    />
                  ) : (
                    <span className="text-xs text-[#98A2B3]">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
