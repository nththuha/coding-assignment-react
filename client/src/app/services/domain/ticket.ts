import { Ticket } from "@acme/shared-models";
import { request } from "../api";

export async function getTickets() {
  return await request<Ticket[]>({
    method: "GET",
    url: "/tickets",
  });
}

export async function getTicketById(id: number) {
  return await request<Ticket>({
    method: "GET",
    url: `/tickets/${id}`,
  });
}

export async function createTicket(description: string) {
  return await request<Ticket>({
    method: "POST",
    url: "/tickets",
    data: { description },
  });
}

export async function assignUserToTicket(ticketId: number, userId: number) {
  await request<Ticket>({
    method: "PUT",
    url: `/tickets/${ticketId}/assign/${userId}`,
  });
}

export async function unassignUserFromTicket(ticketId: number) {
  await request<Ticket>({
    method: "PUT",
    url: `/tickets/${ticketId}/unassign`,
  });
}

export async function markTicketAsComplete(ticketId: number) {
  await request<Ticket>({
    method: "PUT",
    url: `/tickets/${ticketId}/complete`,
  });
}

export async function markTicketAsIncomplete(ticketId: number) {
  await request<Ticket>({
    method: "DELETE",
    url: `/tickets/${ticketId}/complete`,
  });
}
