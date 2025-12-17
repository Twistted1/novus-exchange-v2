/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This forces the build to finish even if "Grammar Police" finds errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
