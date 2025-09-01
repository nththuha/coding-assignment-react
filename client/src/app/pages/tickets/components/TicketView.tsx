import Wrapper from "@/layout";
import { Ticket } from "@acme/shared-models";
import Filter from "./Filter";
import TicketList from "./TicketList";
import Title from "./Title";

type TicketsViewProps = {
  tickets: Ticket[];
  loading: boolean;
  status: string | null;
  setStatus: (value: string | null) => void;
  onAddTicketClick: () => void;
};

export default function TicketsView({
  tickets,
  loading,
  status,
  setStatus,
  onAddTicketClick,
}: TicketsViewProps) {
  return (
    <Wrapper>
      <Title onButtonClick={onAddTicketClick} />
      <Filter status={status} setStatus={setStatus} />
      <TicketList tickets={tickets} loading={loading} />
    </Wrapper>
  );
}
