const path = require("path");

const nextConfig = {
  swcMinify: true,
  webpack: function (config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "/components/"),
      "@context": path.resolve(__dirname, "/context/"),
      "@styles": path.resolve(__dirname, "/styles/"),
      "@lib": path.resolve(__dirname, "/lib/"),
      "@model": path.resolve(__dirname, "/model/"),
      "@view": path.resolve(__dirname, "/view/"),
      "@hook": path.resolve(__dirname, "/hook/"),
      "@slice": path.resolve(__dirname, "/slice/"),
      "@types": path.resolve(__dirname, "/types/"),
    };

    return config;
  },
};

module.exports = nextConfig;
