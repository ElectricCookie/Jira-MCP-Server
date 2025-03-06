export interface CreateWorklogArgs {
  issueKey: string;
  timeSpentSeconds: number;
  comment?: string;
  started?: string;
}

export function validateCreateWorklogArgs(
  args: unknown
): args is CreateWorklogArgs {
  const { issueKey, timeSpentSeconds } = args as Partial<CreateWorklogArgs>;

  return (
    typeof issueKey === "string" &&
    issueKey.length > 0 &&
    typeof timeSpentSeconds === "number" &&
    timeSpentSeconds > 0
  );
}
