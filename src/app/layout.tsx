"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import React, { useMemo } from "react";
import { lightTheme, darkTheme } from "../theme"; // import 2 theme

const queryClient = new QueryClient();

// Component để chọn theme MUI theo dark/light từ next-themes
function MuiThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const muiTheme = useMemo(() => {
    if (theme === "dark") return darkTheme;
    return lightTheme;
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <NextThemeProvider attribute="class" defaultTheme="light">
            <MuiThemeRegistry>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </MuiThemeRegistry>
          </NextThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
