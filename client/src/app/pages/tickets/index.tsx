import useMount from "@/hooks/useMount";
import { fetchTickets } from "@/services/domain";
import useUserStore from "@/store/user.store";
import { Ticket } from "@acme/shared-models";
import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import styles from "./index.module.css";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const userStore = useUserStore();

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchTickets();
    setTickets(data || []);
    setLoading(false);
  };
  useMount(fetchData);

  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter === "Completed") {
      return ticket.completed;
    }
    if (statusFilter === "Pending") {
      return !ticket.completed;
    }
    return true;
  });

  const getAssigneeName = (assigneeId: number | null) => {
    if (!assigneeId) {
      return "Unassigned";
    }
    return userStore.users.get(assigneeId)?.name || "";
  };

  const getStatusBadgeProps = (completed: boolean) => {
    return {
      color: completed ? "green" : "yellow",
      variant: "light",
    };
  };

  const filterOptions = [
    { value: "All", label: "All Tickets" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
  ];

  if (loading) {
    return (
      <Container size="lg" className={styles["ticket-list-container"]}>
        <Title order={1} className={styles["page-title"]}>
          Tickets
        </Title>
        <Center className="loading-center">
          <Stack align="center" gap="md">
            <Loader size="lg" color="blue" />
            <Text size="lg" c="dimmed">
              Loading tickets...
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="lg" className={styles["ticket-list-container"]}>
      <Title order={1} className={styles["page-title"]}>
        Tickets
      </Title>

      <Box className={styles["filter-section"]}>
        <Select
          label="Filter by Status"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value || "")}
          data={filterOptions}
          className={styles["status-filter"]}
          placeholder="Select status"
        />
      </Box>

      <Stack gap="md" className={styles["tickets-stack"]}>
        {filteredTickets.length === 0 ? (
          <Box className={styles["no-tickets"]}>
            <Text size="lg" c="dimmed" align="center">
              No tickets found for the selected filter.
            </Text>
          </Box>
        ) : (
          filteredTickets.map((ticket) => (
            <Card
              key={ticket.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className={
                styles[
                  `ticket-card ${
                    ticket.completed ? "ticket-completed" : "ticket-pending"
                  }`
                ]
              }
            >
              <Stack gap="sm">
                <Group gap="apart" align="flex-start">
                  <Group gap="sm">
                    <Badge
                      color="blue"
                      variant="outline"
                      size="sm"
                      className={styles["ticket-id-badge"]}
                    >
                      #{ticket.id}
                    </Badge>
                    <Badge
                      {...getStatusBadgeProps(ticket.completed)}
                      size="sm"
                      className={styles["status-badge"]}
                    >
                      {ticket.completed ? "Completed" : "Pending"}
                    </Badge>
                  </Group>
                </Group>

                <Text
                  size="md"
                  weight={500}
                  className={styles["ticket-description"]}
                >
                  {ticket.description}
                </Text>

                <Group gap="xs" className={styles["assignee-group"]}>
                  <Text size="sm" c="dimmed">
                    Assigned to:
                  </Text>
                  <Text
                    size="sm"
                    weight={500}
                    className={styles["assignee-name"]}
                  >
                    {getAssigneeName(ticket.assigneeId)}
                  </Text>
                </Group>
              </Stack>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}
