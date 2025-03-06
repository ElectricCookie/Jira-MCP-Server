import { validateArgs, ToolResponse } from "../types.js";
import { validateUpdateIssueArgs, UpdateIssueArgs } from "./types.js";
import JiraClient from "jira-client";
import { convertToADF } from "../../convertToADF.js";

const JIRA_HOST = process.env.JIRA_HOST;

export async function handleUpdateIssue(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<UpdateIssueArgs>(
    args,
    validateUpdateIssueArgs
  );

  const updateFields: any = {};

  if (validArgs.summary) {
    updateFields.summary = validArgs.summary;
  }
  if (validArgs.description) {
    updateFields.description = convertToADF(validArgs.description);
  }
  if (validArgs.assignee) {
    const users = await jira.searchUsers({
      query: validArgs.assignee,
      includeActive: true,
      maxResults: 1,
    });
    if (users && users.length > 0) {
      updateFields.assignee = { accountId: users[0].accountId };
    }
  }
  if (validArgs.status) {
    const transitions = await jira.listTransitions(validArgs.issueKey);
    const transition = transitions.transitions.find(
      (t: any) => t.name.toLowerCase() === validArgs.status?.toLowerCase()
    );
    if (transition) {
      await jira.transitionIssue(validArgs.issueKey, {
        transition: { id: transition.id },
      });
    }
  }
  if (validArgs.priority) {
    updateFields.priority = { name: validArgs.priority };
  }

  if (Object.keys(updateFields).length > 0) {
    await jira.updateIssue(validArgs.issueKey, {
      fields: updateFields,
    });
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Issue updated successfully",
            issue: {
              key: validArgs.issueKey,
              url: `https://${JIRA_HOST}/browse/${validArgs.issueKey}`,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
