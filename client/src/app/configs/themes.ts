import {
  CSSVariablesResolver,
  MantineThemeOverride,
  createTheme,
} from "@mantine/core";

export const theme: MantineThemeOverride = createTheme({
  primaryColor: "primary",
  fontFamily: "Open Sans, sans-serif",
  components: {},
  colors: {
    primary: [
      "#dffbff",
      "#caf2ff",
      "#99e2ff",
      "#64d2ff",
      "#3cc4fe",
      "#23bcfe",
      "#00b5ff",
      "#00a1e4",
      "#008fcd",
      "#007cb6",
    ],
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--success": "#3CA77A",
    "--error": "#D93E3E",
    "--warning": "#FF9D00",
    "--completed-status": "#1f8057",
    "--incomplete-status": "#dd8800",
    "--index": theme.colors["primary"][6],
    "--hovered-card": "#f1fdffff",
  },
  light: {},
  dark: {},
});
