import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Enable the analyzer via an environment variable
const isAnalyzerEnabled = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withBundleAnalyzer({
  enabled: isAnalyzerEnabled,
})(nextConfig);
