/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      }, 
      {
        protocol: 'https',
        hostname: 'os.alipayobjects.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
