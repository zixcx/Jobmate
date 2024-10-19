/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "img1.kakaocdn.net",
            },
            {
                protocol: "https",
                hostname: "img1.kakaocdn.net",
            },
            {
                protocol: "https",
                hostname: "ssl.pstatic.net",
            },
        ],
    },
};

export default nextConfig;
