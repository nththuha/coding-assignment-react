import { Ticket } from "@acme/shared-models";
import { Badge, Flex, MantineSize } from "@mantine/core";

type TicketBadgesProps = {
  ticket: Ticket | null;
  size?: MantineSize;
};

export default function TicketBadges({ ticket, size }: TicketBadgesProps) {
  return (
    <Flex gap={10}>
      <Badge variant="light" color="var(--index)" size={size}>
        #{ticket?.id}
      </Badge>
      <Badge
        variant="light"
        size={size}
        color={
          ticket?.completed
            ? "var(--completed-status)"
            : "var(--incomplete-status)"
        }
      >
        {ticket?.completed ? "Completed" : "Incomplete"}
      </Badge>
    </Flex>
  );
}
