"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDashed,
  ClipboardList,
  Download,
  FileSpreadsheet,
  FileWarning,
  Filter,
  MoreHorizontal,
  RefreshCcw,
  UploadCloud,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { date: "Jan", currentPeriod: 1200, previousPeriod: 1000 },
  { date: "Feb", currentPeriod: 1900, previousPeriod: 1500 },
  { date: "Mar", currentPeriod: 1500, previousPeriod: 1800 },
  { date: "Apr", currentPeriod: 2200, previousPeriod: 2000 },
  { date: "May", currentPeriod: 2500, previousPeriod: 2200 },
  { date: "Jun", currentPeriod: 2100, previousPeriod: 2400 },
  { date: "Jul", currentPeriod: 2800, previousPeriod: 2600 },
  { date: "Aug", currentPeriod: 3200, previousPeriod: 2800 },
  { date: "Sep", currentPeriod: 2900, previousPeriod: 3000 },
  { date: "Oct", currentPeriod: 3500, previousPeriod: 3200 },
  { date: "Nov", currentPeriod: 3800, previousPeriod: 3400 },
  { date: "Dec", currentPeriod: 4200, previousPeriod: 3800 },
];

const educationData = [
  { name: "Elementary", value: 450 },
  { name: "High School", value: 890 },
  { name: "College Undergrad", value: 320 },
  { name: "Bachelor's Degree", value: 640 },
  { name: "Post-Graduate", value: 120 },
];

const maritalData = [
  { name: "Single", value: 1200 },
  { name: "Married", value: 2450 },
  { name: "Widowed", value: 340 },
  { name: "Separated", value: 150 },
];

const ageSexData = [
  { range: "0-17", male: 420, female: 390 },
  { range: "18-35", male: 850, female: 880 },
  { range: "36-50", male: 620, female: 640 },
  { range: "51-65", male: 410, female: 430 },
  { range: "65+", male: 180, female: 220 },
];

const PIE_COLORS = ["#2E90FA", "#84CAFF", "#444CE7", "#94A3B8"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <p className="mb-1 text-xs font-semibold text-gray-500">{label || payload[0].name}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <p className="text-sm font-medium text-gray-900">
                {entry.name}: {entry.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

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

const analyticsMetrics = [
  {
    id: "total_households",
    title: "Total Households",
    value: "8,746",
    trend: "2.4%",
    trendUp: true,
    icon: Users,
    group: "Operational",
  },
  {
    id: "pending_sync",
    title: "Pending Sync",
    value: "156",
    trend: "3%",
    trendUp: false,
    icon: RefreshCcw,
    group: "Operational",
  },
  {
    id: "needs_correction",
    title: "Needs Correction",
    value: "42",
    trend: "8%",
    trendUp: false,
    icon: FileWarning,
    group: "Operational",
  },
  {
    id: "age_sex",
    title: "Age & Sex Distribution",
    value: "4,140",
    trend: "1.2%",
    trendUp: true,
    icon: Users,
    group: "Demographics",
  },
  {
    id: "marital_status",
    title: "Marital Status",
    value: "100%",
    trend: "0.5%",
    trendUp: true,
    icon: CheckCircle2,
    group: "Demographics",
  },
  {
    id: "highest_grade",
    title: "Highest Grade Completed",
    value: "2,420",
    trend: "5%",
    trendUp: true,
    icon: ClipboardList,
    group: "Demographics",
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
  const [activeMetric, setActiveMetric] = useState(analyticsMetrics[0]);
  const [timeFilter, setTimeFilter] = useState("12 months");
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false);

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

  const renderActiveChart = () => {
    switch (activeMetric.id) {
      case "total_households":
      case "pending_sync":
      case "needs_correction":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#F2F4F7", strokeWidth: 2 }} />
              <Line
                type="monotone"
                dataKey="previousPeriod"
                stroke="#D0D5DD"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: "#D0D5DD" }}
              />
              <Line
                type="monotone"
                dataKey="currentPeriod"
                stroke="#2E90FA"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#2E90FA" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "age_sex":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ageSexData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
              <XAxis
                dataKey="range"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: "20px" }}
              />
              <Bar
                name="Male"
                dataKey="male"
                fill="#2E90FA"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
              <Bar
                name="Female"
                dataKey="female"
                fill="#444CE7"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "highest_grade":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={educationData}
              margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F2F4F7" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#667085", fontSize: 12 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
              <Bar
                dataKey="value"
                fill="#2E90FA"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "marital_status":
        return (
          <div className="relative h-full w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maritalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {maritalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
              <span className="text-2xl font-bold text-gray-900">4,140</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
      </header>

      {/* Main Analytics View */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Row 1: Top KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {analyticsMetrics.slice(0, 3).map((metric) => {
            const Icon = metric.icon;
            const isSelected = activeMetric.id === metric.id;
            return (
              <button
                key={metric.id}
                onClick={() => setActiveMetric(metric)}
                className={`flex flex-col gap-1 rounded-xl border p-5 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-[#2E90FA] bg-white shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] ring-1 ring-[#2E90FA]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className={isSelected ? "text-[#2E90FA]" : "text-gray-400"} />
                    <span className={`text-sm font-medium ${isSelected ? "text-[#2E90FA]" : "text-gray-500"}`}>{metric.title}</span>
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    metric.trendUp ? "bg-[#ECFDF3] text-[#067647]" : "bg-[#FEF3F2] text-[#B42318]"
                  }`}>
                    {metric.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {metric.trend}
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
              </button>
            );
          })}
        </div>

        {/* Row 2: Chart Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1 relative">
            <span className="text-sm font-medium text-gray-500">Metric view ∨</span>
            <div
              onClick={() => setIsMetricDropdownOpen(!isMetricDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-700">
                {activeMetric.title}
              </h2>
              <ChevronDown size={24} className="text-gray-900 group-hover:text-gray-700" />
              <div className={`ml-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                activeMetric.trendUp ? "bg-[#ECFDF3] text-[#067647]" : "bg-[#FEF3F2] text-[#B42318]"
              }`}>
                {activeMetric.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {activeMetric.trend}
              </div>
            </div>

            {/* Metric Dropdown Menu */}
            {isMetricDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsMetricDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full z-40 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  {["Operational", "Demographics"].map((group) => (
                    <div key={group}>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {group}
                      </p>
                      <div className="space-y-1 mb-2 last:mb-0">
                        {analyticsMetrics
                          .filter((m) => m.group === group)
                          .map((metric) => (
                            <button
                              key={metric.id}
                              onClick={() => {
                                setActiveMetric(metric);
                                setIsMetricDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                activeMetric.id === metric.id
                                  ? "bg-[#F9FAFB] text-[#175CD3] font-semibold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {metric.title}
                              {activeMetric.id === metric.id && <CheckCircle2 size={14} className="text-[#175CD3]" />}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Segmented Control */}
            <div className="flex overflow-hidden rounded-lg border border-gray-300 shadow-sm">
              {["12 months", "30 days", "7 days", "24 hours"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`border-r border-gray-300 px-4 py-2 text-sm font-semibold last:border-r-0 transition-colors ${
                    timeFilter === filter
                      ? "bg-gray-50 text-gray-800"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {/* Filters Button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        {/* Row 3: Dynamic Recharts Chart */}
        <div className="h-80 w-full pt-4">
          {renderActiveChart()}
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
