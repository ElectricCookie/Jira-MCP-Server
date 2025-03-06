import { z } from "zod";

export const createCommentSchema = z.object({
  issueKey: z.string(),
  comment: z.string(),
});

export type CreateCommentArgs = z.infer<typeof createCommentSchema>;

export function validateCreateCommentArgs(
  args: unknown
): args is CreateCommentArgs {
  return createCommentSchema.safeParse(args).success;
}
