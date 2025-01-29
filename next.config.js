/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  output: "standalone",
  images: {
    domains: ['media.licdn.com','res.cloudinary.com'], // Allow LinkedIn images
  },
};

module.exports = nextConfig;