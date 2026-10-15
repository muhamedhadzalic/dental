import type { MetadataRoute } from 'next';

// Sales demo – disallow all crawling.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
