import { deleteIssue } from "./delete_issue/index.js";
import { getIssues } from "./get_issue/index.js";
import { updateIssue } from "./update_issue/index.js";
import { listFields } from "./list_fields/index.js";
import { listIssueTypes } from "./list_issue_types/index.js";
import { listLinkTypes } from "./list_link_types/index.js";
import { getUser } from "./get_user/index.js";
import { createIssue } from "./create_issue/index.js";
import { createIssueLink } from "./create_issue_link/index.js";
import { createWorklog } from "./create_worklog/index.js";
import { getComments } from "./get_comments/index.js";
import { ToolDefinitions } from "./types.js";

export const toolDefinitions: ToolDefinitions = {
  delete_issue: deleteIssue,
  get_issues: getIssues,
  update_issue: updateIssue,
  list_fields: listFields,
  list_issue_types: listIssueTypes,
  list_link_types: listLinkTypes,
  get_user: getUser,
  create_issue: createIssue,
  create_issue_link: createIssueLink,
  create_worklog: createWorklog,
  get_comments: getComments,
};
