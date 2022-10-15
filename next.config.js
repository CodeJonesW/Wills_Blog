/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
};

module.exports = nextConfig;
