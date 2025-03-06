import { validateArgs, ToolResponse } from "../types.js";
import { validateGetUserArgs, GetUserArgs } from "./types.js";
import JiraClient from "jira-client";

export async function handleGetUser(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<GetUserArgs>(args, validateGetUserArgs);

  const response = await jira.searchUsers({
    query: validArgs.email,
    includeActive: true,
    maxResults: 1,
  });

  if (!response || response.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No user found with email: ${validArgs.email}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            accountId: response[0].accountId,
            displayName: response[0].displayName,
            emailAddress: response[0].emailAddress,
          },
          null,
          2
        ),
      },
    ],
  };
}
