"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIUnitTestPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "framework",
    label: "Testing Framework",
    placeholder: "e.g. Jest, PyTest",
    required: true
  },
  {
    id: "code",
    label: "Code to Test",
    placeholder: "Paste the function or component here",
    isTextarea: true,
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert QA Engineer.\nI need unit tests using ${values.framework} for the following code:\n\n\`\`\`\n${values.code}\n\`\`\`\n\nPlease provide:\n1. Tests for the happy path.\n2. Tests for edge cases and errors.\n3. Any necessary mocks or setup code.`}
    />
  );
}
