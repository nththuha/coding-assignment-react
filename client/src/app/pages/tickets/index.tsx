import { fetchTickets } from "@/services/domain";
import { Ticket } from "@acme/shared-models";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchData = async () => {
    const data = await fetchTickets();
    setTickets(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack>
      {tickets ? (
        <ul>
          {tickets.map((t) => (
            <li key={t.id}>
              Ticket: {t.id}, {t.description}
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </Stack>
  );
}
