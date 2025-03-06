export interface GetUserArgs {
  email: string;
}

export function validateGetUserArgs(args: unknown): args is GetUserArgs {
  const { email } = args as Partial<GetUserArgs>;
  return typeof email === "string" && email.length > 0;
}
