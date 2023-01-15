/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.STRAPI_API_PROTOCOL,
        hostname: process.env.STRAPI_API_HOSTNAME,
        port: process.env.STRAPI_API_PORT,
        pathname: process.env.STRAPI_API_PATHNAME,
      },
    ],
  },
};

module.exports = nextConfig;
