"use client";

import { Suspense } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff, Loading03 } from "@untitledui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type LoginFormSandboxProps = {
  idLabel: string;
  idHint: string;
  dashboardRoute: string;
  errorMessage?: string;
};

function LoginFormSandboxContent({
  idLabel,
  idHint,
  dashboardRoute,
  errorMessage = "Account Locked. Please contact your Municipal Admin.",
}: LoginFormSandboxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [password, setPassword] = useState("");

  const forcedState = useMemo(() => searchParams.get("state"), [searchParams]);
  const isLoading = forcedState === "loading";
  const isError = forcedState === "error";
  const isSuccess = forcedState === "success";
  const controlsDisabled = isLoading || isSuccess;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(dashboardRoute);
  };

  return (
    <form className="mt-8 space-y-6" aria-label="Design sandbox login form" onSubmit={handleLogin}>
      {isError ? (
        <div
          className="flex items-start gap-3 rounded-xl border border-[#FDA29B] bg-[#FEF3F2] p-4"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={18} className="mt-0.5 text-[#D92D20]" />
          <p className="text-sm font-medium text-[#B42318]">{errorMessage}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="relative">
          <input
            id="user-id"
            name="userId"
            type="text"
            value={idValue}
            onChange={(event) => setIdValue(event.target.value)}
            placeholder=" "
            disabled={controlsDisabled}
            className="peer h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm text-gray-900 outline-none transition focus:border-[#7F56D9] focus:ring-4 focus:ring-[#F4EBFF] disabled:cursor-not-allowed disabled:bg-gray-50"
          />
          <label
            htmlFor="user-id"
            className="pointer-events-none absolute left-4 top-3 origin-left bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#6941C6]"
          >
            {idLabel}
          </label>
        </div>
        <p className="text-sm text-gray-600">{idHint}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={controlsDisabled}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#7F56D9] focus:ring-4 focus:ring-[#F4EBFF] disabled:cursor-not-allowed disabled:bg-gray-50"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={controlsDisabled}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={controlsDisabled}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7F56D9] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E9D7FE]"
      >
        {isLoading ? (
          <>
            <Loading03 size={18} className="animate-spin" />
            Signing in...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={18} />
            Success
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export function LoginFormSandbox(props: LoginFormSandboxProps) {
  return (
    <Suspense fallback={null}>
      <LoginFormSandboxContent {...props} />
    </Suspense>
  );
}
