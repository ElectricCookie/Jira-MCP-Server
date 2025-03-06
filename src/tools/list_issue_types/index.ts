import { handleListIssueTypes } from "./handler.js";

export const listIssueTypes = {
  description: "List all available issue types",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
  handler: handleListIssueTypes,
};
