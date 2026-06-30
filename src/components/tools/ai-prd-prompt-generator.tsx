"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIPRDPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "feature",
    label: "Feature / Product",
    placeholder: "e.g. User Authentication System",
    required: true
  },
  {
    id: "goals",
    label: "Business Goals",
    placeholder: "e.g. Reduce friction, increase signups",
    isTextarea: true,
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Product Manager.\nI need a Product Requirements Document (PRD) for: ${values.feature}\nBusiness Goals: ${values.goals}\n\nPlease provide:\n1. Overview and Problem Statement.\n2. User Stories and Acceptance Criteria.\n3. Out of Scope items.\n4. Technical dependencies or considerations.`}
    />
  );
}
