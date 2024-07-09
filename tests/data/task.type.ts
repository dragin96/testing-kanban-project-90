export type ListAssignee = "michael@example.com" | "sarah@example.com" |  "peter@outlook.com" | "alice@hotmail.com";
export type ListStatus = 'Published' | 'To Publish' | 'To Be Fixed' | 'To Review' | 'Draft';
export type ListLabels = 'critical' | 'task' | 'enhancement' | 'feature' | 'bug';
export interface Task {
    title: string
    content: string
    assignee: ListAssignee
    status: ListStatus
    label: ListLabels[]
}
