import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Title() {
  const navigate = useNavigate();

  return (
    <Flex align="center" w="100%" style={{ position: "relative" }}>
      <ActionIcon
        variant="transparent"
        onClick={() => navigate("/")}
        style={{ zIndex: 1 }}
        size="xl"
      >
        <IconArrowLeft stroke={1.5} />
      </ActionIcon>

      <Text
        fz={24}
        fw="bold"
        style={{
          margin: 0,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        Ticket Detail
      </Text>
    </Flex>
  );
}
