import {
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  ClipboardList,
  FileSpreadsheet,
  FileWarning,
  RefreshCcw,
  UploadCloud,
  Wifi,
  WifiOff,
} from "lucide-react";

const summaryCards = [
  {
    label: "My Records",
    count: "128",
    icon: ClipboardList,
    tone: "text-[#175CD3] bg-[#EFF8FF]",
  },
  {
    label: "Draft",
    count: "37",
    icon: CircleDashed,
    tone: "text-[#026AA2] bg-[#E0F2FE]",
  },
  {
    label: "Completed",
    count: "74",
    icon: CheckCircle2,
    tone: "text-[#067647] bg-[#ECFDF3]",
  },
  {
    label: "Needs Correction",
    count: "11",
    icon: FileWarning,
    tone: "text-[#B54708] bg-[#FFFAEB]",
  },
  {
    label: "Unsynced",
    count: "6",
    icon: UploadCloud,
    tone: "text-[#9E3D00] bg-[#FFF6ED]",
  },
];

type RecordStatus = "Draft" | "Completed" | "Needs Correction";
type SyncStatus = "Synced" | "Unsynced";

const recentRecords: Array<{
  householdId: string;
  headName: string;
  address: string;
  status: RecordStatus;
  syncStatus: SyncStatus;
  updatedAt: string;
}> = [
  {
    householdId: "HH-2026-0172",
    headName: "Mario Rosales",
    address: "Purok 2, Barangay Mabini",
    status: "Completed",
    syncStatus: "Synced",
    updatedAt: "2026-04-21T10:34:00",
  },
  {
    householdId: "HH-2026-0173",
    headName: "Luzviminda Cruz",
    address: "Purok 1, Barangay San Isidro",
    status: "Needs Correction",
    syncStatus: "Unsynced",
    updatedAt: "2026-04-21T10:41:00",
  },
  {
    householdId: "HH-2026-0174",
    headName: "Renato Dizon",
    address: "Purok 3, Barangay Mabini",
    status: "Draft",
    syncStatus: "Synced",
    updatedAt: "2026-04-21T10:40:00",
  },
  {
    householdId: "HH-2026-0175",
    headName: "Elena Santos",
    address: "Purok 4, Barangay San Jose",
    status: "Needs Correction",
    syncStatus: "Unsynced",
    updatedAt: "2026-04-21T10:38:00",
  },
  {
    householdId: "HH-2026-0176",
    headName: "Josefina Ramos",
    address: "Purok 2, Barangay San Isidro",
    status: "Completed",
    syncStatus: "Synced",
    updatedAt: "2026-04-21T10:37:00",
  },
  {
    householdId: "HH-2026-0177",
    headName: "Arnold Reyes",
    address: "Purok 5, Barangay San Jose",
    status: "Draft",
    syncStatus: "Unsynced",
    updatedAt: "2026-04-21T10:33:00",
  },
];

const statusBadgeClasses: Record<RecordStatus, string> = {
  Draft: "border-[#B2CCFF] bg-[#F8F9FC] text-[#344054]",
  Completed: "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
  "Needs Correction": "border-[#FEC84B] bg-[#FFFAEB] text-[#B54708]",
};

export default function DashboardPage() {
  const prioritizedRecords = recentRecords
    .slice()
    .sort((a, b) => {
      const aCorrection = a.status === "Needs Correction" ? 0 : 1;
      const bCorrection = b.status === "Needs Correction" ? 0 : 1;
      if (aCorrection !== bCorrection) return aCorrection - bCorrection;
      return (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    })
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#101828]">
              Welcome, Maria Santos
            </h1>
            <p className="mt-2 text-sm text-[#475467]">
              Barangay Encoder workspace overview
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ABEFC6] bg-[#ECFDF3] px-3 py-1 text-sm font-medium text-[#067647]">
            <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
            Online
          </span>
        </div>

        <button
          type="button"
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-4 text-base font-semibold text-white shadow-lg shadow-[#175CD3]/20 transition hover:bg-[#1849A9] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B2DDFF] md:w-auto md:min-w-80"
        >
          <FileSpreadsheet size={20} />
          Open Spreadsheet
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${card.tone}`}
              >
                <Icon size={18} />
              </div>
              <p className="mt-4 text-sm font-medium text-[#475467]">{card.label}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-[#101828]">
                {card.count}
              </p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">Sync Panel</h2>
            <p className="mt-1 text-sm text-[#475467]">
              Last sync time: Today, 10:42 AM
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            <RefreshCcw size={16} />
            Sync Now
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-[#101828]">
            Recent Activity & Corrections
          </h2>
          <p className="mt-1 text-sm text-[#475467]">
            Most recently updated records with correction items pinned first.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[920px] w-full divide-y divide-gray-200">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Household ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Head Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Sync Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#475467]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {prioritizedRecords.map((record) => (
                <tr key={record.householdId} className="hover:bg-[#F9FAFB]">
                  <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                    {record.householdId}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#344054]">
                    {record.headName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#475467]">
                    {record.address}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadgeClasses[record.status]}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#344054]">
                    <span className="inline-flex items-center gap-1.5">
                      {record.syncStatus === "Synced" ? (
                        <Wifi size={14} className="text-[#067647]" />
                      ) : (
                        <WifiOff size={14} className="text-[#B42318]" />
                      )}
                      {record.syncStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#175CD3] hover:text-[#1849A9]"
                    >
                      Open
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
