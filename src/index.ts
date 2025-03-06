#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import JiraClient from "jira-client";
import { toolDefinitions } from "./tools/index.js";

import dotenv from "dotenv";
import path from "path";
const __dirname = import.meta.dirname;

dotenv.config({ path: path.join(__dirname, "..", ".env") });

/**
 * Environment variables required for Jira API authentication:
 * - JIRA_HOST: Jira instance hostname (e.g., paddock.atlassian.net)
 * - JIRA_EMAIL: User's email address for authentication
 * - JIRA_API_TOKEN: API token from https://id.atlassian.com/manage-profile/security/api-tokens
 * - JIRA_PROJECT_KEY: Project key to use for creating issues
 */
const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

if (!JIRA_HOST || !JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
  throw new Error(
    "Missing required environment variables: JIRA_HOST, JIRA_EMAIL, JIRA_API_TOKEN, and JIRA_PROJECT_KEY are required"
  );
}

class JiraServer {
  private readonly server: Server;
  private readonly jira: JiraClient;

  constructor() {
    this.server = new Server(
      {
        name: "jira-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: toolDefinitions,
        },
      }
    );

    // Initialize Jira client
    this.jira = new JiraClient({
      protocol: "https",
      host: JIRA_HOST as string,
      username: JIRA_EMAIL as string,
      password: JIRA_API_TOKEN as string,
      apiVersion: "3",
      strictSSL: true,
    });

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.entries(toolDefinitions).map(([name, def]) => ({
        name,
        description: def.description,
        inputSchema: def.inputSchema,
      })),
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        const tool = toolDefinitions[request.params.name];
        if (!tool || !tool.handler) {
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
        }

        return await tool.handler(request.params.arguments, this.jira);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        return {
          content: [
            { type: "text", text: `Operation failed: ${errorMessage}` },
          ],
          isError: true,
        };
      }
    });
  }

  public async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Jira MCP server running on stdio");
  }
}

const jiraServer = new JiraServer();
jiraServer.run().catch((error: Error) => console.error(error));
