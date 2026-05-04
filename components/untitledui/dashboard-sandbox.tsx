"use client";

import { Suspense } from "react";
import { AlertCircle, XClose } from "@untitledui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DashboardSandboxProps = {
  title: string;
  subtitle: string;
};

function DashboardSandboxContent({ title, subtitle }: DashboardSandboxProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal");
  const modalOpen =
    modalType === "open" ||
    modalType === "true" ||
    modalType === "account-locked" ||
    modalType === "session-timeout";

  const closeModal = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("modal");
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#F9FAFB] p-8 font-[Inter,ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Helvetica,Arial,sans-serif]">
      <section className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        <div className="mt-6 rounded-xl border border-[#D6BBFB] bg-[#F9F5FF] p-4 text-sm text-[#6941C6]">
          Design sandbox dashboard. Use the Dev Menu to jump routes and force overlay states.
        </div>
      </section>

      {modalOpen ? (
        <>
          <div className="fixed inset-0 z-50 bg-[#101828]/50" aria-hidden="true" />
          <section
            className="fixed inset-0 z-60 flex items-center justify-center p-8"
            aria-label="Sample admin modal"
          >
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-[#FEF3F2] p-2 text-[#D92D20]">
                    <AlertCircle size={18} />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      {modalType === "session-timeout"
                        ? "Session Timeout Warning"
                        : modalType === "account-locked"
                          ? "Account Locked"
                          : "Sample Approval Modal"}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {modalType === "session-timeout"
                        ? "Your session is about to expire. Save any edits before continuing."
                        : modalType === "account-locked"
                          ? "This account is currently locked. Contact your Municipal Admin for reactivation."
                          : "This modal is for visual QA of admin/super-admin overlay layers."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <XClose size={18} />
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}

export function DashboardSandbox(props: DashboardSandboxProps) {
  return (
    <Suspense fallback={null}>
      <DashboardSandboxContent {...props} />
    </Suspense>
  );
}
