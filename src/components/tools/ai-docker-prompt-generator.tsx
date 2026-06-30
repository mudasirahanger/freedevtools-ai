"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIDockerPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "app",
    label: "Application Description",
    placeholder: "e.g. Node.js Express API",
    required: true
  },
  {
    id: "deps",
    label: "Dependencies (Services)",
    placeholder: "e.g. Redis, Postgres",
    required: false
  }
]}
      generatePrompt={(values) => `Act as an expert DevOps Engineer.\nI need Docker configuration for: ${values.app}\nAdditional Services: ${values.deps || "None"}\n\nPlease provide:\n1. An optimized, multi-stage Dockerfile.\n2. A docker-compose.yml file if there are multiple services.\n3. Instructions on how to build and run the containers.`}
    />
  );
}
