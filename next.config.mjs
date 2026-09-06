/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'radio.amarmash.com' },
    { protocol: 'https', hostname: '**.ytimg.com' }
  ] },
  async headers() { return [{ source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }, { key: 'Content-Type', value: 'application/javascript; charset=utf-8' }] }, { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] }] }
}
export default nextConfig
