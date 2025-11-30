import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "build",
  images: {
    domains: ["cdn.mybrainboostapp.com", "cdn-staging.mybrainboostapp.com"],
  }
};

export default nextConfig;
