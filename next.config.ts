import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static (prerendered); these runtime features aren't needed and add client work on phones.
  cacheComponents: false,
  partialPrefetching: false,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
