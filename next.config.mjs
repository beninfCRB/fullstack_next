/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactMode: 'concurrent'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.URL_SERVER,
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
