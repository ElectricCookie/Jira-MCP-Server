export interface JiraField {
  id: string;
  name: string;
  required: boolean;
  schema: {
    type: string;
    system?: string;
    custom?: string;
    customId?: number;
  };
}

export interface JiraIssueType {
  id: string;
  name: string;
  fields: Record<string, JiraField>;
}
