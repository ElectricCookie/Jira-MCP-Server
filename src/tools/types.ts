import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import JiraClient from "jira-client";

export interface ToolDefinition {
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
  handler: (args: unknown, jira: JiraClient) => Promise<ToolResponse>;
}

export type ToolDefinitions = Record<string, ToolDefinition>;

export function validateArgs<T>(
  args: unknown,
  validator: (args: unknown) => args is T
): T {
  if (typeof args !== "object" || args === null) {
    throw new McpError(ErrorCode.InvalidParams, "Arguments must be an object");
  }

  if (!validator(args)) {
    throw new McpError(ErrorCode.InvalidParams, "Invalid arguments");
  }

  return args;
}

export type ToolResponse = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};
