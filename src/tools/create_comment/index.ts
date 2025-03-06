import { handleCreateComment } from "./handler.js";
export * from "./types.js";

export const createComment = {
  description: "Create a comment on a Jira issue",
  inputSchema: {
    type: "object",
    properties: {
      issueKey: {
        type: "string",
        description: "Key of the issue to comment on",
      },
      comment: {
        type: "string",
        description: "Comment text to add to the issue",
      },
    },
    required: ["issueKey", "comment"],
  },
  handler: handleCreateComment,
};
