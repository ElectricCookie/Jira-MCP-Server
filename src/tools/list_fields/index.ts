import { handleListFields } from "./handler.js";

export const listFields = {
  description: "List all available Jira fields",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
  handler: handleListFields,
};
