"use client";

import {
  AlertCircle,
  CheckCircle2,
  CloudOff,
  LoaderCircle,
  RefreshCcw,
  Wifi,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type ConnectionState = "online" | "offline" | "syncing" | "failed";
type RecordStatus = "Draft" | "Completed" | "Needs Correction" | "Unsynced";
type SyncItem = {
  id: string;
  headName: string;
  savedAt: string;
  status: RecordStatus;
  syncError?: string;
};

const initialItems: SyncItem[] = [
  {
    id: "HH-2026-0192",
    headName: "Ana Villanueva",
    savedAt: "Today, 8:42 AM",
    status: "Unsynced",
    syncError: "Network timeout during upload.",
  },
  {
    id: "HH-2026-0193",
    headName: "Leo Mendoza",
    savedAt: "Today, 8:57 AM",
    status: "Draft",
    syncError: "Server temporarily unavailable.",
  },
  {
    id: "HH-2026-0194",
    headName: "Grace Cortez",
    savedAt: "Today, 9:11 AM",
    status: "Needs Correction",
  },
];

const statusClasses: Record<RecordStatus, string> = {
  Draft: "border-gray-300 bg-gray-100 text-gray-700",
  Completed: "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
  "Needs Correction": "border-[#FEC84B] bg-[#FFFAEB] text-[#B54708]",
  Unsynced: "border-[#FDE272] bg-[#FEFCE8] text-[#A16207]",
};

function ConnectionBadge({ state }: { state: ConnectionState }) {
  if (state === "online") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ABEFC6] bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#067647]">
        <Wifi size={12} />
        Online
      </span>
    );
  }

  if (state === "offline") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
        <CloudOff size={12} />
        Offline
      </span>
    );
  }

  if (state === "syncing") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B2DDFF] bg-[#EFF8FF] px-3 py-1 text-xs font-semibold text-[#175CD3]">
        <LoaderCircle size={12} className="animate-spin" />
        Syncing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FDA29B] bg-[#FEF3F2] px-3 py-1 text-xs font-semibold text-[#B42318]">
      <AlertCircle size={12} />
      Sync Failed
    </span>
  );
}

export default function PendingSyncPage() {
  const [connectionState, setConnectionState] = useState<ConnectionState>("online");
  const [items, setItems] = useState<SyncItem[]>(initialItems);
  const [toasts, setToasts] = useState<Array<{ id: number; kind: "saved" | "synced" }>>([]);
  const toastIdRef = useRef(1);

  const pushToast = (kind: "saved" | "synced") => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const pendingCount = useMemo(
    () => items.filter((item) => item.status === "Unsynced" || item.syncError).length,
    [items],
  );

  const retryItem = (id: string) => {
    setConnectionState("syncing");
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                syncError: undefined,
                status: "Completed",
              }
            : item,
        ),
      );
      setConnectionState("online");
      pushToast("synced");
    }, 900);
  };

  const syncAll = () => {
    setConnectionState("syncing");
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) => ({ ...item, syncError: undefined, status: "Completed" })),
      );
      setConnectionState("online");
      pushToast("synced");
    }, 1200);
  };

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">Pending Sync</h1>
            <p className="mt-1 text-sm text-[#475467]">
              {pendingCount} record(s) saved locally and waiting for upload.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ConnectionBadge state={connectionState} />
            <button
              type="button"
              onClick={() => pushToast("saved")}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB]"
            >
              Save Local Test
            </button>
            <button
              type="button"
              onClick={syncAll}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#175CD3] px-4 text-sm font-semibold text-white hover:bg-[#1849A9]"
            >
              <RefreshCcw size={14} />
              Sync Now
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setConnectionState("online")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
          >
            Set Online
          </button>
          <button
            type="button"
            onClick={() => setConnectionState("offline")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
          >
            Set Offline
          </button>
          <button
            type="button"
            onClick={() => setConnectionState("syncing")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
          >
            Set Syncing
          </button>
          <button
            type="button"
            onClick={() => setConnectionState("failed")}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
          >
            Set Sync Failed
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Record ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Head Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Saved Locally
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Sync Result
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide text-[#475467] uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-[#F9FAFB]">
                  <td className="px-4 py-3 text-sm font-medium text-[#101828]">{item.id}</td>
                  <td className="px-4 py-3 text-sm text-[#344054]">{item.headName}</td>
                  <td className="px-4 py-3 text-sm text-[#475467]">{item.savedAt}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.syncError ? (
                      <span className="text-[#B42318]">{item.syncError}</span>
                    ) : (
                      <span className="text-[#067647]">Ready</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {item.syncError ? (
                      <button
                        type="button"
                        onClick={() => retryItem(item.id)}
                        className="inline-flex h-8 items-center gap-1 rounded-lg border border-gray-300 px-3 text-xs font-semibold text-[#344054] hover:bg-[#F9FAFB]"
                      >
                        <RefreshCcw size={12} />
                        Retry
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-[#667085]">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="pointer-events-none fixed right-4 bottom-4 z-80 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex min-w-72 items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
          >
            <span className="mt-0.5 text-[#067647]">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                {toast.kind === "saved" ? "Record Saved Locally" : "Sync Successful"}
              </p>
              <p className="mt-1 text-xs text-[#475467]">
                {toast.kind === "saved"
                  ? "Data is queued and will upload once the connection is available."
                  : "Pending records uploaded to the server successfully."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
