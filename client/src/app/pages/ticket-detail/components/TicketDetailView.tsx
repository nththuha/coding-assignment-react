import Wrapper from "@/layout";
import { Ticket } from "@acme/shared-models";
import { LoadingOverlay } from "@mantine/core";
import TicketInfoCard from "./TicketInfoCard";
import Title from "./Title";

type TicketDetailViewProps = {
  ticket: Ticket | null;
  loading: boolean;
  onAssignUserToTicket: (userId: string | null) => void;
  onCompleteTicket: (isComplete: boolean) => void;
};

export default function TicketDetailView({
  ticket,
  loading,
  onAssignUserToTicket,
  onCompleteTicket,
}: TicketDetailViewProps) {
  return (
    <Wrapper>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Title />

      <TicketInfoCard
        ticket={ticket}
        onAssignUserToTicket={onAssignUserToTicket}
        onCompleteTicket={onCompleteTicket}
      />
    </Wrapper>
  );
}
