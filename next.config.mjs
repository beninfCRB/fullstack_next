/** @type {import('next').NextConfig} */
const nextConfig = {
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
