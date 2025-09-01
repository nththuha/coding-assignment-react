import { resolver, theme } from "@/configs/themes";
import { AppRoutes } from "@/routes";
import useUserStore from "@/store/user.store";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications position="top-right" />
      <ModalsProvider>
        <AppRoutes />
      </ModalsProvider>
    </MantineProvider>
  );
}

async function loadData() {
  await useUserStore.getState().load();
}
