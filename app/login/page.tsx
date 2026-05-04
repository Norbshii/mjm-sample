"use client";

import { Eye, EyeOff, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"encoder" | "admin" | "super-admin">(
    "encoder",
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRole === "encoder") {
      router.push("/dashboard/encoder");
      return;
    }

    if (selectedRole === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    router.push("/dashboard/super-admin");
  };

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="relative flex items-center justify-center bg-white px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-[#F2F4F7] text-[#475467]">
              <LayoutDashboard size={14} />
            </span>
            <p className="text-sm font-semibold tracking-wide text-[#101828]">LGU CBMS</p>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#101828]">Log in</h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>

          <div className="mt-6 grid grid-cols-3 rounded-xl border border-gray-200 bg-[#F9FAFB] p-1">
            <button
              type="button"
              onClick={() => setSelectedRole("encoder")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedRole === "encoder"
                  ? "bg-white text-[#175CD3] shadow-sm"
                  : "text-[#475467] hover:text-[#344054]"
              }`}
            >
              Encoder
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("admin")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedRole === "admin"
                  ? "bg-white text-[#175CD3] shadow-sm"
                  : "text-[#475467] hover:text-[#344054]"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("super-admin")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedRole === "super-admin"
                  ? "bg-white text-[#175CD3] shadow-sm"
                  : "text-[#475467] hover:text-[#344054]"
              }`}
            >
              Super Admin
            </button>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label htmlFor="identity" className="text-sm font-medium text-[#344054]">
                Email or Encoder ID
              </label>
              <input
                id="identity"
                type="text"
                placeholder="Enter your email or ID"
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-[#101828] outline-none transition focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#344054]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 pr-11 text-sm text-[#101828] outline-none transition focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#667085] hover:text-[#344054]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-[#475467]">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                Remember for 30 days
              </label>
              <Link href="#" className="text-sm font-medium text-[#175CD3] hover:text-[#1849A9]">
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-[#175CD3] px-4 text-sm font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B2DDFF]"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="absolute bottom-6 left-6 text-sm text-gray-400 sm:left-10">
          © LGU-CBMS 2026
        </p>
      </section>

      <section className="hidden bg-gray-50 lg:flex lg:items-center lg:justify-center lg:p-10">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
          <div className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#101828]">Dashboard Preview</p>
              <span className="rounded-full bg-[#ECFDF3] px-2 py-1 text-xs font-medium text-[#067647]">
                Online
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-lg border border-gray-200 bg-white" />
              <div className="h-20 rounded-lg border border-gray-200 bg-white" />
              <div className="h-20 rounded-lg border border-gray-200 bg-white" />
            </div>
            <div className="mt-3 h-48 rounded-lg border border-gray-200 bg-white" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="h-24 rounded-lg border border-gray-200 bg-white" />
              <div className="h-24 rounded-lg border border-gray-200 bg-white" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
