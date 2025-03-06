import { validateArgs, ToolResponse } from "../types.js";
import { validateCreateIssueArgs, CreateIssueArgs } from "./types.js";
import JiraClient from "jira-client";
import { convertToADF } from "../../convertToADF.js";

const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_HOST = process.env.JIRA_HOST;

export async function handleCreateIssue(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<CreateIssueArgs>(
    args,
    validateCreateIssueArgs
  );

  const projectKey = validArgs.projectKey || JIRA_PROJECT_KEY;
  const assignee = validArgs.assignee || JIRA_EMAIL;

  const response = await jira.addNewIssue({
    fields: {
      project: { key: projectKey },
      summary: validArgs.summary,
      issuetype: { name: validArgs.issueType },
      description: validArgs.description
        ? convertToADF(validArgs.description)
        : undefined,
      assignee: { accountId: assignee },
      labels: validArgs.labels,
      components: validArgs.components?.map((name) => ({ name })),
      priority: validArgs.priority ? { name: validArgs.priority } : undefined,
      parent: validArgs.parent ? { key: validArgs.parent } : undefined,
    },
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            message: "Issue created successfully",
            issue: {
              id: response.id,
              key: response.key,
              url: `https://${JIRA_HOST}/browse/${response.key}`,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
