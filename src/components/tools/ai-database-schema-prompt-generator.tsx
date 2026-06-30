"use client";

import GenericAIPrompt from "./generic-ai-prompt";

export default function AIDatabaseSchemaPromptGenerator() {
  return (
    <GenericAIPrompt 
      fields={[
  {
    id: "entities",
    label: "Entities",
    placeholder: "e.g. Users, Posts, Comments",
    required: true
  },
  {
    id: "dbType",
    label: "Database Type",
    placeholder: "e.g. PostgreSQL, MongoDB",
    required: true
  }
]}
      generatePrompt={(values) => `Act as an expert Database Administrator.\nI need a database schema for a ${values.dbType} database containing the following entities: ${values.entities}.\n\nPlease provide:\n1. The table/collection definitions and relationships.\n2. The SQL CREATE TABLE statements (or Mongoose schemas for MongoDB).\n3. Recommended indexes for performance.`}
    />
  );
}
