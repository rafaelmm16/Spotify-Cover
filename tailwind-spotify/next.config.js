/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/spotify-cover',
  assetPrefix: '/spotify-cover',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/seed/**',
      },
    ],
  },
}

module.exports = nextConfig