import useMount from "@/hooks/useMount";
import { fetchTickets } from "@/services/domain";
import { Ticket } from "@acme/shared-models";
import { useState } from "react";
import TicketsView from "./components/TicketView";
import { TicketStatus } from "./configs";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchTickets();
    setTickets(data || []);
    setLoading(false);
  };
  useMount(fetchData);

  const filteredTickets = tickets.filter((ticket) => {
    switch (statusFilter) {
      case TicketStatus.Completed:
        return ticket.completed;
      case TicketStatus.Incomplete:
        return !ticket.completed;
      default:
        return true;
    }
  });

  return (
    <TicketsView
      tickets={filteredTickets}
      loading={loading}
      status={statusFilter}
      setStatus={setStatusFilter}
    />
  );
}
