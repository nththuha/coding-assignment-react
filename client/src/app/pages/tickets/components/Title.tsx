import { Button, Flex, Title as MantineTitle } from "@mantine/core";

type TitleProps = {
  onButtonClick: () => void;
};

export default function Title({ onButtonClick }: TitleProps) {
  return (
    <Flex justify="space-between" align="center">
      <MantineTitle order={1}>Tickets</MantineTitle>
      <Button onClick={onButtonClick}>Add Ticket</Button>
    </Flex>
  );
}
