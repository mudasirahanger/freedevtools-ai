"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIUIUXPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "component",
    label: "Component / Page",
    placeholder: "e.g. E-commerce Product Page",
    required: true
  },
  {
    id: "vibe",
    label: "Design Vibe / Style",
    placeholder: "e.g. Minimalist, Dark Mode, Playful",
    required: false
  }
]}
      generatePrompt={(values) => `Act as an expert UI/UX Designer and Frontend Developer.\nI need a design and code for: ${values.component}\nStyle/Vibe: ${values.vibe || "Modern and clean"}\n\nPlease provide:\n1. A description of the layout and UX flow.\n2. The component code (using Tailwind CSS if applicable).\n3. Any necessary accessibility (a11y) considerations.`}
    />
  );
}
