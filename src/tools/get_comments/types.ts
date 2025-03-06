export interface GetCommentsArgs {
  issueKey: string;
}

export function validateGetCommentsArgs(
  args: unknown
): args is GetCommentsArgs {
  const { issueKey } = args as Partial<GetCommentsArgs>;

  return typeof issueKey === "string" && issueKey.length > 0;
}
