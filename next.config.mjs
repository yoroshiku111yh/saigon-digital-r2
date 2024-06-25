/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        CONTENTFUL_SPACE_ID : process.env.CONTENTFUL_SPACE_ID,
        CONTENTFUL_PERSONAL_ACCESS_TOKEN : process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
        CONTENTFUL_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        CONTENTFUL_SERVICES_ENTRY_ID: process.env.CONTENTFUL_SERVICES_ENTRY_ID
    }
};

export default nextConfig;
