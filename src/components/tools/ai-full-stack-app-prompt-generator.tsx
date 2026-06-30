"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIFullStackAppPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "stack",
    label: "Tech Stack",
    placeholder: "e.g. Next.js, Node.js, PostgreSQL",
    required: true
  },
  {
    id: "features",
    label: "Key Features",
    placeholder: "e.g. User Auth, Dashboard, Stripe Payments",
    isTextarea: true,
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Full-Stack Developer. I need you to scaffold a full-stack application.\n\nTech Stack: ${values.stack}\nKey Features: ${values.features}\n\nPlease provide:\n1. The directory structure.\n2. The setup commands.\n3. The essential boilerplate code for the main components.`}
    />
  );
}
