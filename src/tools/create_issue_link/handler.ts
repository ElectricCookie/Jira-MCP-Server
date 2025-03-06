import { validateArgs, ToolResponse } from "../types.js";
import { validateCreateIssueLinkArgs, CreateIssueLinkArgs } from "./types.js";
import JiraClient from "jira-client";

export async function handleCreateIssueLink(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<CreateIssueLinkArgs>(
    args,
    validateCreateIssueLinkArgs
  );

  await jira.issueLink({
    inwardIssue: {
      key: validArgs.inwardIssueKey,
    },
    outwardIssue: {
      key: validArgs.outwardIssueKey,
    },
    type: {
      name: validArgs.linkType,
    },
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Issue link created successfully",
            link: {
              inwardIssue: validArgs.inwardIssueKey,
              outwardIssue: validArgs.outwardIssueKey,
              type: validArgs.linkType,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
