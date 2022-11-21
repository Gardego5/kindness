const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "/components/"),
      "@styles": path.resolve(__dirname, "/styles/"),
      "@lib": path.resolve(__dirname, "/lib/"),
    };

    return config;
  },
};

module.exports = nextConfig;
