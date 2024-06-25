/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_PERSONAL_ACCESS_TOKEN:
      process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    CONTENTFUL_SERVICES_ENTRY_ID: process.env.CONTENTFUL_SERVICES_ENTRY_ID,
    CONTENTFUL_HERO_BANNER_ENTRY_ID:
      process.env.CONTENTFUL_HERO_BANNER_ENTRY_ID,
    CONTENTFUL_ABOUT_US_ENTRY_ID: process.env.CONTENTFUL_ABOUT_US_ENTRY_ID,
    CONTENTFUL_PORTFOLIO_ENTRY_ID: process.env.CONTENTFUL_PORTFOLIO_ENTRY_ID,
  },
  images : {
    remotePatterns : [
        {
            protocol: 'https',
            hostname: 'images.ctfassets.net',
        }
    ]
  }
};

export default nextConfig;
