import Select from "@/components/Select";
import TicketBadges from "@/components/TicketBadges";
import useUserStore from "@/store/user.store";
import { Ticket } from "@acme/shared-models";
import { Button, Card, Divider, Stack, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMemo } from "react";

type TicketInfoCardProps = {
  ticket: Ticket | null;
  onAssignUserToTicket: (userId: string | null) => void;
  onCompleteTicket: (isComplete: boolean) => void;
};

export default function TicketInfoCard({
  ticket,
  onAssignUserToTicket,
  onCompleteTicket,
}: TicketInfoCardProps) {
  const { users } = useUserStore();
  const isCompleted = ticket?.completed ?? false;

  const userOptions = useMemo(
    () =>
      Array.from(users.values()).map((el) => ({
        label: el.name,
        value: el.id,
      })),
    [users]
  );

  return (
    <Card shadow="md" withBorder p={30} radius={12}>
      <Stack gap={28}>
        <TicketBadges ticket={ticket} size="lg" />

        <Divider />

        <Stack gap={2}>
          <Text fw="bold">Description</Text>
          <Text>{ticket?.description}</Text>
        </Stack>

        <Select
          label="Assigned to"
          value={ticket?.assigneeId?.toString()}
          options={userOptions}
          onChange={onAssignUserToTicket}
        />

        <Button
          leftSection={
            isCompleted ? <IconX size={16} /> : <IconCheck size={16} />
          }
          color={isCompleted ? "var(--error)" : "var(--success)"}
          mt={8}
          onClick={() => onCompleteTicket(!isCompleted)}
        >
          {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        </Button>
      </Stack>
    </Card>
  );
}
