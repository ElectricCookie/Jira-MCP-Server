import { validateArgs, ToolResponse } from "../types.js";
import { validateGetIssuesArgs, GetIssuesArgs } from "./types.js";
import JiraClient from "jira-client";

export async function handleGetIssues(
  args: unknown,
  jira: JiraClient
): Promise<ToolResponse> {
  const validArgs = validateArgs<GetIssuesArgs>(args, validateGetIssuesArgs);

  const jql = validArgs.jql
    ? `project = ${validArgs.projectKey} AND ${validArgs.jql}`
    : `project = ${validArgs.projectKey}`;

  const response = await jira.searchJira(jql, {
    maxResults: 100,
    fields: [
      "summary",
      "description",
      "status",
      "priority",
      "assignee",
      "issuetype",
      "parent",
      "subtasks",
      "created",
      "updated",
      "timeoriginalestimate",
      "timeestimate",
      "timespent",
      "labels",
      "components",
      "creator",
      "reporter",
    ],
  });

  const issues = response.issues.map(reduceIssueFields);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(issues),
      },
    ],
  };
}

function reduceIssueFields(issue: JiraClient.IssueObject): Record<string, any> {
  return {
    key: issue.key,
    summary: issue.fields.summary,
    description: issue.fields.description,
    status: issue.fields.status.name,
    priority: issue.fields.priority.name,
    assignee: issue.fields.assignee?.displayName,
    issuetype: issue.fields.issuetype.name,
    parent: issue.fields.parent?.key,
    subtasks: issue.fields.subtasks?.map((subtask: any) =>
      reduceIssueFields(subtask)
    ),
    created: issue.fields.created,
    updated: issue.fields.updated,
    timeTracking: {
      originalEstimateSeconds: issue.fields.timeoriginalestimate,
      remainingEstimateSeconds: issue.fields.timeestimate,
      timeSpentSeconds: issue.fields.timespent,
    },
    labels: issue.fields.labels || [],
    components: issue.fields.components?.map((comp: any) => comp.name) || [],
    creator: issue.fields.creator?.displayName,
    reporter: issue.fields.reporter?.displayName,
  };
}
