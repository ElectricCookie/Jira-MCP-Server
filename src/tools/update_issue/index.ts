import { handleUpdateIssue } from "./handler.js";
export * from "./types.js";

export const updateIssue = {
  description: "Update an existing Jira issue",
  inputSchema: {
    type: "object",
    properties: {
      issueKey: {
        type: "string",
        description: "Key of the issue to update",
      },
      summary: {
        type: "string",
        description: "New summary/title",
      },
      description: {
        type: "string",
        description: "New description",
      },
      assignee: {
        type: "string",
        description: "Email of new assignee",
      },
      status: {
        type: "string",
        description: "New status",
      },
      priority: {
        type: "string",
        description: "New priority",
      },
    },
    required: ["issueKey"],
  },
  handler: handleUpdateIssue,
};
