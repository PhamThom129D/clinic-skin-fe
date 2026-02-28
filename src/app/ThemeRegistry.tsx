"use client";

import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useTheme } from "next-themes";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === "dark" ? "dark" : "light",
        },
      }),
    [theme]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
