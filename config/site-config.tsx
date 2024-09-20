import configData from './site-config.json';

export const siteConfig = {
  ...configData,
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
} as const;

export type SiteConfig = typeof siteConfig;