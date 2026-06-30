"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AISEOPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "topic",
    label: "Article Topic",
    placeholder: "e.g. Best practices for React Performance",
    required: true
  },
  {
    id: "keywords",
    label: "Target Keywords",
    placeholder: "e.g. react performance, usememo, lazy loading",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert SEO Specialist and Content Strategist.\nTopic: ${values.topic}\nTarget Keywords: ${values.keywords}\n\nPlease provide:\n1. An optimized Title Tag and Meta Description.\n2. An H1, H2, H3 outline for the article.\n3. Suggestions for internal and external linking.\n4. FAQ schema suggestions.`}
    />
  );
}
