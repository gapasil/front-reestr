/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'avatars.mds.yandex.net',
      'steamuserimages-a.akamaihd.net',
      'localhost',
      'reestr-rusofobov.ru',
      'lh6.googleusercontent.com',
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/routesRobot/sitemap',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/routesRobot/sitemap', // Указываем путь, для которого мы добавляем заголовки
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; script-src 'self' 'blob:'", // Ваши заголовки CSP
          },
        ],
      },
    ];
  },
};

export default nextConfig;
