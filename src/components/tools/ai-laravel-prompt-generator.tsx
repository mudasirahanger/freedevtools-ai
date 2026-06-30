"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AILaravelPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "feature",
    label: "Laravel Feature",
    placeholder: "e.g. User Authentication API",
    required: true
  },
  {
    id: "models",
    label: "Related Models",
    placeholder: "e.g. User, Role, Permission",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Laravel Developer.\nI need to implement: ${values.feature}\nModels involved: ${values.models}\n\nPlease provide:\n1. The Artisan commands to generate necessary files (Models, Migrations, Controllers).\n2. The Migration schema definitions.\n3. The Controller logic and routing.\n4. Follow Laravel best practices and conventions.`}
    />
  );
}
