import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // This allows the build to continue even with TypeScript errors
  },
};

export default nextConfig;
