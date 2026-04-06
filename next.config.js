/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle SQLite DB + migrations with serverless output (Vercel) so Prisma can open the file at runtime.
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    outputFileTracingIncludes: {
      "/*": ["./prisma/**/*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.ajio.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

module.exports = nextConfig;
