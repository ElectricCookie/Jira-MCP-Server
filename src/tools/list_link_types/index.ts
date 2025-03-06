import { handleListLinkTypes } from "./handler.js";

export const listLinkTypes = {
  description: "List all available issue link types",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
  handler: handleListLinkTypes,
};
