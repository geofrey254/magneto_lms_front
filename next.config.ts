import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "i.ibb.co",
      "images.unsplash.com",
      "images.pexels.com",
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
