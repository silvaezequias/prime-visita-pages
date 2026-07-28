import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /checkout é um simulador (depende de ?plan=&billing=, sem conteúdo
      // próprio pra indexar) e /docs ainda é um placeholder "em breve".
      disallow: ['/checkout', '/docs'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
