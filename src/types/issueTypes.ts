/**
 * Arguments for creating a new Jira issue or subtask
 * @property projectKey - Key of the project to create the issue in
 * @property summary - Issue title/summary
 * @property issueType - Type of issue (e.g., "Task", "Story", "Subtask")
 * @property description - Optional detailed description
 * @property assignee - Optional email of user to assign
 * @property labels - Optional array of labels to apply
 * @property components - Optional array of component names
 * @property priority - Optional priority level
 * @property parent - Optional parent issue key (required for subtasks)
 */
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

export interface GetIssuesArgs {
  projectKey: string;
  jql?: string;
}

export interface UpdateIssueArgs {
  issueKey: string;
  summary?: string;
  description?: string;
  assignee?: string;
  status?: string;
  priority?: string;
}

export interface CreateIssueLinkArgs {
  inwardIssueKey: string;
  outwardIssueKey: string;
  linkType: string;
}

/**
 * Represents a Jira issue type with its properties
 * @property id - Unique identifier for the issue type
 * @property name - Display name of the issue type
 * @property description - Optional description of when to use this type
 * @property subtask - Whether this is a subtask type
 */
export interface IssueType {
  id: string;
  name: string;
  description?: string;
  subtask: boolean;
}
