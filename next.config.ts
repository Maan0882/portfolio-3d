import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static HTML export with next/image (or standard image checks)
  },
};

export default nextConfig;
