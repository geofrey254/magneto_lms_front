// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost", // Keep existing domains
      "i.ibb.co",
      "images.unsplash.com",
      "images.pexels.com",
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
      process.env.NEXT_PUBLIC_DJANGO_HOSTNAME || "localhost:8000", // Add Django media host
    ],
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.NEXT_PUBLIC_AUTH}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
