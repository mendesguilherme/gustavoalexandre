/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp'], // Ativa o suporte e otimização para .webp
    domains: [],             // Você pode manter vazio; usamos remotePatterns abaixo
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supa.nexii.com.br',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
