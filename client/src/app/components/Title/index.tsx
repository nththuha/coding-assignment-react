import { Title as MantineTitle } from "@mantine/core";

type TitleProps = {
  content: string;
};

export default function Title({ content }: TitleProps) {
  return <MantineTitle order={1}>{content}</MantineTitle>;
}
