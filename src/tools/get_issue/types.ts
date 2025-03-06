export interface GetIssuesArgs {
  projectKey: string;
  jql?: string;
}

export function validateGetIssuesArgs(args: unknown): args is GetIssuesArgs {
  const { projectKey } = args as Partial<GetIssuesArgs>;
  return typeof projectKey === "string" && projectKey.length > 0;
}
