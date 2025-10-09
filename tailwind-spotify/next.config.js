/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Spotify-Cover',
  assetPrefix: '/Spotify-Cover',
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
