import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Subsistant',
  assetPrefix: '/Subsistant',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
