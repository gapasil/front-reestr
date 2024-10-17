/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'avatars.mds.yandex.net',
      'steamuserimages-a.akamaihd.net',
      'localhost',
    ],
  },
};

export default nextConfig;
