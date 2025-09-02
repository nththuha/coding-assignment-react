import useMount from "@/hooks/useMount";
import {
  assignUserToTicket,
  getTicketById,
  markTicketAsComplete,
  markTicketAsIncomplete,
  unassignUserFromTicket,
} from "@/services/domain";
import { Ticket } from "@acme/shared-models";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetailView from "./components/TicketDetailView";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const res = await getTicketById(Number(id));
    setTicket(res);
    setLoading(false);
  }, [id]);
  useMount(getData);

  const handleAssignUserToTicket = useCallback(
    async (userId: string | null) => {
      if (!ticket) {
        return;
      }
      setLoading(true);
      if (!userId) {
        await unassignUserFromTicket(ticket.id);
      } else {
        await assignUserToTicket(ticket.id, Number(userId));
      }
      await getData();
    },
    [getData, ticket]
  );

  const handleCompleteTicket = useCallback(
    async (isComplete: boolean) => {
      if (!ticket) {
        return;
      }
      setLoading(true);
      if (isComplete) {
        await markTicketAsComplete(ticket.id);
      } else {
        await markTicketAsIncomplete(ticket.id);
      }
      await getData();
    },
    [getData, ticket]
  );

  return (
    <TicketDetailView
      ticket={ticket}
      loading={loading}
      onAssignUserToTicket={handleAssignUserToTicket}
      onCompleteTicket={handleCompleteTicket}
    />
  );
}
