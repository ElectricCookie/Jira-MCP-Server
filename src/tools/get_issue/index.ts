import { handleGetIssues } from "./handler.js";
export * from "./types.js";

export const getIssues = {
  description: "Get all issues and subtasks for a project",
  inputSchema: {
    type: "object",
    properties: {
      projectKey: {
        type: "string",
        description: 'Project key (e.g., "PP")',
      },
      jql: {
        type: "string",
        description: "Optional JQL to filter issues",
      },
    },
    required: ["projectKey"],
  },
  handler: handleGetIssues,
};
