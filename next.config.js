/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.mds.yandex.net", "static.okko.tv"]
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
    localeDetection: false
  }
}

module.exports = nextConfig
