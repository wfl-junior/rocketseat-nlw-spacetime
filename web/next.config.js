/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "192.168.1.32"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
