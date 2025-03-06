import { validateArgs, ToolResponse } from "../types.js";
import { validateCreateCommentArgs, CreateCommentArgs } from "./types.js";
import JiraClient from "jira-client";
import { convertToADF } from "../../convertToADF.js";

export async function handleCreateComment(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<CreateCommentArgs>(
    args,
    validateCreateCommentArgs
  );

  const response = await jira.addCommentAdvanced(validArgs.issueKey, {
    body: convertToADF(validArgs.comment),
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Comment added successfully",
            comment: {
              id: response.id,
              issueKey: validArgs.issueKey,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
