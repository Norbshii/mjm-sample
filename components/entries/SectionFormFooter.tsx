"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type SectionFormFooterProps = {
  onPrevious?: () => void;
  submitLabel?: string;
  submitVariant?: "primary" | "danger";
};

export function SectionFormFooter({
  onPrevious,
  submitLabel = "Save & Next Section",
  submitVariant = "primary",
}: SectionFormFooterProps) {
  const submitClass =
    submitVariant === "danger"
      ? "bg-[#D92D20] shadow-[#D92D20]/20 hover:bg-[#B42318]"
      : "bg-[#175CD3] shadow-[#175CD3]/20 hover:bg-[#1849A9]";
  return (
    <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={onPrevious}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
      >
        <ChevronLeft size={16} />
        Previous Section
      </button>
      <button
        type="submit"
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-lg transition ${submitClass}`}
      >
        {submitLabel}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
