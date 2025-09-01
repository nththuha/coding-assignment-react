import { Ticket } from "@acme/shared-models";
import { request } from "../api";

export async function getTickets() {
  return await request<Ticket[]>("GET", "/tickets");
}

export async function getTicketById(id: number) {
  return await request<Ticket>("GET", `/tickets/${id}`);
}

export async function createTicket(description: string) {
  return await request<Ticket>("POST", "/tickets", { description });
}

export async function assignUserToTicket(ticketId: number, userId: number) {
  await request<Ticket>("PUT", `/tickets/${ticketId}/assign/${userId}`);
}

export async function unassignUserFromTicket(ticketId: number) {
  await request<Ticket>("PUT", `/tickets/${ticketId}/unassign`);
}

export async function markTicketAsComplete(ticketId: number) {
  await request<Ticket>("PUT", `/tickets/${ticketId}/complete`);
}

export async function markTicketAsIncomplete(ticketId: number) {
  await request<Ticket>("DELETE", `/tickets/${ticketId}/complete`);
}
