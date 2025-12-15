import createNextIntlPlugin from 'next-intl/plugin';

// --- A MEGOLDÁS ITT VAN ---
// Megmondjuk neki konkrétan, hogy a gyökérben lévő './i18n.ts' fájlt használja!
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);