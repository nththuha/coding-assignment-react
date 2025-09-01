import EmptyBox from "@/components/EmptyBox";
import { Ticket } from "@acme/shared-models";
import { Center, Loader } from "@mantine/core";
import TicketItem from "./TicketItem";

type TicketListProps = {
  tickets: Ticket[];
  loading: boolean;
};

export default function TicketList({ tickets, loading }: TicketListProps) {
  if (loading) {
    return (
      <Center z={9999}>
        <Loader mt={20} />
      </Center>
    );
  }

  if (tickets.length === 0) {
    return <EmptyBox />;
  }

  return (
    <>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </>
  );
}
