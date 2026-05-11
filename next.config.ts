import type { NextConfig } from "next";

// cspell:ignore untitledui turbopack
const nextConfig: NextConfig = {
  experimental: {
    // lucide-react is already optimized by default in Next.js 16.
    optimizePackageImports: ["@untitledui/icons"],
    // Persist Turbopack artifacts to speed up repeated builds.
    turbopackFileSystemCacheForBuild: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
