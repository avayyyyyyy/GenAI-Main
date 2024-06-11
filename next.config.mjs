/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "replicate.delivery",
        protocol: "https",
      },
      {
        hostname: "storage.googleapis.com",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
