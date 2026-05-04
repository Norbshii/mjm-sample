import { LoginFormSandbox } from "@/components/untitledui/login-form-sandbox";

export default function SuperAdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9FAFB] p-8 font-[Inter,ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Helvetica,Arial,sans-serif]">
      <section className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500">
            Municipality
            <br />
            Seal
          </div>
          <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Super Administrator Access
          </p>
        </div>

        <LoginFormSandbox
          idLabel="Super Admin ID"
          idHint="Use the assigned super administrator identifier."
          dashboardRoute="/dashboard/super-admin"
        />
      </section>
    </main>
  );
}
