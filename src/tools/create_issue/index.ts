import { handleCreateIssue } from "./handler.js";
export * from "./types.js";

export const createIssue = {
  description: "Create a new Jira issue",
  inputSchema: {
    type: "object",
    properties: {
      projectKey: {
        type: "string",
        description: 'Project key (e.g., "PP")',
      },
      summary: {
        type: "string",
        description: "Issue summary/title",
      },
      issueType: {
        type: "string",
        description: 'Type of issue (e.g., "Task", "Bug", "Story")',
      },
      description: {
        type: "string",
        description: "Detailed description of the issue",
      },
      assignee: {
        type: "string",
        description: "Email of the assignee",
      },
      labels: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Array of labels to apply",
      },
      components: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Array of component names",
      },
      priority: {
        type: "string",
        description: "Issue priority",
      },
    },
    required: ["projectKey", "summary", "issueType"],
  },
  handler: handleCreateIssue,
};
