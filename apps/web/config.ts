export const CALLS_CONFIG = {
    APP_ID: process.env.NEXT_PUBLIC_CLOUDFLARE_APP_ID!,
    APP_TOKEN: process.env.NEXT_PUBLIC_CLOUDFLARE_APP_TOKEN!,
    API_BASE: `https://rtc.live.cloudflare.com/v1/apps/${process.env.NEXT_PUBLIC_CLOUDFLARE_APP_ID}`,
  }