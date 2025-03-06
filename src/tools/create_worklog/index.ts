import { ToolDefinition } from "../types.js";
import { handleCreateWorklog } from "./handler.js";
import { CreateWorklogArgs } from "./types.js";

export const createWorklog: ToolDefinition = {
  description: "Create a worklog entry for a Jira issue",
  inputSchema: {
    type: "object",
    required: ["issueKey", "timeSpentSeconds"],
    properties: {
      issueKey: {
        type: "string",
        description: "Key of the issue to add worklog to",
      },
      timeSpentSeconds: {
        type: "number",
        description: "Time spent in seconds",
      },
      comment: {
        type: "string",
        description: "Optional comment for the worklog",
      },
      started: {
        type: "string",
        description: "Optional start time in ISO format",
      },
    },
  },
  handler: handleCreateWorklog,
};
