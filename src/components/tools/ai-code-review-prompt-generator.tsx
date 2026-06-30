"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AICodeReviewPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "language",
    label: "Language / Framework",
    placeholder: "e.g. React, Python",
    required: true
  },
  {
    id: "code",
    label: "Code to Review",
    placeholder: "Paste the code snippet here",
    isTextarea: true,
    required: true
  }
]}
      generatePrompt={(values) => `Act as a Senior Staff Software Engineer performing a rigorous code review.\nLanguage/Framework: ${values.language}\n\nCode to review:\n\`\`\`\n${values.code}\n\`\`\`\n\nPlease review for:\n1. Security vulnerabilities.\n2. Performance bottlenecks.\n3. Clean code and maintainability.\n4. Provide the refactored, improved version of the code.`}
    />
  );
}
