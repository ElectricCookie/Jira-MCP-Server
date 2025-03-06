import { ToolDefinition } from "../types.js";
import { handleGetComments } from "./handler.js";
import { GetCommentsArgs } from "./types.js";

export const getComments: ToolDefinition = {
  description: "Get all comments for a Jira issue",
  inputSchema: {
    type: "object",
    required: ["issueKey"],
    properties: {
      issueKey: {
        type: "string",
        description: "Key of the issue to get comments from",
      },
    },
  },
  handler: handleGetComments,
};
