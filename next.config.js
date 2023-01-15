/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.STRAPI_API_PROTOCOL || "http",
        hostname: process.env.STRAPI_API_HOSTNAME || "127.0.0.1",
        port: process.env.STRAPI_API_PORT || "1337",
        pathname: process.env.STRAPI_API_PATHNAME || "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
