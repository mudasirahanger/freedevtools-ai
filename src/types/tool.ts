export interface ToolMetadata {
  title: string;
  slug: string;
  category: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  inputFields?: unknown[]; // Keep flexible for generators
  examples?: unknown[];
  faqs?: { question: string; answer: string }[];
  relatedTools?: string[];
  schemaData?: unknown;
}
