import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { developerTools } from '@/data/tools';
import { aiPromptGenerators } from '@/data/ai-prompts';
import { seoTools } from '@/data/seo-tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/tools',
    '/ai-prompt-generators',
    '/seo-tools',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const devToolRoutes = developerTools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const aiPromptRoutes = aiPromptGenerators.map((tool) => ({
    url: `${SITE_URL}/ai-prompt-generators/${tool.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const seoToolRoutes = seoTools.map((tool) => ({
    url: `${SITE_URL}/seo-tools/${tool.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...devToolRoutes, ...aiPromptRoutes, ...seoToolRoutes];
}
