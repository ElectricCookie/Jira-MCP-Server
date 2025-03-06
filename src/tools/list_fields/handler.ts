import { ToolResponse } from "../types.js";
import JiraClient from "jira-client";

export async function handleListFields(
  _args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const response = await jira.listFields();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(response, null, 2),
      },
    ],
  };
}
