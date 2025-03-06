import { validateArgs, ToolResponse } from "../types.js";
import { validateDeleteIssueArgs, DeleteIssueArgs } from "./types.js";
import JiraClient from "jira-client";

export async function handleDeleteIssue(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<DeleteIssueArgs>(
    args,
    validateDeleteIssueArgs
  );

  await jira.deleteIssue(validArgs.issueKey);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Issue deleted successfully",
            issueKey: validArgs.issueKey,
          },
          null,
          2
        ),
      },
    ],
  };
}
