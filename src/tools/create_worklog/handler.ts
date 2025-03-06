import { validateArgs, ToolResponse } from "../types.js";
import { validateCreateWorklogArgs, CreateWorklogArgs } from "./types.js";
import JiraClient from "jira-client";
import { convertToADF } from "../../convertToADF.js";

const JIRA_HOST = process.env.JIRA_HOST;

export async function handleCreateWorklog(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<CreateWorklogArgs>(
    args,
    validateCreateWorklogArgs
  );

  const response = await jira.addWorklog(validArgs.issueKey, {
    timeSpentSeconds: validArgs.timeSpentSeconds,
    comment: validArgs.comment ? convertToADF(validArgs.comment) : undefined,
    started: validArgs.started,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Worklog created successfully",
            worklog: {
              id: response.id,
              issueKey: validArgs.issueKey,
              timeSpentSeconds: validArgs.timeSpentSeconds,
              url: `https://${JIRA_HOST}/browse/${validArgs.issueKey}?focusedWorklogId=${response.id}`,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
