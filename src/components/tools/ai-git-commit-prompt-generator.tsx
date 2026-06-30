"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIGitCommitPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "changes",
    label: "What changed?",
    placeholder: "e.g. Added login route, fixed navbar overflow",
    isTextarea: true,
    required: true
  },
  {
    id: "type",
    label: "Commit Type",
    placeholder: "e.g. feat, fix, chore, docs",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Software Engineer following the Conventional Commits specification.\nType of change: ${values.type}\nChanges made:\n${values.changes}\n\nPlease provide:\n1. A concise, imperative commit message subject line.\n2. A detailed commit message body explaining the WHAT and WHY.\n3. Any footer for breaking changes or issue references.`}
    />
  );
}
