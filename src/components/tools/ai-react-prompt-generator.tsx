"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIReactPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "component",
    label: "Component Name",
    placeholder: "e.g. DataTable, UserProfile",
    required: true
  },
  {
    id: "reqs",
    label: "Requirements / State",
    placeholder: "e.g. Needs pagination and sorting",
    isTextarea: true,
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert React Developer.\nI need a functional React component named: ${values.component}\nRequirements: ${values.reqs}\n\nPlease provide:\n1. The TypeScript component code using hooks.\n2. Clean and maintainable state management.\n3. Styling approach using Tailwind CSS (if applicable).`}
    />
  );
}
