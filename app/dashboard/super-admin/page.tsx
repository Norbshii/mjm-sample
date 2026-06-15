import { Suspense } from "react";
import { DashboardSandbox } from "@/components/untitledui/dashboard-sandbox";

function SuperAdminContent() {
  return (
    <DashboardSandbox
      title="Super Admin Dashboard"
      subtitle="Super administrator workspace preview."
    />
  );
}

export default function SuperAdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperAdminContent />
    </Suspense>
  );
}
