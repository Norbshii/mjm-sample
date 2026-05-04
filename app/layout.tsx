import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import DesignBypassMenu from "@/components/DesignBypassMenu";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
        <DesignBypassMenu />
      </body>
    </html>
  );
}
