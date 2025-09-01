import { Button, Flex, Title as MantineTitle } from "@mantine/core";

type TitleProps = {
  content: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function Title({
  content,
  buttonText,
  onButtonClick,
}: TitleProps) {
  return (
    <Flex justify="space-between" align="center">
      <MantineTitle order={1}>{content}</MantineTitle>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </Flex>
  );
}
