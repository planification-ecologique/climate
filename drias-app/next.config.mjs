/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile react-dsfr for proper bundling
  transpilePackages: ["@codegouvfr/react-dsfr"],
  
  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "**.georisques.gouv.fr",
      },
      {
        protocol: "https",
        hostname: "**.brgm.fr",
      },
    ],
  },
};

export default nextConfig;
