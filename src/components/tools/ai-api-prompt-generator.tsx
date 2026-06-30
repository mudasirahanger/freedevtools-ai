"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIAPIPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "resource",
    label: "Main Resource",
    placeholder: "e.g. Users, Orders, Products",
    required: true
  },
  {
    id: "type",
    label: "API Type",
    placeholder: "e.g. REST or GraphQL",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Backend Engineer.\nI need to design a ${values.type} API for the following resource: ${values.resource}.\n\nPlease provide:\n1. The endpoint URLs and HTTP methods (for REST) or Queries/Mutations (for GraphQL).\n2. The request and response JSON payloads.\n3. Best practices for securing these endpoints.`}
    />
  );
}
