import { Suspense } from "react";
import { DashboardSandbox } from "@/components/untitledui/dashboard-sandbox";

function EncoderContent() {
  return (
    <DashboardSandbox
      title="Encoder Dashboard"
      subtitle="Barangay Encoder workspace preview."
    />
  );
}

export default function EncoderDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EncoderContent />
    </Suspense>
  );
}
