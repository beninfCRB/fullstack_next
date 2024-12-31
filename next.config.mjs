/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
