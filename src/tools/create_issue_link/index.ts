import { handleCreateIssueLink } from "./handler.js";
export * from "./types.js";

export const createIssueLink = {
  description: "Create a link between two issues",
  inputSchema: {
    type: "object",
    properties: {
      inwardIssueKey: {
        type: "string",
        description: "Key of the inward issue (e.g., blocked issue)",
      },
      outwardIssueKey: {
        type: "string",
        description: "Key of the outward issue (e.g., blocking issue)",
      },
      linkType: {
        type: "string",
        description: "Type of link (e.g., 'blocks')",
      },
    },
    required: ["inwardIssueKey", "outwardIssueKey", "linkType"],
  },
  handler: handleCreateIssueLink,
};
