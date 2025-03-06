export interface CreateIssueArgs {
  projectKey: string;
  summary: string;
  issueType: string;
  description?: string;
  assignee?: string;
  labels?: string[];
  components?: string[];
  priority?: string;
  parent?: string;
}

export function validateCreateIssueArgs(
  args: unknown
): args is CreateIssueArgs {
  const { projectKey, summary, issueType } = args as Partial<CreateIssueArgs>;

  return (
    typeof projectKey === "string" &&
    projectKey.length > 0 &&
    typeof summary === "string" &&
    summary.length > 0 &&
    typeof issueType === "string" &&
    issueType.length > 0
  );
}
