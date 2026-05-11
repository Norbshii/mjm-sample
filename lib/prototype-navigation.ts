import {
  BarChartSquare02,
  File05,
  FileSearch03,
  RefreshCw04,
  User01,
} from "@untitledui/icons";

export const sidebarNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChartSquare02 },
  { label: "Open Spreadsheet", href: "/spreadsheet", icon: FileSearch03 },
  { label: "My Entries", href: "/entries", icon: File05 },
  { label: "Pending Sync", href: "/sync", icon: RefreshCw04 },
  { label: "Profile", href: "/profile", icon: User01 },
];

export const bypassScreenLinks = [
  { label: "Screen 01 - Login", href: "/login" },
  { label: "Screen 02 - Dashboard", href: "/dashboard" },
  { label: "Screen 03 - Spreadsheet", href: "/spreadsheet" },
  { label: "Screen 04 - Entries", href: "/entries" },
  { label: "Screen 05 - Pending Sync", href: "/sync" },
  { label: "Screen 06 - Profile", href: "/profile" },
  { label: "Screen 07 - Encoder Login", href: "/login/encoder" },
  { label: "Screen 08 - Admin Login", href: "/login/admin" },
  { label: "Screen 09 - Super Admin Login", href: "/login/super-admin" },
  { label: "Screen 10 - Encoder Dashboard", href: "/dashboard/encoder" },
  { label: "Screen 11 - Admin Dashboard", href: "/dashboard/admin" },
  { label: "Screen 12 - Super Admin Dashboard", href: "/dashboard/super-admin" },
  { label: "Screen 13 - Encoder Loading", href: "/login/encoder?state=loading" },
  { label: "Screen 14 - Encoder Error", href: "/login/encoder?state=error" },
  { label: "Screen 15 - Encoder Success", href: "/login/encoder?state=success" },
  { label: "Screen 16 - Admin Loading", href: "/login/admin?state=loading" },
  { label: "Screen 17 - Admin Error", href: "/login/admin?state=error" },
  { label: "Screen 18 - Super Admin Loading", href: "/login/super-admin?state=loading" },
  { label: "Screen 19 - Super Admin Error", href: "/login/super-admin?state=error" },
];
