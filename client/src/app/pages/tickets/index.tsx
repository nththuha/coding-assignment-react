import { NotificationType, pushNotification } from "@/configs/notifications";
import useMount from "@/hooks/useMount";
import { createTicket, getTickets } from "@/services/domain";
import { Ticket } from "@acme/shared-models";
import { modals } from "@mantine/modals";
import { useCallback, useState } from "react";
import AddTicketForm from "./components/AddTicketForm";
import TicketsView from "./components/TicketView";
import { PushTicketForm, TicketStatus } from "./configs";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await getTickets();
    setTickets(data || []);
    setLoading(false);
  }, []);
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

  const handleAddTicket = useCallback(
    async (values: PushTicketForm) => {
      await createTicket(values.description);
      modals.closeAll();
      await fetchData();
      pushNotification({
        type: NotificationType.SUCCESS,
        message: "Ticket created successfully",
      });
    },
    [fetchData]
  );

  const handleAddTicketClick = useCallback(() => {
    modals.open({
      title: "Add Ticket",
      centered: true,
      size: "md",
      children: <AddTicketForm onSubmit={handleAddTicket} />,
    });
  }, [handleAddTicket]);

  return (
    <TicketsView
      tickets={filteredTickets}
      loading={loading}
      status={statusFilter}
      setStatus={setStatusFilter}
      onAddTicketClick={handleAddTicketClick}
    />
  );
}
