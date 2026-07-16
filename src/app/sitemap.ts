import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { developerTools } from '@/data/tools';
import { aiPromptGenerators } from '@/data/ai-prompts';
import { seoTools } from '@/data/seo-tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/tools', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/ai-prompt-generators', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/seo-tools', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
  ].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency as "daily" | "weekly" | "monthly" | "yearly",
    priority: route.priority,
  }));

  const devToolRoutes = developerTools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const aiPromptRoutes = aiPromptGenerators.map((tool) => ({
    url: `${SITE_URL}/ai-prompt-generators/${tool.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const seoToolRoutes = seoTools.map((tool) => ({
    url: `${SITE_URL}/seo-tools/${tool.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...devToolRoutes, ...aiPromptRoutes, ...seoToolRoutes];
}
