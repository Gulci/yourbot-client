module.exports = {
  env: {
    YOURBOT_API_KEY: process.env.YOURBOT_API_KEY,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/auth/signin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/auth/signout',
        destination: '/',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
