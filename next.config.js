/** @type {import('next').NextConfig} */
const dns = require('dns')

dns.setDefaultResultOrder("ipv4first");
const nextConfig = {
  disableManifest: true,
  cacheBust: true,
  env: {
    NEXTAUTH_SECRET: "mahdimoras",
    API_URL: "http://127.0.0.1:3000",
    DB_URL:
      "mongodb+srv://mahdimoras:zSzXyKpLob8uifNd@cluster0.8r5zn0r.mongodb.net/?retryWrites=true&w=majority",
  },

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
