import { resolver, theme } from "@/configs/themes";
import { AppRoutes } from "@/routes";
import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <AppRoutes />
    </MantineProvider>
  );
}
