/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'lucide-react',
    'canvas-confetti',
    'qrcode',
    'jspdf',
    'html2canvas',
    'papaparse'
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas-confetti', 'html2canvas', 'jspdf', 'qrcode'];
    }
    return config;
  },
};

module.exports = nextConfig;
