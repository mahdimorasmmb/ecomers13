/** @type {import('next').NextConfig} */
const nextConfig = {
  disableManifest: true,
  cacheBust: true,
  
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },

  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
