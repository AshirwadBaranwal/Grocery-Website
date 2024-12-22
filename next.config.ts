import type { NextConfig } from "next";

const nextConfig = {

  // env: {
  //   KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
  //   KINDE_POST_LOGOUT_REDIRECT_URL:
  //     process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
  //   KINDE_POST_LOGIN_REDIRECT_URL:
  //     process.env.KINDE_POST_LOGIN_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`
  // },
  images: {
    remotePatterns: [
      {
        hostname: '**', // Allows all domains
      },
    ],
  },
};

export default nextConfig;
