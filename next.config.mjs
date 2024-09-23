/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/auth',
            permanent: true,
          },
        ];
    },
    output: 'standalone',
};

export default nextConfig;
