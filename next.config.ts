import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow serving frame images from public/frames
  images: {
    unoptimized: true, // we serve raw JPEGs via canvas ctx, not next/image
  },
  // Transpile three.js packages correctly
  transpilePackages: ['three'],
};

export default nextConfig;
