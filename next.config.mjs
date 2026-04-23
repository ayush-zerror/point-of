/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.wearepointof.com" },
      { protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "www.behance.net" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
