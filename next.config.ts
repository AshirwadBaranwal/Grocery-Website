import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**', // Allows all domains
      },
    ],
  },
};

export default nextConfig;
