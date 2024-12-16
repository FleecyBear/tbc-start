/** @type {import('next').NextConfig} */
const nextConfig = {
   
    basePath: '',
    reactStrictMode: true,
    images: {
      domains: ['dummyjson.com', 'www.urbanaccentscanada.com', 'cdn.fairdealfurniture.co.ke', 'www.alankaram.in'], 
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