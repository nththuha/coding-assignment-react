import { Stack } from "@mantine/core";
import styles from "./index.module.css";

type WrapperProps = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <Stack className={styles["container"]}>
      <Stack className={styles["content"]}>{children}</Stack>
    </Stack>
  );
}
