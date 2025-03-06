import { validateArgs, ToolResponse } from "../types.js";
import { validateGetCommentsArgs, GetCommentsArgs } from "./types.js";
import JiraClient from "jira-client";

const JIRA_HOST = process.env.JIRA_HOST;

interface JiraComment {
  id: string;
  author: {
    displayName: string;
  };
  created: string;
  updated: string;
  body: string;
}

export async function handleGetComments(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<GetCommentsArgs>(
    args,
    validateGetCommentsArgs
  );

  const response = await jira.getComments(validArgs.issueKey);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Comments retrieved successfully",
            issue: {
              key: validArgs.issueKey,
              url: `https://${JIRA_HOST}/browse/${validArgs.issueKey}`,
            },
            comments: response.comments.map((comment: JiraComment) => ({
              id: comment.id,
              author: comment.author.displayName,
              created: comment.created,
              updated: comment.updated,
              body: comment.body,
            })),
            total: response.total,
          },
          null,
          2
        ),
      },
    ],
  };
}
