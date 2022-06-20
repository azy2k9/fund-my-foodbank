/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {

    config.module.rules.push({
      test: /\.html$/, loader: 'html-loader'
    });

    // Important: return the modified config
    return config;
  }
};

module.exports = nextConfig;
