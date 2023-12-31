// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@tnd/api', '@tnd/db'],
  experimental: {
    appDir: true,
    serverActions: true,
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  images: {
    domains: [
      'i.scdn.co',
      'pbs.twimg.com',
      'abs.twimg.com',
      'avatars.githubusercontent.com',
      'uploadthing.com',
    ],
  },
}

export default config
