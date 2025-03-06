import { handleDeleteIssue } from "./handler.js";
export * from "./types.js";

export const deleteIssue = {
  description: "Delete a Jira issue or subtask",
  inputSchema: {
    type: "object",
    properties: {
      issueKey: {
        type: "string",
        description: "Key of the issue to delete",
      },
    },
    required: ["issueKey"],
  },
  handler: handleDeleteIssue,
};
