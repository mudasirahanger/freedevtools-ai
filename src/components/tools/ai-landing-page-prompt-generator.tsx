"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AILandingPagePromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "product",
    label: "Product Description",
    placeholder: "e.g. A SaaS tool for AI developers",
    required: true
  },
  {
    id: "audience",
    label: "Target Audience",
    placeholder: "e.g. Indie hackers and startup founders",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Copywriter and Web Designer.\nI need a high-converting landing page for: ${values.product}\nTarget Audience: ${values.audience}\n\nPlease provide:\n1. The hero section copy (Headline, Subheadline, CTA).\n2. 3 Key Value Propositions/Features.\n3. Social Proof/Testimonial section layout.\n4. The HTML/Tailwind code for the structure.`}
    />
  );
}
