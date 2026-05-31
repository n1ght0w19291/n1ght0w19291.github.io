import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /
Disallow: /search
Disallow: /rss.xml
Disallow: /og.png
Disallow: /404

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
