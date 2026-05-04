"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

type FieldOption = {
  label: string;
  value: string;
  description?: string;
};

type BaseFieldProps = {
  id: string;
  label: string;
  subtitle?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
};

type FormInputProps = BaseFieldProps & {
  value: string;
  type?: "text" | "date" | "number" | "email";
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function FormInput({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  value,
  type = "text",
  placeholder,
  disabled,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:bg-[#F9FAFB] ${
          error
            ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
            : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
        }`}
      />

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
}

type FormSelectProps = BaseFieldProps & {
  value: string;
  placeholder?: string;
  options: FieldOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function FormSelect({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  value,
  placeholder = "Select an option",
  options,
  disabled,
  onChange,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-[#101828] outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:bg-[#F9FAFB] ${
          error
            ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
            : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
}

type FormRadioGroupProps = BaseFieldProps & {
  value: string;
  options: FieldOption[];
  orientation?: "vertical" | "horizontal";
  onChange: (value: string) => void;
};

export function FormRadioGroup({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  value,
  options,
  orientation = "vertical",
  onChange,
}: FormRadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </legend>

      <div
        id={id}
        className={`gap-2 ${
          orientation === "horizontal"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            : "flex flex-col"
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-2 rounded-lg border p-3 transition ${
              value === option.value
                ? "border-[#B2DDFF] bg-[#EFF8FF]"
                : "border-gray-200 bg-white hover:bg-[#F9FAFB]"
            } ${error ? "border-[#FDA29B]" : ""}`}
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 h-4 w-4 border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
            />
            <span className="space-y-1">
              <span className="block text-sm font-medium text-[#344054]">{option.label}</span>
              {option.description ? (
                <span className="block text-xs text-[#667085]">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </fieldset>
  );
}

type FormCheckboxGroupProps = BaseFieldProps & {
  values: string[];
  options: FieldOption[];
  columns?: 2 | 3 | 4;
  onChange: (values: string[]) => void;
};

export function FormCheckboxGroup({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  values,
  options,
  columns = 2,
  onChange,
}: FormCheckboxGroupProps) {
  const columnClass =
    columns === 4
      ? "md:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

  const toggleValue = (nextValue: string) => {
    if (values.includes(nextValue)) {
      onChange(values.filter((entry) => entry !== nextValue));
    } else {
      onChange([...values, nextValue]);
    }
  };

  return (
    <fieldset className="space-y-2">
      <legend className="space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </legend>

      <div id={id} className={`grid grid-cols-1 gap-2 ${columnClass}`}>
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={`flex items-start gap-2 rounded-lg border p-3 transition ${
                checked
                  ? "border-[#B2DDFF] bg-[#EFF8FF]"
                  : "border-gray-200 bg-white hover:bg-[#F9FAFB]"
              } ${error ? "border-[#FDA29B]" : ""}`}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={checked}
                onChange={() => toggleValue(option.value)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
              />
              <span className="space-y-1">
                <span className="block text-sm font-medium text-[#344054]">{option.label}</span>
                {option.description ? (
                  <span className="block text-xs text-[#667085]">{option.description}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </fieldset>
  );
}

type MatrixColumn = {
  label: string;
  value: string;
};

type MatrixRow = {
  id: string;
  question: string;
  note?: string;
};

type FormRadioMatrixProps = BaseFieldProps & {
  columns?: MatrixColumn[];
  rows: MatrixRow[];
  values: Record<string, string>;
  onChange: (rowId: string, value: string) => void;
};

const defaultMatrixColumns: MatrixColumn[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Don't Know", value: "dont-know" },
  { label: "Prefer Not to Answer", value: "prefer-not-to-answer" },
];

type SearchableGroup = {
  label: string;
  options: FieldOption[];
};

type FormSearchableSelectProps = BaseFieldProps & {
  value: string;
  groups: SearchableGroup[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function FormSearchableSelect({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  value,
  groups,
  placeholder = "Search and select an option",
  disabled,
  onChange,
}: FormSearchableSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    for (const group of groups) {
      const option = group.options.find((entry) => entry.value === value);
      if (option) return option.label;
    }
    return "";
  }, [groups, value]);

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter(
          (option) =>
            option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.options.length > 0);
  }, [groups, query]);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </label>

      <div className="relative">
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => setOpen((previous) => !previous)}
          className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-3 text-left text-sm outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:bg-[#F9FAFB] ${
            error
              ? "border-[#FDA29B] focus:border-[#D92D20] focus:ring-[#FEE4E2]"
              : "border-gray-300 focus:border-[#1570EF] focus:ring-[#D1E9FF]"
          } ${selectedLabel ? "text-[#101828]" : "text-[#667085]"}`}
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
          <ChevronDown size={16} className="text-[#667085]" />
        </button>

        {open && !disabled ? (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
            <div className="relative mb-2">
              <Search
                size={14}
                className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-[#667085]"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search education code"
                className="h-9 w-full rounded-lg border border-gray-200 pr-2 pl-7 text-sm text-[#101828] outline-none focus:border-[#1570EF]"
              />
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredGroups.map((group) => (
                <div key={group.label} className="mb-2 last:mb-0">
                  <p className="px-2 py-1 text-xs font-semibold tracking-wide text-[#667085] uppercase">
                    {group.label}
                  </p>
                  {group.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`block w-full rounded-lg px-2 py-2 text-left text-sm ${
                        value === option.value
                          ? "bg-[#EFF8FF] text-[#175CD3]"
                          : "text-[#344054] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
}

export function FormRadioMatrix({
  id,
  label,
  subtitle,
  helperText,
  error,
  required,
  rows,
  values,
  columns = defaultMatrixColumns,
  onChange,
}: FormRadioMatrixProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="space-y-1">
        <span className="text-sm font-medium text-[#344054]">
          {label}
          {required ? " *" : ""}
        </span>
        {subtitle ? <span className="block text-sm text-[#667085]">{subtitle}</span> : null}
      </legend>

      <div
        id={id}
        className={`overflow-x-auto rounded-xl border ${
          error ? "border-[#FDA29B]" : "border-gray-200"
        }`}
      >
        <table className="min-w-[720px] w-full border-collapse">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                Question
              </th>
              {columns.map((column) => (
                <th
                  key={column.value}
                  className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#475467]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} border-t border-gray-200`}
              >
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-[#344054]">{row.question}</p>
                  {row.note ? <p className="mt-1 text-xs text-[#667085]">{row.note}</p> : null}
                </td>
                {columns.map((column) => (
                  <td key={`${row.id}-${column.value}`} className="px-4 py-3 text-center">
                    <input
                      type="radio"
                      name={`matrix-${row.id}`}
                      checked={values[row.id] === column.value}
                      onChange={() => onChange(row.id, column.value)}
                      className="h-4 w-4 border-gray-300 text-[#175CD3] focus:ring-[#D1E9FF]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error ? (
        <p className="text-xs text-[#D92D20]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#667085]">{helperText}</p>
      ) : null}
    </fieldset>
  );
}
