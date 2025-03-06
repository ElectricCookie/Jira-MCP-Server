import { ToolResponse } from "../types.js";
import JiraClient from "jira-client";
import { IssueType } from "../../types/index.js";

export async function handleListIssueTypes(
  _args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const response = await jira.listIssueTypes();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          response.map((type: IssueType) => ({
            id: type.id,
            name: type.name,
            description: type.description,
            subtask: type.subtask,
          })),
          null,
          2
        ),
      },
    ],
  };
}
