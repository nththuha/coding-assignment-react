import { Ticket } from "@acme/shared-models";
import { Badge, Flex, MantineSize } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

type TicketBadgesProps = {
  ticket: Ticket | null;
  size?: MantineSize;
};

export default function TicketBadges({ ticket, size }: TicketBadgesProps) {
  const isCompleted = ticket?.completed ?? false;

  return (
    <Flex gap={10}>
      <Badge variant="light" color="var(--index)" size={size}>
        #{ticket?.id}
      </Badge>
      <Badge
        variant="light"
        size={size}
        color={
          isCompleted ? "var(--completed-status)" : "var(--incomplete-status)"
        }
        leftSection={
          isCompleted ? <IconCheck size={16} /> : <IconX size={16} />
        }
      >
        {isCompleted ? "Completed" : "Incomplete"}
      </Badge>
    </Flex>
  );
}
