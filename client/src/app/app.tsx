import { resolver, theme } from "@/configs/themes";
import { AppRoutes } from "@/routes";
import useUserStore from "@/store/user.store";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <AppRoutes />
    </MantineProvider>
  );
}

async function loadData() {
  await useUserStore.getState().load();
}
