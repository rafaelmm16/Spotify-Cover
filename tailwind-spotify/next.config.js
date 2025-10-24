/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita a exportação estática
  basePath: '/Spotify-Cover', // Define o subdiretório da aplicação
  assetPrefix: '/Spotify-Cover', // Define o prefixo para os assets (CSS, JS, imagens)
  images: {
    unoptimized: true, // Necessário para 'output: export'
  },
}

module.exports = nextConfig