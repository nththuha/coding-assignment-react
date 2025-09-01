import TicketBadges from "@/components/TicketBadges";
import useUserStore from "@/store/user.store";
import { Ticket } from "@acme/shared-models";
import { Card, Flex, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type TicketItemProps = {
  ticket: Ticket;
};

export default function TicketItem({ ticket }: TicketItemProps) {
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { hovered, ref } = useHover<HTMLDivElement>();

  const onClick = () => {
    navigate(`/${ticket.id}`);
  };

  return (
    <Card
      ref={ref}
      shadow="md"
      withBorder
      p={16}
      radius={8}
      style={{
        backgroundColor: hovered
          ? "var(--hovered-card)"
          : "var(--card-background)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Stack gap={10}>
        <TicketBadges ticket={ticket} />

        <Text fw="bold" fz={16} mt={4}>
          {ticket.description}
        </Text>

        <Flex gap={6} align="center" c="dimmed">
          <IconUser size={20} stroke={1.5} />
          <Text fz={14} mt={1}>
            {ticket.assigneeId ? (
              <>
                Assigned to:{" "}
                <Text span c="black" fw={500}>
                  {users.get(ticket.assigneeId)?.name || ""}
                </Text>
              </>
            ) : (
              "Unassigned"
            )}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
}
