"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { lightTheme, darkTheme } from "../theme";
import GlobalLoader from "../../common/GlobalLoader";


const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = useMemo(
    () => (theme === "dark" ? darkTheme : lightTheme),
    [theme]
  );

  return (
    <>
      <GlobalLoader />

      <QueryClientProvider client={queryClient}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ThemeProvider>
        </NextThemeProvider>
      </QueryClientProvider>
    </>
  );
}
