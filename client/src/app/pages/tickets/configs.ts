export enum TicketStatus {
  Completed = "completed",
  Incomplete = "incomplete",
}

export const filterOptions = [
  { value: TicketStatus.Completed, label: "Completed" },
  { value: TicketStatus.Incomplete, label: "Incomplete" },
];

export type PushTicketForm = {
  description: string;
};
