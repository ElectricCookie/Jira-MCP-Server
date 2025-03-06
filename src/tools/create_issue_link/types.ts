export interface CreateIssueLinkArgs {
  inwardIssueKey: string;
  outwardIssueKey: string;
  linkType: string;
}

export function validateCreateIssueLinkArgs(
  args: unknown
): args is CreateIssueLinkArgs {
  const { inwardIssueKey, outwardIssueKey, linkType } =
    args as Partial<CreateIssueLinkArgs>;
  return (
    typeof inwardIssueKey === "string" &&
    inwardIssueKey.length > 0 &&
    typeof outwardIssueKey === "string" &&
    outwardIssueKey.length > 0 &&
    typeof linkType === "string" &&
    linkType.length > 0
  );
}
