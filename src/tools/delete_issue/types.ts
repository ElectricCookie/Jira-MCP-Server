export interface DeleteIssueArgs {
  issueKey: string;
}

export function validateDeleteIssueArgs(
  args: unknown
): args is DeleteIssueArgs {
  const { issueKey } = args as Partial<DeleteIssueArgs>;
  return typeof issueKey === "string" && issueKey.length > 0;
}
