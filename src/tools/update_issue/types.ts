export interface UpdateIssueArgs {
  issueKey: string;
  summary?: string;
  description?: string;
  assignee?: string;
  status?: string;
  priority?: string;
}

export function validateUpdateIssueArgs(
  args: unknown
): args is UpdateIssueArgs {
  const { issueKey } = args as Partial<UpdateIssueArgs>;
  return typeof issueKey === "string" && issueKey.length > 0;
}
