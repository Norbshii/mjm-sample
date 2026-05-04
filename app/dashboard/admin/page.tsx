import { Suspense } from "react";
import { DashboardSandbox } from "@/components/untitledui/dashboard-sandbox";

function AdminContent() {
  return (
    <DashboardSandbox
      title="Admin Dashboard"
      subtitle="Municipal administrator workspace preview."
    />
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}
