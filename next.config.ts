import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 60 * 60, // 1h
    },
  },
};

export default nextConfig;
