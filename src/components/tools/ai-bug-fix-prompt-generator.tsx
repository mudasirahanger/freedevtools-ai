"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIBugFixPromptGenerator() {
  const fields = [
    { id: "language", label: "Programming Language / Tech Stack", placeholder: "e.g. React, Node.js, Python", required: true },
    { id: "error", label: "Error Message or Log", placeholder: "Paste the exact error message or stack trace", isTextarea: true, required: true },
    { id: "code", label: "Relevant Code Snippet", placeholder: "Paste the code where the error occurs", isTextarea: true },
    { id: "context", label: "What did you try already?", placeholder: "e.g. I tried restarting the server and clearing cache.", isTextarea: true }
  ];

  const generatePrompt = (values: Record<string, string>) => {
    return `Act as an expert software debugger specializing in ${values.language}.
I am encountering the following error:

--- ERROR ---
${values.error}
-------------

${values.code ? `\n--- RELEVANT CODE ---\n${values.code}\n-------------\n` : ""}
${values.context ? `\nContext / What I've tried:\n${values.context}\n` : ""}

Please help me fix this issue by providing:
1. The root cause of the error.
2. The corrected code snippet.
3. A brief explanation of why this fix works.`;
  };

  return <GenericAIPrompt fields={fields} generatePrompt={generatePrompt} />;
}
