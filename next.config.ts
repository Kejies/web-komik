/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k7rzspb5flu6zayatfe4mh.my",
      },
      {
        protocol: "https",
        hostname: "komikindo2.com",
      },
    ],
  },
};

module.exports = nextConfig;
