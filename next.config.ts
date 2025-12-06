import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Enable the bundle analyzer via environment variable
const isAnalyzerEnabled = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  // Remote images configuration for Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Webpack customizations
  webpack(config) {
    // SVGR loader for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }
};

// Wrap with bundle analyzer if enabled
export default withBundleAnalyzer({
  enabled: isAnalyzerEnabled,
})(nextConfig);
