/** @type {import('next').NextConfig} */
const nextConfig = {
   
    distDir: './build', 
    basePath: '',
    reactStrictMode: true,
    images: {
      domains: ['dummyjson.com'], 
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
      ];
    },
  }
   
  export default nextConfig;