import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import DesignBypassMenu from "@/components/DesignBypassMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Census Encoding System",
  description: "Government Census & Data Encoding UI Sandbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
        {process.env.NODE_ENV === "development" ? <DesignBypassMenu /> : null}
      </body>
    </html>
  );
}
