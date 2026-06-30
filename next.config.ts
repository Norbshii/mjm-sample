import type { NextConfig } from "next";

// cspell:ignore untitledui turbopack
const nextConfig: NextConfig = {
  experimental: {
    // lucide-react is already optimized by default in Next.js 16.
    optimizePackageImports: ["@untitledui/icons"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
