/** @type {import('next').NextConfig} */

const securityHeaders = [{ key: "Referrer-Policy", value: "no-referrer" }];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
