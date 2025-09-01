import { Ticket } from "@acme/shared-models";
import { request } from "../api";

export async function fetchTickets() {
  return await request<Ticket[]>("GET", "/tickets");
}
