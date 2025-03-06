import { handleGetUser } from "./handler.js";
export * from "./types.js";

export const getUser = {
  description: "Get a user's account ID by email address",
  inputSchema: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "User's email address",
      },
    },
    required: ["email"],
  },
  handler: handleGetUser,
};
