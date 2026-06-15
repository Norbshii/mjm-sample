"use client";

import { CheckCircle, Eye, EyeOff, Loading03 } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EncoderLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [encoderId, setEncoderId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || isSuccess) {
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (encoderId.trim() === "encoder123") {
      setIsLoading(false);
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push("/dashboard/encoder");
      return;
    }

    setIsLoading(false);
    setIsSuccess(false);
    setErrorMessage(
      "Invalid credentials. Please contact your Municipal Admin.",
    );
  };

  return (
    <form
      className="mt-8 space-y-6"
      aria-label="Barangay encoder sign in"
      onSubmit={handleLogin}
    >
      {errorMessage ? (
        <div
          className="flex gap-3 rounded-xl border border-[#FDA29B] bg-[#FEF3F2] p-4"
          role="alert"
          aria-live="polite"
        >
          <span className="mt-0.5 h-2 w-2 rounded-full bg-[#D92D20]" />
          <p className="text-sm font-medium text-[#B42318]">{errorMessage}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="relative">
          <input
            id="encoder-id"
            name="encoderId"
            type="text"
            value={encoderId}
            onChange={(event) => setEncoderId(event.target.value)}
            required
            placeholder=" "
            disabled={isLoading || isSuccess}
            className="peer h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 pb-2 text-sm text-gray-900 outline-none transition focus:border-[#7F56D9] focus:ring-4 focus:ring-[#F4EBFF]"
          />
          <label
            htmlFor="encoder-id"
            className="pointer-events-none absolute left-4 top-3 origin-left bg-white px-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#6941C6]"
          >
            Encoder ID
          </label>
        </div>
        <p className="text-sm text-gray-600">
          Use the assigned Barangay encoder identifier.
        </p>
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
            required
            disabled={isLoading || isSuccess}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#7F56D9] focus:ring-4 focus:ring-[#F4EBFF]"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={isLoading || isSuccess}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || isSuccess}
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
